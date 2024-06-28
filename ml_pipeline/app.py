from flask import Flask, request, jsonify
import pandas as pd
from autogluon.tabular import TabularPredictor

app = Flask(__name__)

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

''' for later, work in progress
# Load the AutoGluon model
predictor = TabularPredictor.load("AutogluonModels/ag-20240531_163402")
@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from request
    data = request.json
    
    # Convert JSON data to DataFrame
    df = pd.DataFrame(data)
    
    # Make prediction
    predictions = predictor.predict(df)
    
    # Convert predictions to JSON
    result = predictions.to_json(orient="records")
    
    return jsonify(result)
'''

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)