import pandas as pd
from autogluon.timeseries import TimeSeriesDataFrame, TimeSeriesPredictor
import matplotlib.pyplot as plt

df = pd.read_csv('cleaned_subway_weather_Manhattan_only.csv')

print(df.columns)

train_data = TimeSeriesDataFrame.from_data_frame(
    df,
    id_column="station_complex_id",
    timestamp_column="transit_timestamp"
)
print(train_data.head())

# setting the frequency to h since the data is grouped/collected hourly, changed prediction lenght to 1h as it failed
predictor = TimeSeriesPredictor(
    freq='h',
    prediction_length=360,
    path="subway_timeseries/subway_autogluon_model",
    target="ridership",
    eval_metric="MASE"
)
print('we made the predictor')

predictor.fit(
    train_data,
    presets="medium_quality",
    verbosity=4
)
print('done training')

predictions = predictor.predict(train_data)
print(predictions.head())

predictions_df = predictions.reset_index()
predictions_df.to_csv("subway_prediction.csv", index=False)
print("Predictions saved to subway_prediction.csv")
print('job done!')


# Plot 4 randomly chosen time series and the respective forecasts
predictor.plot(train_data, predictions, quantile_levels=[0.1, 0.9], max_history_length=200, max_num_item_ids=4);