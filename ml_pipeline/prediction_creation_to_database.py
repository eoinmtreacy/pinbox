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

# Print the variables to ensure they are loaded correctly
print(f"DB_USER: {DB_USER}")
print(f"DB_PASSWORD: {DB_PASSWORD}")
print(f"DB_HOST: {DB_HOST}")
print(f"DB_PORT: {DB_PORT}")
print(f"DB_NAME: {DB_NAME}")

# Create a database engine
try:
    engine = create_engine(f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}')
    print("Database engine created successfully.")
except Exception as e:
    print(f"Error creating engine: {str(e)}")

# Function to list databases
def list_databases():
    with engine.connect() as connection:
        result = connection.execute(text("SHOW DATABASES"))
        databases = [row[0] for row in result]
    return databases

def list_tables_in_database(database_name):
    # SQL query to select the database
    use_database_query = f"USE {database_name};"
    
    # SQL query to list tables
    show_tables_query = "SHOW TABLES;"
    
    with engine.connect() as connection:
        # Execute the query to select the database
        connection.execute(text(use_database_query))
        
        # Execute the query to show tables
        result = connection.execute(text(show_tables_query))
        tables = [row[0] for row in result]
    
    return tables
if __name__ == "__main__":
    # Test the connection by listing databases
    try:
        databases = list_databases()
        print(f"Databases in the MySQL server: {databases}")
        tables = list_tables_in_database('`db-deploy`')
        print(tables)
    except Exception as e:
        print(f"Error: {str(e)}")

