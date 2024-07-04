import os
from dotenv import load_dotenv
import pandas as pd
from autogluon.timeseries import TimeSeriesDataFrame, TimeSeriesPredictor

# Load environment variables from .env file
load_dotenv()

# Read the data
df = pd.read_csv("ml_pipeline/updated_passenger_count.csv")
print(df.head())

# Prepare the training data
train_data = TimeSeriesDataFrame.from_data_frame(
    df,
    id_column="location",
    timestamp_column="datetime"
)
print(train_data.head())

# Load the predictor
predictor_path = "ml_pipeline/autogluon-m4-hourly"
predictor = TimeSeriesPredictor.load(predictor_path)
print('Predictor loaded')

# Make predictions
predictions = predictor.predict(train_data)
print(predictions.head())

# save as the next month you are predicting (beware it is not 1 month precisely, but 30 days)
predictions_df = predictions.reset_index()
predictions_df.to_csv("ml_pipeline/prediction_july.csv", index=False)
print("Predictions saved to prediction_july.csv")
