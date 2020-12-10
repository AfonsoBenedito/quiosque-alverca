import os
import shutil

def refresher():
    '''
    Function that deletes the existing contents, replacing them with new empty folders

    Ensures: New folders, without any content
    '''
    if os.path.exists('baseImages'):
        shutil.rmtree('baseImages')

    if os.path.exists('images'):
        shutil.rmtree('images') 

    if os.path.exists('thumbnails'):
        shutil.rmtree('thumbnails')

    if os.path.exists('videos'):
        shutil.rmtree('videos')

    if not os.path.exists('baseImages'):
        os.makedirs('baseImages')

    if not os.path.exists('images'):
        os.makedirs('images') 

    if not os.path.exists('thumbnails'):
        os.makedirs('thumbnails')

    if not os.path.exists('videos'):
        os.makedirs('videos')