using DotNetEnv;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerUI;

using backend.Models;
using System.Security.Claims;
using Sprache;
using Microsoft.AspNetCore.Http.HttpResults;

using System;
using System.Text.Json.Serialization;


try
{
    Env.Load(".env");
    Console.WriteLine("Successfully loaded .env file");
}
catch (Exception ex)
{
    Console.WriteLine($"Error loading .env file: {ex.Message}");
}

var connectionString = Environment.GetEnvironmentVariable("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    Console.WriteLine("Connection String from .env is empty or null");
}
else
{
    Console.WriteLine($"Connection String from .env: {connectionString}");
}

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();  

var configuration = builder.Configuration;

// Register the DbContext with the MySQL provider using the connection string from .env
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        connectionString,
        new MySqlServerVersion(new Version(8, 0, 21))
    )
);
builder.Services.AddAuthentication();
builder.Services.AddIdentityApiEndpoints<AppUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost") // Replace with the actual origin of your client app
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors("AllowSpecificOrigin");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers();
app.MapIdentityApi<AppUser>();

app.MapGet("/", () => "Hello World!");

app.UseAuthorization();
app.MapGet("/auth", (ClaimsPrincipal user) => 
{
    var pinbox_id = user.FindFirstValue("Pinbox_Id");
    return Results.Json(new { pinbox_id });
}).RequireAuthorization();

app.Run();
