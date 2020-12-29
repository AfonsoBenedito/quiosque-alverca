import os
import shutil

def refresher():
    '''
    Function that deletes the existing contents, replacing them with new empty folders

    Ensures: New folders, without any content
    '''
    if os.path.exists('./front-end/public/assets/baseImages'):
        shutil.rmtree('./front-end/public/assets/baseImages')

    if os.path.exists('./front-end/public/assets/images'):
        shutil.rmtree('./front-end/public/assets/images') 

    if os.path.exists('./front-end/public/assets/thumbnails'):
        shutil.rmtree('./front-end/public/assets/thumbnails')

    if os.path.exists('./front-end/public/assets/videos'):
        shutil.rmtree('./front-end/public/assets/videos')
        
    if os.path.exists('./front-end/public/assets/data'):
        shutil.rmtree('./front-end/public/assets/data')

    if not os.path.exists('./front-end/public/assets/baseImages'):
        os.makedirs('./front-end/public/assets/baseImages')

    if not os.path.exists('./front-end/public/assets/images'):
        os.makedirs('./front-end/public/assets/images') 

    if not os.path.exists('./front-end/public/assets/thumbnails'):
        os.makedirs('./front-end/public/assets/thumbnails')

    if not os.path.exists('./front-end/public/assets/videos'):
        os.makedirs('./front-end/public/assets/videos')
    
    if not os.path.exists('./front-end/public/assets/data'):
        os.makedirs('./front-end/public/assets/data')