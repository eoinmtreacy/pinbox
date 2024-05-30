from dotenv import load_dotenv
import requests
import os

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")
API_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
print(API_KEY)
query_params = {"location": "40.7789,-73.9692",
                "radius": "5000", "key": API_KEY}

response = requests.get(API_URL, params=query_params)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON data from the response
    data = response.json()
    # Print or process the data as needed
    print(data)
else:
    # Print the status code if the request failed
    print(f'Failed to retrieve data: {response.status_code}')
