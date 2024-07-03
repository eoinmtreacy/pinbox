"""Functions for building ML models.
"""

from autogluon.timeseries import TimeSeriesDataFrame
import holidays
import pandas as pd


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
