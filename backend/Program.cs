using DotNetEnv;
using Microsoft.Extensions.Configuration;
using backend;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

string dbPassword = Config.DbPassword;
string dbHost = Config.DbHost;
string dbPort = Config.DbPort;
string dbName = Config.DbName;
string dbUser = Config.DbUser;

var connectionStringTemplate = builder.Configuration.GetConnectionString("DefaultConnection");

string connectionString = connectionStringTemplate
    .Replace("{DB_HOST}", dbHost)
    .Replace("{DB_PORT}", dbPort)
    .Replace("{DB_NAME}", dbName)
    .Replace("{DB_USER}", dbUser)
    .Replace("{DB_PASSWORD}", dbPassword);

builder.Configuration["ConnectionStrings:DefaultConnection"] = connectionString;

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
