from flask import Flask, request, jsonify
import pandas as pd
from autogluon.tabular import TabularPredictor

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

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