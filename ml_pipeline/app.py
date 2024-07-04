from flask import Flask, request, jsonify
import pandas as pd
from autogluon.tabular import TabularPredictor
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import pandas as pd
from autogluon.tabular import TabularPredictor
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Database configuration using environment variables
DB_USER = os.getenv('DB_USERNAME')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOSTNAME')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/prediction', methods=['GET'])
def prediction():
    # Path to your CSV file
    file_path = '/app/ml_pipeline/falsified_manhattan_busyness.csv'
    #try:
    #    data = pd.read_csv(file_path)
    #    # Further processing...
    #    return "Prediction results"
    #except FileNotFoundError as e:
    #    return str(e), 500

    # Read the CSV file into a DataFrame
    df = pd.read_csv(file_path)
    
    # Convert the DataFrame to JSON
    json_data = df.to_json()
    
    # Return the JSON data as a response
    return jsonify(json_data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)