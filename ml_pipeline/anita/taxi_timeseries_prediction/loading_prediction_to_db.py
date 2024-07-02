import os
import pandas as pd
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

# Function to list databases
def list_databases():
    with engine.connect() as connection:
        result = connection.execute(text("SHOW DATABASES"))
        databases = [row[0] for row in result]
    return databases

# Function to list tables in a specific database
def list_tables_in_database(database_name):
    # SQL query to list tables
    show_tables_query = "SHOW TABLES;"

    # Use the specified database
    use_database_query = f"USE `{database_name}`;"

    with engine.connect() as connection:
        # Execute the query to select the database
        connection.execute(text(use_database_query))
        
        # Execute the query to show tables
        result = connection.execute(text(show_tables_query))
        tables = [row[0] for row in result]
    
    return tables

# Function to create a new table
def create_new_table(table_name):
    # Define the schema of the table based on updated_passenger_count.csv
    schema = """
    CREATE TABLE IF NOT EXISTS {} (
        location BIGINT,
        datetime DATETIME,
        passenger_count INT,
        PRIMARY KEY (location,datetime)
    );
    """.format(table_name)

    # Execute the schema creation query
    try:
        with engine.connect() as connection:
            connection.execute(text(schema))
        print(f"Table {table_name} created successfully.")
    except Exception as e:
        print(f"Error creating table {table_name}: {str(e)}")

# Function to load data into the table
def load_data_into_table(table_name, csv_file):
    try:
        # Read CSV into DataFrame
        df = pd.read_csv(csv_file)

        # Check if the table exists in the database
        with engine.connect() as connection:
            result = connection.execute(text(f"SHOW TABLES LIKE '{table_name}'"))
            table_exists = result.fetchone() is not None

        if not table_exists:
            create_new_table(table_name)

        # Get the max datetime or location already in the table
        with engine.connect() as connection:
            query = f"SELECT MAX(datetime) AS max_datetime FROM {table_name}"
            result = connection.execute(text(query))
            row = result.fetchone()
            max_datetime = row[0]  # Accessing the first column of the result tuple


        # Filter new data to append
        if pd.notnull(max_datetime):
            df = df[df['datetime'] > max_datetime]


        # Load DataFrame into database table
        df.to_sql(table_name, con=engine, if_exists='append', index=False)

        print(f"Data loaded into table {table_name} successfully.")
    except Exception as e:
        print(f"Error loading data into table {table_name}: {str(e)}")

if __name__ == "__main__":
    try:
        # Specify the database name
        database_name = 'DBdev'

        # List tables in the specified database
        tables = list_tables_in_database(database_name)
        print(f"Tables in database {database_name}: {tables}")

        # Load data from CSV into the table
        table_name = 'predictions'  # Adjust table name as needed
        csv_file = 'ml_pipeline/anita/taxi_timeseries_prediction/july_prediction_data3.csv'  # Adjust CSV file path as needed
        load_data_into_table(table_name, csv_file)

        # Verify tables in the database again
        tables = list_tables_in_database(database_name)
        print(f"Tables in database {database_name} after loading data: {tables}")
    except Exception as e:
        print(f"Error: {str(e)}")
