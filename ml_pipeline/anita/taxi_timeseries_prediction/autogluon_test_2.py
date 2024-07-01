from autogluon.tabular import TabularDataset, TabularPredictor

# Load the datasets
train_data = TabularDataset('/Users/anita/Documents/UCD_masters/data/train_data.csv')
test_data = TabularDataset('/Users/anita/Documents/UCD_masters/data/test_data.csv')

# Check the loaded data
print("Train Data Columns:", train_data.columns)
print("Test Data Columns:", test_data.columns)

# Load the pre-trained predictor
predictor = TabularPredictor.load("AutogluonModels/ag-20240531_131934")

# Define the label
label = 'busyness'

# Ensure the label column exists in the test data
if label in test_data.columns:
    # Drop the label column for prediction
    test_data_no_label = test_data.drop(columns=[label])
else:
    print(f"Warning: Label column '{label}' not found in test data")

# Make predictions
y_pred = predictor.predict(test_data_no_label)

# Display the head of the predictions
print("Predictions:")
print(y_pred.head())

# Evaluate the model
evaluation = predictor.evaluate(test_data, silent=True)
print("Evaluation:")
print(evaluation)

# Display the leaderboard
leaderboard = predictor.leaderboard(test_data)
print("Leaderboard:")
print(leaderboard)

