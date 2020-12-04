import requests
import json

# API KEY:
key = 'https://api.management.realizasom.com/projects/app/pt/KCLPFYWJcExvInAepy8drWCvddPEHW5Ze2dhn4xuEicMcjUT7PMgsycE8PN5hAOBK4T3Qk97UU83P75p6fZcHBZQNoqCRAYSuIeB'

# HTTP request from API KEY
getter = requests.get(key)


if (getter.status_code == 200): #If there's no error the json file will be written
    data = getter.json()
    with open('./data/data.json', 'w') as f:
        json.dump(data, f, ensure_ascii=False) # ensure_ascii=False -> ensures that accented letters do not become ascii
else: #if there's an error, it will be printed
    print('Problemas a atualizar o quiosque. Tente novamente ou contacte a empresa.\nErro:', getter.status_code)
