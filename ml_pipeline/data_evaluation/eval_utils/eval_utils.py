import pandas as pd
import matplotlib.pyplot as plt
from docx import Document


class DataAnalysis:
    def __init__(self, name: str, df: pd.DataFrame):
        self.name = name
        self.df = df
        self.initial_analysis()

    def get_numeric_columns(self):
        # Get numeric columns
        self.numeric_columns = self.df.select_dtypes(
            ['int64', 'float64', 'datetime64']).columns

    def get_category_columns(self):
        # Get categoric columns
        self.category_columns = self.df.select_dtypes(['category']).columns
        self.num_category_columns = len(self.category_columns)

    def get_cardinalities(self):
        # Get numeric cardinalities
        if self.numeric_columns is None:
            self.get_numeric_columns()

        # Get cardinality of the numeric columns
        self.numeric_columns_card = self.df[self.numeric_columns].nunique()
        self.df_numeric_card = pd.DataFrame(
            self.numeric_columns_card, columns=['card'])

    def get_shape(self):
        # Outputs # rows
        print("Number of rows:", self.df.shape[0])
        # Outputs # cols
        print("Number of cols:", self.df.shape[1])
        self.num_rows = self.df.shape[0]
        self.num_cols = self.df.shape[1]

    def print_col_types(self):
        # Get the column types
        print("\n\n")
        print("Column types:")
        for col in self.df.columns:
            print(f"{col}: {self.df[col].dtype}")

    def convert_object_cols(self):
        # Convert all of the object cols to category
        object_columns = self.df.select_dtypes(['object']).columns
        for column in object_columns:
            self.df[column] = self.df[column].astype('category')

    def count_duplicates(self):
        # Find duplicate rows
        self.duplicate_count = self.df[self.df.duplicated() == True].shape[0]
        print("Number of duplicate rows:", self.duplicate_count)

    def get_null_values(self):
        self.num_null_vals = {}

        for col in self.df.columns:
            self.num_null_vals[col] = self.df[col].isnull().sum()
            print(col, self.df[col].isnull().sum())

    def initial_analysis(self):
        # Get the shape of the dataframe and print the first 5 rows for review
        self.get_shape()
        self.df.head()

        self.print_col_types()
        print("\n\n Convert column types to desired ones before continuing")

    def numeric_desc_features(self):
        # First describe the numeric features
        self.df_table_numeric = self.df[self.numeric_columns].describe().T

        # Add % missing
        numeric_columns_missing = 100 * \
            (self.df[self.numeric_columns].isnull().sum()/self.num_rows)
        self.df_numeric_missing = pd.DataFrame(
            numeric_columns_missing, columns=['%missing'])

        # Concatenate numeric, missing and cardinality cols
        df_numeric_columns_data_quality_report_table = pd.concat(
            [self.df_table_numeric, self.df_numeric_missing, self.df_numeric_card], axis=1)

        # Print data quality report table for numeric features to a file.
        df_numeric_columns_data_quality_report_table.to_csv(f"{self.name}-Amenities-DataQualityReport-NumericFeatures-Table.csv",
                                                            index_label='Feature')
        print(df_numeric_columns_data_quality_report_table)

    def categoric_desc_features(self):
        self.category_unique = self.df[self.category_columns].nunique()
        # Look once again at the summary stats table for categorical features
        self.df_table_categoric = self.df[self.category_columns].describe(
        ).T
        category_columns_perc_missing = 100 * \
            (self.df[self.category_columns].isnull().sum()/self.df.shape[0])
        self.df_category_perc_missing = pd.DataFrame(
            category_columns_perc_missing, columns=['%missing'])
        # cardinality
        category_columns_card = self.df[self.category_columns].nunique()
        self.df_category_card = pd.DataFrame(
            category_columns_card, columns=['card'])

        second_val = []
        second_freq = []
        for category in self.category_columns:
            # print(df[category].value_counts().index.tolist())
            if len(self.df[category].value_counts().index.tolist()) > 1:
                second_val.append(
                    self.df[category].value_counts().index.tolist()[1])
                second_freq.append(
                    self.df[category].value_counts().iloc[1])
            else:
                second_val.append("None")
                second_freq.append(0)

        # Concatenate numeric, missing and cardinality cols
        df_categoric_columns_data_quality_report_table = pd.concat(
            [self.df_table_categoric, self.df_category_perc_missing, self.df_category_card], axis=1)

        df_categoric_columns_data_quality_report_table['second'] = second_val
        df_categoric_columns_data_quality_report_table['second_freq'] = second_freq

        df_categoric_columns_data_quality_report_table = df_categoric_columns_data_quality_report_table[[
            'count', 'unique', 'top', 'freq', 'second', 'second_freq', '%missing', 'card']]
        # Print data quality report table for numeric features to a file.
        df_categoric_columns_data_quality_report_table.to_csv(f"{self.name}-Amenities-DataQualityReport-CategoricFeatures-Table.csv",
                                                              index_label='Feature')

    def print_value_proportions(self):
        print("\n\nValue proportions:")
        # Change category cols to remove
        # Look at the values taken by each categorical feature, as a proportion, including NaN
        for column in self.category_columns:
            # print("\n" + column)
            print(self.df[column].value_counts(normalize=True, dropna=False))

    def plot_numeric(self):
        # Plot them all together instead
        plt.figure()
        self.df.hist(figsize=(30, 20))
        plt.savefig(f"{self.name}_numeric_hist.png")

    def plot_categoric(self):
        # Change code to produce new figure every 10 plots
        num_cols = 2
        plots_per_fig = 10
        num_figures = (len(self.category_columns) +
                       plots_per_fig - 1)//plots_per_fig

        for i in range(num_figures):
            current_cols = self.category_columns[i*plots_per_fig: min(
                len(self.category_columns), (i+1)*plots_per_fig)]
            # Plot categoric columns
            num_rows = (len(current_cols) + 1) // num_cols

            # Create a single figure with subplots arranged in a 2-column grid
            fig, axes = plt.subplots(
                nrows=num_rows, ncols=2, figsize=(15, 5*num_rows))

            # Flatten the axes array to simplify indexing
            axes = axes.flatten()

            # Iterate over each column
            for j, column in enumerate(current_cols):
                # Plot each bar plot on its corresponding subplot
                self.df[column].value_counts(
                    dropna=False).plot(kind='bar', ax=axes[j])
                axes[j].set_title(column)

            for j in range(len(current_cols), num_rows * 2):
                fig.delaxes(axes[j])

            plt.savefig(f"{self.name}_categoric_box_plot_{i}.png")
            plt.show()

    def analyse(self, plots=True):
        self.get_numeric_columns()

        self.convert_object_cols()

        self.get_category_columns()

        self.count_duplicates()

        self.get_null_values()

        self.get_numeric_columns()

        self.get_cardinalities()

        self.print_value_proportions()

        self.numeric_desc_features()

        self.categoric_desc_features()
        if plots:
            self.plot_numeric()

            self.plot_categoric()

    def make_data_quality_report(self, params):
        self.dqr = DataQualityReport(self)


class DataQualityReport:
    def __init__(self, da: DataAnalysis, params):
        self.da = da
        self.params = params
