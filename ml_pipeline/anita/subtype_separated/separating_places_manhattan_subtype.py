import pandas as pd

#gpt generated and files adapted for use

# Load the CSV file into a DataFrame
df = pd.read_csv('places_manhattan_4_july.csv')

# Ensure that the 'subtype' column exists
if 'subtype' not in df.columns:
    raise ValueError("The 'subtype' column is not present in the CSV file")

# Get the unique subtypes
subtypes = df['subtype'].unique()

# Loop through each subtype and save a new CSV file
for subtype in subtypes:
    # Filter the DataFrame by subtype
    df_subtype = df[df['subtype'] == subtype]

    # Create a file name using the subtype
    file_name = f'places_{subtype}.csv'

    # Save the filtered DataFrame to a new CSV file
    df_subtype.to_csv(file_name, index=False)

    print(f'Saved {file_name}')
