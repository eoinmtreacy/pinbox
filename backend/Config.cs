using DotNetEnv;

namespace backend 
{
    public static class Config
    {
        static Config()
        {
            DotNetEnv.Env.Load();
        }

        public static string DbPassword => DotNetEnv.Env.GetString("DB_PASSWORD");
        public static string ApiKey => DotNetEnv.Env.GetString("API_KEY");
        public static string DbHost => DotNetEnv.Env.GetString("DB_HOST");
        public static string DbPort => DotNetEnv.Env.GetString("DB_PORT");
        public static string DbName => DotNetEnv.Env.GetString("DB_NAME");
        public static string DbUser => DotNetEnv.Env.GetString("DB_USER");
    }
}