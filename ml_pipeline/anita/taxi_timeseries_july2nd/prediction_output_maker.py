import os
from dotenv import load_dotenv
import pandas as pd
from autogluon.timeseries import TimeSeriesDataFrame, TimeSeriesPredictor

# Load environment variables from .env file
load_dotenv()

# Read the data
df = pd.read_csv("updated_prediction_data.csv")
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
#predictions_df.to_csv("prediction_july.csv", index=False)
print("Predictions saved to prediction_july.csv")

# Plot 4 randomly chosen time series and the respective forecasts
plot1 = predictor.plot(train_data, predictions, quantile_levels=[0.1, 0.9], max_history_length=200, max_num_item_ids=4)
plot1.savefig('plot1.png', format='png')