using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using MySqlConnector;

namespace backend.controllers;
// old way was to enclose the whole code in the namespace, nowadayas you can just declare it

[Route("api/[controller]")] //http://localhost:5165/api/Recommendations?place_id=4484848
[ApiController]
public class RecommendationsController : ControllerBase
{
    
    private readonly ApplicationDbContext _context; // accessing the database connection
    
    // the constructor
    public RecommendationsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetRecommendation(Int64 placeid) //passing the placeid from the api request
    {
        
        FormattableString query = $@"USE DBdev;
                    WITH liked_users AS (
                        SELECT DISTINCT user_id
                        FROM userlikes
                        WHERE place_id = @place_id
                        AND category_swipe = 'love_it'
                    )
                    SELECT ul.place_id, COUNT(DISTINCT lu.user_id) AS num_users_likers
                    FROM userlikes ul
                    JOIN liked_users lu ON ul.user_id = lu.user_id
                    WHERE ul.place_id <> @place_id
                    AND ul.category_swipe = 'love_it'
                    GROUP BY ul.place_id
                    ORDER BY num_users_likers DESC
                    LIMIT 1;";

        var sqlQueryResults = _context.Database.SqlQueryRaw<RecommendedPlace>(
            query.ToString(), new MySqlParameter("@place_id", placeid)
        ).ToList();
        
        var recommendedPlaceId = sqlQueryResults.First().place_id;
        var numUsersLikers = sqlQueryResults.First().num_users_likers;
        
        // Fetch the full Place table data
        var place = _context.Places.FirstOrDefault(p => p.Id == recommendedPlaceId);
        
        // dealing with not found

        if (place == null)
        {
            return NotFound("Recommended place not found in the Places table.");
        }
        
        var recommenderOutput = new RecommendedPlaceAllInfo
        {
            NumUsersLikers = numUsersLikers,
            PlaceData = place
        };

        return Ok(recommenderOutput);
    }
}


public class RecommendedPlace {
    public Int64 place_id { get; set; }
    public Int64 num_users_likers { get; set; }
}

public class RecommendedPlaceAllInfo
{
    public Int64 NumUsersLikers { get; set; }
    public Place? PlaceData { get; set; } // ? so that it's nullable
}
