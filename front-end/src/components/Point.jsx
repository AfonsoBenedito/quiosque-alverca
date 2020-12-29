import React, { Component } from "react";
import data from '../assets/data/data.json'
import Imagens from './Imagens'

export default class Point{
    constructor(idPonto, namePonto, baseImagePonto, titlePonto, languageDescPonto, id, name, url, tipo, time, caption, thumbnail){
        this.idPonto = idPonto
        this.namePonto = namePonto
        this.baseImagePonto = baseImagePonto
        this.titlePonto = titlePonto
        this.languageDescPonto = languageDescPonto

        this.id = id 
        this.name = name
        this.url = url
        this.tipo = tipo
        this.time = time
        this.caption = caption
        this.thumbnail = thumbnail
    }

    setThumbnail(image){
        this.thumbnail = image
    }

    getId(){
        return this.idPonto
    }
}

