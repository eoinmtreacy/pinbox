using System;
using System.IO;
using dotenv.net;
using MySql.Data.MySqlClient; // Add this using directive for MySQL types

class Program
{
    static void Main()
    {
        DotEnv.Load(); // Load environment variables from .env file
        
        string dotenvConnectionString = Environment.GetEnvironmentVariable("DefaultConnection");
        int placeId = 357608159;
        var recommendation = GetRecommendation(placeId, dotenvConnectionString);

        // null handling
        if (recommendation != null)
        {
            Console.WriteLine($"Recommended Place ID: {recommendation.PlaceId}, Count: {recommendation.Count}");
        }
        else
        {
            Console.WriteLine("No recommendation found.");
        }
    }
    
    static RecommendationResult? GetRecommendation(int placeId, string connectionString)
    {
        RecommendationResult? result = null;

        using (MySqlConnection conn = new MySqlConnection(connectionString))
        {
            try
            {
                conn.Open();

                string query = @"USE DBdev;
                    WITH liked_users AS (
                        SELECT DISTINCT user_id
                        FROM userlikes
                        WHERE place_id = @placeId
                        AND category_swipe = 'love_it'
                    )
                    SELECT ul.place_id, COUNT(DISTINCT lu.user_id) AS num_users_likers
                    FROM userlikes ul
                    JOIN liked_users lu ON ul.user_id = lu.user_id
                    WHERE ul.place_id <> @placeId
                    AND ul.category_swipe = 'love_it'
                    GROUP BY ul.place_id
                    ORDER BY num_users_likers DESC
                    LIMIT 1;
                ";

                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@placeId", placeId);

                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        int recommendedPlaceId = reader.GetInt32(0);
                        int count = reader.GetInt32(1);
                        result = new RecommendationResult(recommendedPlaceId, count);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred: " + ex.Message);
            }
        }

        return result;
    }
}

class RecommendationResult
{
    public int PlaceId { get; }
    public int Count { get; }

    public RecommendationResult(int placeId, int count)
    {
        PlaceId = placeId;
        Count = count;
    }
}


