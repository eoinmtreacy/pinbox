import pandas as pd
from autogluon.timeseries import TimeSeriesDataFrame, TimeSeriesPredictor
import matplotlib.pyplot as plt

# Function to ensure the data is resampled to hourly frequency
def resample_to_hourly(data):
    if isinstance(data, pd.DataFrame):
        data.index = pd.to_datetime(data.index)
        data = data.resample('H').mean()  # Resample to hourly frequency, using mean for aggregation
    elif isinstance(data, TimeSeriesDataFrame):
        data.index = pd.to_datetime(data.index)
        data = data.to_pandas().resample('H').mean()  # Convert to pandas DataFrame, resample, then convert back
        data = TimeSeriesDataFrame(data)
    return data

df = pd.read_csv('subway_timeseries/cleaned_subway_weather_Manhattan_only.csv')

print(df.columns)

train_data = TimeSeriesDataFrame.from_data_frame(
    df,
    id_column="station_complex_id",
    timestamp_column="transit_timestamp"
)
print(train_data.head())

predictor = TimeSeriesPredictor.load('subway_timeseries/subway_timeseries/subway_autogluon_model',require_version_match=False)

predictions = predictor.predict(train_data)
print(predictions.head())

# Ensure the data is at an hourly frequency
train_data = resample_to_hourly(train_data)
predictions = resample_to_hourly(predictions)

# Plot 4 randomly chosen time series and the respective forecasts
plot1 = predictor.plot(train_data, predictions, quantile_levels=[0.1, 0.9], max_history_length=200, max_num_item_ids=4)
plot1.savefig('plot1.png', format='png')