import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Database configuration using environment variables
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')

# Create a database engine
try:
    engine = create_engine(f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}')
    print("Database engine created successfully.")
except Exception as e:
    print(f"Error creating engine: {str(e)}")

if __name__ == "__main__":
    try:
        # Specify the database name
        database_name = 'db-deploy'

        # SQL query to select data from predictions table for July 2024
        query = """
        SELECT * 
        FROM predictions 
        WHERE datetime LIKE '%2024-07%'
        """

        # Execute the query
        with engine.connect() as connection:
            result = connection.execute(text(query))
            rows = result.fetchall()

        # Print the results
        for row in rows:
            print(row)

    except Exception as e:
        print(f"Error: {str(e)}")
