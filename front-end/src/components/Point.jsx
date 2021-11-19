import React, { Component } from "react";
import Imagens from './Imagens'

export default class Point{
    constructor(idPonto, namePonto, baseImagePonto, titlePonto, subtitlePonto, languageDescPonto, number, id, name, url, tipo, time, caption, thumbnail, captionES, languageDescPontoES, titlePontoES, subtitlePontoES, captionEN, languageDescPontoEN, titlePontoEN, subtitlePontoEN, captionFR, languageDescPontoFR, titlePontoFR, subtitlePontoFR){
        this.idPonto = idPonto
        this.namePonto = namePonto
        this.baseImagePonto = baseImagePonto
        this.titlePonto = titlePonto
        this.subtitlePonto = subtitlePonto
        this.languageDescPonto = languageDescPonto

        this.number = number

        this.id = id 
        this.name = name
        this.url = url
        this.tipo = tipo
        this.time = time
        this.caption = caption
        this.thumbnail = thumbnail

        this.captionES = captionES
        this.languageDescPontoES = languageDescPontoES
        this.titlePontoES = titlePontoES
        this.subtitlePontoES = subtitlePontoES

        this.captionEN = captionEN
        this.languageDescPontoEN = languageDescPontoEN
        this.titlePontoEN = titlePontoEN
        this.subtitlePontoEN = subtitlePontoEN

        this.captionFR = captionFR
        this.languageDescPontoFR = languageDescPontoFR
        this.titlePontoFR = titlePontoFR
        this.subtitlePontoFR = subtitlePontoFR
    }

    setThumbnail(image){
        this.thumbnail = image
    }

    getId(){
        return this.idPonto
    }
}

