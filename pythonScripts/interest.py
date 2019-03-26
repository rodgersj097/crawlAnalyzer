from pytrends.request import TrendReq
import csv
import pandas as pd
import sys
import matplotlib.pyplot as plt 
import matplotlib.dates as mdates
import matplotlib.ticker as plticker
plt.style.use('seaborn-whitegrid')
import numpy as np
google_username = "jacob_rodgers@worldvision.ca"
google_password = "Jakethesnake1!"
pytrends = TrendReq(google_username, google_password)
pytrends = TrendReq(hl='en-US', tz=360)



keywords = input("Please enter in the keywords")

pytrends.build_payload(keywords, geo='CA') 
interestOverTimeResults = str(sys.argv[1])
interestOverTimeResults= pytrends.interest_over_time() 
print(interestOverTimeResults)

interestOverTimeResults.to_csv(r'C:\Users\rodgersja\Documents\Google PyTrends\GoolgeTrendsResults.csv')
print(interestOverTimeResults)
sys.stdout.flush() 
Colnames = interestOverTimeResults.columns.values.tolist() 
del Colnames[-1]

interestOverTimeResults = interestOverTimeResults.reset_index()


print(interestOverTimeResults)
x = interestOverTimeResults['date']

for col in Colnames: 
    plt.title( col + " - Interest over time")
    plt.xlabel("Interest")
    plt.ylabel("Time - Date")
    plt.plot(x, interestOverTimeResults[col], label=col)
    
   

plt.legend(loc='upper left')
plt.show()