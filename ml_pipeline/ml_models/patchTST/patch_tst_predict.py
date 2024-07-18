from autogluon.timeseries import TimeSeriesPredictor, TimeSeriesDataFrame
from autogluon.timeseries.utils.forecast import get_forecast_horizon_index_ts_dataframe
import os
import pandas as pd
import sys
from meteostat import Point, Hourly

data = TimeSeriesDataFrame.from_pickle("patch_tst_small_df.pkl")
predictor = TimeSeriesPredictor.load("patch_tst_small_model_files")


def make_weather_df():
    start = pd.to_datetime('2024-06-01')
    end = pd.Timestamp.now() + pd.DateOffset(weeks=2)
    point = Point(40.7789, -73.9692)  # Central park USW00094728 station
    data = Hourly(point, start, end)
    df = data.fetch()
    # fill missing precip values with 0
    df.loc[df['prcp'].isna(), 'prcp'] = 0

    # Fill missing weather condition codes with 2
    df.loc[df['coco'].isna(), 'coco'] = 2
    # Drop wind speed and wind direction
    df = df.drop(['wspd', 'wdir', 'wpgt', 'snow', 'tsun'], axis=1)
    df = df.reset_index()
    return df.rename({'time': 'timestamp'}, axis=1)


def make_open_hours_df():
    df_open = pd.read_csv(
        "./taxi_location_num_businesses_open.csv")
    df_open = df_open.rename({'location': 'item_id'}, axis=1)
    return df_open.set_index(['day', 'hour', 'item_id'])


df_wth = make_weather_df()


def make_known_covariates(data, predictor):
    future_index = get_forecast_horizon_index_ts_dataframe(
        data, prediction_length=predictor.prediction_length, freq='H')
    future_timestamps = future_index.get_level_values("timestamp").to_series()
    known_covariates = pd.DataFrame(index=future_index)
    known_covariates['day'] = future_timestamps.dt.day_name(
    ).str.lower().values
    known_covariates['hour'] = future_timestamps.dt.hour.to_list()
    df_open = make_open_hours_df()
    known_covariates = known_covariates.join(
        df_open, on=['day', 'hour', 'item_id'])
    df_wth = make_weather_df()
    known_covariates = known_covariates.join(
        df_wth.set_index("timestamp"), on='timestamp', how='left')
    add_weekends_holidays(known_covariates)
    return known_covariates


def add_weekends_holidays(data: TimeSeriesDataFrame):
    """Adds weekends and holidays to timeseries dataframe.

    Args:
        data (TimeSeriesDataFrame): Time series data.
    """
    WEEKEND_INDICES = [5, 6]
    timestamps = data.index.get_level_values("timestamp")
    data["weekend"] = timestamps.weekday.isin(WEEKEND_INDICES).astype(float)
    data.head()

    # Get US holidays
    country_holidays = holidays.country_holidays(
        country="US",
        years=range(timestamps.min().year, timestamps.max().year + 1),
    )
    # Get dummies
    holidays_df = pd.get_dummies(pd.Series(country_holidays)).astype(float)
    # Reindex by hour
    holidays_df = holidays_df.reindex(timestamps.date).fillna(0)
    # Add holidays col, 1 if any of the holidays, 0 otherwise
    data['holiday'] = holidays_df.max(axis=1).values


known_covariates = make_known_covariates(data, predictor)

predictions = predictor.predict(data, known_covariates=known_covariates)
