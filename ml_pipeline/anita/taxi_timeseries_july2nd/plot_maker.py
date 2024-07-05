import pandas as pd
from autogluon.timeseries import TimeSeriesDataFrame, TimeSeriesPredictor
import matplotlib.pyplot as plt

df = pd.read_csv('ml_pipeline/anita/taxi_timeseries_july2nd/updated_prediction_data.csv')

print(df.columns)

train_data = TimeSeriesDataFrame.from_data_frame(
    df,
    id_column="location",
    timestamp_column="datetime"
)
print(train_data.head())

predictor = TimeSeriesPredictor.load('ml_pipeline/anita/taxi_timeseries_july2nd/ml_pipeline/autogluon-m4-hourly',require_version_match=False)

predictions = predictor.predict(train_data)
print(predictions.head())

print(train_data.head())
#train_data['item_id'] = train_data['item_id'].astype('int64')

# Extract unique values from the column
unique_values = [4,12,13,24,41,42,43,45,48,50,68,74,75,79,87,88,90,100,107,113,114,116,120,125,127,128,137,140,141,142,143,144,148,151,152,153,158,161,162,163,164,166,170,186,194,202,209,211,224,229,230,231,232,233,234,236,237,238,239,243,244,246,249,261,262,263,104,105]

def Convert(string):
    li = list(string.split(","))
    return li


# Driver code
#unique_values_list = Convert(unique_values)
#print(unique_values_list)

# Loop through each unique item_id and generate a plot
for item_id in unique_values:
    # Plot the time series and the respective forecasts for the specific item_id
    plot1 = predictor.plot(train_data, predictions, quantile_levels=[0.1, 0.9], item_ids=[item_id], max_history_length=200)
    
    plt.savefig(f'plot_{item_id}.png', format='png')
    