import requests
import json

URL = "http://localhost:5050/"

def getPreferenceForUser(userId):
    # Example echo method
    payload = {
        "method": "getPreferenceForUser",
        "params": [userId],
        "jsonrpc": "2.0",
        "id": 0,
    }
    response = requests.post(URL, json=payload).json()
    print ("Preference list: %s" % str(response["result"]))
    return response["result"]

