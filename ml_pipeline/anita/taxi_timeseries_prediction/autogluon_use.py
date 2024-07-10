import pandas as pd
from autogluon.tabular import TabularPredictor

# Load the predictor
predictor = TabularPredictor.load("AutogluonModels/ag-20240531_163402")

# Sample data in the format it was trained on
sample_data = {
    'datetime': ['2021-01-14 20:00:00'],
    'location': [107.0],
    'service_zone': [107],
    'Zone': ['Yellow Zone'],
    'neighborhood': ['Manhattan'],
    'area_type': ['Gramercy'],
    'datetime.day': [14]
}

# Convert sample data to DataFrame
df = pd.DataFrame(sample_data)

# Ensure 'datetime' is in datetime format
df['datetime'] = pd.to_datetime(df['datetime'])

# Extract the required additional features
df['datetime_unix'] = df['datetime'].astype(int) // 10**9  # Convert to UNIX timestamp
df['datetime.day'] = df['datetime'].dt.day
df['datetime.dayofweek'] = df['datetime'].dt.dayofweek

# Keep only the required features
df = df[['location', 'service_zone', 'Zone', 'datetime_unix', 'datetime.day', 'datetime.dayofweek']]
df.rename(columns={'datetime_unix': 'datetime'}, inplace=True)

print("making the prediction now")
# Make a prediction
predictions = predictor.predict(df)

# Display the predictions
print(predictions)


