import requests
import shutil
import json
import os
import refresher

refresher.refresher()

# API KEY:
key = 'https://api.management.realizasom.com/projects/app/pt/KCLPFYWJcExvInAepy8drWCvddPEHW5Ze2dhn4xuEicMcjUT7PMgsycE8PN5hAOBK4T3Qk97UU83P75p6fZcHBZQNoqCRAYSuIeB'

# HTTP request from API KEY
getter = requests.get(key, headers={'User-Agent': 'Mozilla/5.0'})


####################################################################################
########################## Get JSON File ###########################################
####################################################################################

if (getter.status_code == 200): #If there's no error the json file will be written
    data = getter.json()
    with open('./front-end/src/assets/data/data.json', 'w') as f:
        json.dump(data, f, indent=4, ensure_ascii=True) # ensure_ascii=False -> ensures that accented letters do not become ascii
else: #if there's an error, it will be printed
    print('Problemas a atualizar o quiosque. Tente novamente ou contacte a empresa.\nErro:', getter.status_code)


####################################################################################
########################## Get file to folder #####################################
####################################################################################

def downloader(fileURL, time = -1):
    '''
    Download the images and videos to the assigned folders

    Requires: fileURL is a str with the file extension, time if the image isn't the baseImage
    Ensures: A .jpg/.mp4 file in the folder assigned to it
    '''
    fullURL = 'https://api.management.realizasom.com/files/' + fileURL #Full file url
    response = requests.get(fullURL, stream = True)
    
    tipo = 'baseImages'
    
    #Every file as a given time parameter that indicates the folder to which the file is going
    if time >= 200: #File is going to 'videos' folder
        tipo = 'videos'
    elif time >= 100 and time < 200: #File is going to 'thumbnails' folder
        tipo = 'thumbnails'
    elif time >= 0 and time < 100: #File is going to 'images' folder
        tipo = 'images'

    if response.status_code == 200:
        response.raw.decode_content = True
        with open('./front-end/public/assets/{}/{}'.format(tipo, fileURL),'wb') as f:
            shutil.copyfileobj(response.raw, f)
        print('{} sucessfully Downloaded: '.format(tipo.capitalize()),'{}'.format(fileURL))

    else:
        print('{} Couldn\'t be retreived'.format(tipo.capitalize()))

def exe(data):
    '''
    A loop that goes through all the previously acquired .json images

    Requires: The .json file data
    Ensures: The files downloaded
    '''

    for i in range(len(data['rooms'][0]['points'])):
        baseImage = data['rooms'][0]['points'][i]['baseImage']
        print('\n')
        downloader(baseImage)

        for l in range(len(data['rooms'][0]['points'][i]['slideshow'])):
            slideshow = data['rooms'][0]['points'][i]['slideshow'][l]['url']
            time = data['rooms'][0]['points'][i]['slideshow'][l]['time']
            downloader(slideshow, time)

exe(data)