import pandas as pd
from autogluon.timeseries import TimeSeriesDataFrame, TimeSeriesPredictor


# Read the data
df = pd.read_csv("ml_pipeline/5510_max_passenger_count.csv")
print(df.head())

# Prepare the training data
train_data = TimeSeriesDataFrame.from_data_frame(
    df,
    id_column="location",
    timestamp_column="datetime"
)
print(train_data.head())



# Create the predictor
predictor = TimeSeriesPredictor(
    freq='H',  # Make sure the frequency is in uppercase 'H' for hourly
    prediction_length=730,
    path="ml_pipeline/autogluon-m4-hourly",
    target="passenger_count",
    eval_metric="MASE",
)
print('Predictor created')

# Fit the model
predictor.fit(
    train_data,
    presets="medium_quality",
    time_limit=600
)
print('Model training completed')

# Make predictions
predictions = predictor.predict(train_data)
print(predictions.head())

# Convert predictions to DataFrame with item_id and timestamp
predictions_df = predictions.reset_index()
predictions_df.to_csv("prediction1.csv", index=False)
print("Predictions saved to prediction1.csv")