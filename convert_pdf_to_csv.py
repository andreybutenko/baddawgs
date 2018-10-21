from tabula import read_pdf  # tabula-py==1.3.0
import pandas as pd  # pandas==0.23.4

pdf_url = 'http://depts.washington.edu/uwpdweb/wordpress/wp-content/uploads/2014/06/061720142.pdf'
list_of_dfs = read_pdf(pdf_url, encoding='utf-8', spreadsheet=True, pages='all',
                       multiple_tables=True)

df = pd.DataFrame()
for each_df in list_of_dfs:
    df = df.append(each_df)

for column in df:
    if df[column].dtype == 'object':
        df[column] = df[column].str.replace('\r', ' ')

# Drop first three rows, then take first row as column headers
df = df.iloc[3:]
df.columns = df.iloc[0]
df = df.drop(df.index[0]).reset_index()

keep_columns = df.columns.tolist()[:-2]
keep_columns.remove('index')
df = df[keep_columns]
df.head()

df.to_csv('crimes.csv', encoding='utf-8')
