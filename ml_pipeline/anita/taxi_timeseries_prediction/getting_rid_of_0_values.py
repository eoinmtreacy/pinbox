import pandas as pd
import numpy as np  # Import numpy

updated_df = pd.read_csv('ml_pipeline/updated_passenger_count.csv')
# Drop rows where passenger_count is 0 or smaller than 0
updated_df = updated_df[(updated_df['passenger_count'] > 0)]

# Drop duplicate rows
updated_df = updated_df.drop_duplicates()

updated_df.to_csv('ml_pipeline/updated_passenger_count.csv',index=False)