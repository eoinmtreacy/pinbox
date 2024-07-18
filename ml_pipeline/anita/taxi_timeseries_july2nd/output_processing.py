import pandas as pd
import numpy as np  # Import numpy

# Read the data
df = pd.read_csv("prediction_july.csv")
print(df.head())

# Drop specified columns
columns_to_drop = ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9']
df = df.drop(columns=columns_to_drop)
print(df.head())

# Handle non-finite values in the 'mean' column
df['mean'] = df['mean'].replace([np.inf, -np.inf], np.nan)  # Replace inf values with NaN
df['mean'] = df['mean'].fillna(0)  # Fill NaN values with 0

# Create the new column 'passenger_number' as bigint
df['passenger_number'] = df['mean'].astype('int64')
print(df.head())

# Dropping the 'mean' column
df = df.drop(columns=['mean'])
print(df.head())

df.to_csv('july_prediction_data.csv',index=False)

# Load the original dataset
original_df = pd.read_csv("updated_prediction_data.csv")


# Load the prediction dataset
prediction_df = pd.read_csv("july_prediction_data.csv")

# Rename columns in prediction_df to match original_df
prediction_df = prediction_df.rename(columns={'item_id': 'location', 'timestamp': 'datetime', 'passenger_number':'passenger_count'})
print('renamed the columns')

# Append prediction_df to original_df
updated_df = pd.concat([original_df, prediction_df[['location', 'datetime', 'passenger_count']]], ignore_index=True)

# Drop rows where passenger_count is 0 or smaller than 0
updated_df = updated_df[(updated_df['passenger_count'] > 0)]
# Save the updated DataFrame back to CSV
updated_df.to_csv("updated_prediction_data.csv", index=False)

print("Updated dataset saved to updated_prediction_data.csv")
