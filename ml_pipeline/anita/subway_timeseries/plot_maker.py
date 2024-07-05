import pandas as pd
from autogluon.timeseries import TimeSeriesDataFrame, TimeSeriesPredictor
import matplotlib.pyplot as plt

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

# Plot 4 randomly chosen time series and the respective forecasts
plot1 = predictor.plot(train_data, predictions, quantile_levels=[0.1, 0.9], max_history_length=200, max_num_item_ids=1)
plot1.savefig('plot1.png', format='png')