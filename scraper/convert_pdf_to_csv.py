from tabula import read_pdf  # tabula-py==1.3.0
import pandas as pd  # pandas==0.23.4

pdf_url = 'http://depts.washington.edu/uwpdweb/wordpress/wp-content/uploads/2014/06/061720142.pdf'
list_of_dfs = read_pdf(pdf_url, encoding='utf-8', spreadsheet=True, pages='all',
                       multiple_tables=True)

# Append all pages of PDF into one DataFrame
df = pd.DataFrame()
for each_df in list_of_dfs:

    if len(each_df) > 10:  # This probably isn't a bad parse
        if each_df.loc[[0]][each_df.columns[0]].isnull()[0]:
            # New pages sometimes have the top row shifted right. Shift them back to the left.
            each_df.loc[[0]] = each_df.loc[[0]].shift(-1, axis=1)
        df = df.append(each_df)

# Replace the '\r' with a space in every cell
for column in df:
    if df[column].dtype == 'object':
        df[column] = df[column].str.replace('\r', ' ')

# Drop first three rows, then take first row as column headers
df = df.iloc[3:]
df.columns = df.iloc[0]
df = df.drop(df.index[0]).reset_index()

# Remove columns titled 'nan'
keep_columns = df.columns.tolist()[:-2]
keep_columns.remove('index')
df = df[keep_columns]

# Drop rows that are completely empty
df = df.dropna(how='all')

# Split date and time into new columns
temp = pd.DataFrame(df['Reported Date and Time'].str.split(' ', expand=True))
column_names = ['Reported Date', 'Reported Time', 'ToDrop']
temp.columns = column_names
temp = temp.drop('ToDrop', axis=1)
df = pd.concat([temp, df], axis=1)

df.to_json('crimes.json', orient='index')
