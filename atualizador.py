import requests
import shutil
import json

# API KEY:
key = 'https://api.management.realizasom.com/projects/app/pt/KCLPFYWJcExvInAepy8drWCvddPEHW5Ze2dhn4xuEicMcjUT7PMgsycE8PN5hAOBK4T3Qk97UU83P75p6fZcHBZQNoqCRAYSuIeB'

# HTTP request from API KEY
getter = requests.get(key)

####################################################################################
########################## Get JSON File ###########################################
####################################################################################

if (getter.status_code == 200): #If there's no error the json file will be written
    data = getter.json()
    with open('./data/data.json', 'w') as f:
        json.dump(data, f, indent=4, ensure_ascii=False) # ensure_ascii=False -> ensures that accented letters do not become ascii
else: #if there's an error, it will be printed
    print('Problemas a atualizar o quiosque. Tente novamente ou contacte a empresa.\nErro:', getter.status_code)

####################################################################################
########################## Get file to folder #####################################
####################################################################################


print(data["rooms"][0])





# file_url = '13bc7f74-94b4-41da-b193-4d44e9d2c794.mp4'
# full_url = 'https://api.management.realizasom.com/files/' + file_url

# response = requests.get(full_url, stream = True)

# if r.status_code == 200:
#     r.raw.decode_content = True # decode_content as to be True, otherwise the file's size will be zero.
    
#     with open('./video/imagem.mp4','wb') as f:
#         shutil.copyfileobj(r.raw, f)
        
#     print('Image sucessfully Downloaded: ','filename')
# else:
#     print('Image Couldn\'t be retreived')