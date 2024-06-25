import pandas as pd
from autogluon.timeseries import TimeSeriesDataFrame, TimeSeriesPredictor

df = pd.read_csv('scripts/new_taxi/autogluon_manh_taxi/manh_taxi_train1.csv')

print(df.columns)

train_data = TimeSeriesDataFrame.from_data_frame(
    df,
    id_column="#",
    timestamp_column="datetime"
)
print(train_data.head())

# setting the frequency to h since the data is grouped/collected hourly, changed prediction lenght to 1h as it failed
predictor = TimeSeriesPredictor(
    freq='h',
    prediction_length=1,
    path="autogluon-m4-hourly",
    target="busyness",
    eval_metric="MASE",
)

predictor.fit(
    train_data,
    presets="medium_quality",
    time_limit=1000,
)
print('done training')

predictions = predictor.predict(train_data)
print(predictions.head())

print('job done!')