export default class Point {
    constructor({
        idPonto, namePonto, baseImagePonto, titlePonto, subtitlePonto, languageDescPonto,
        number = null, id = null, name = null, url = null, tipo = null, time = null,
        caption = null, thumbnail = null,
        captionES = null, languageDescPontoES = null, titlePontoES = null, subtitlePontoES = null,
        captionEN = null, languageDescPontoEN = null, titlePontoEN = null, subtitlePontoEN = null,
        captionFR = null, languageDescPontoFR = null, titlePontoFR = null, subtitlePontoFR = null,
    }) {
        this.idPonto = idPonto;
        this.namePonto = namePonto;
        this.baseImagePonto = baseImagePonto;
        this.titlePonto = titlePonto;
        this.subtitlePonto = subtitlePonto;
        this.languageDescPonto = languageDescPonto;
        this.number = number;
        this.id = id;
        this.name = name;
        this.url = url;
        this.tipo = tipo;
        this.time = time;
        this.caption = caption;
        this.thumbnail = thumbnail;
        this.captionES = captionES;
        this.languageDescPontoES = languageDescPontoES;
        this.titlePontoES = titlePontoES;
        this.subtitlePontoES = subtitlePontoES;
        this.captionEN = captionEN;
        this.languageDescPontoEN = languageDescPontoEN;
        this.titlePontoEN = titlePontoEN;
        this.subtitlePontoEN = subtitlePontoEN;
        this.captionFR = captionFR;
        this.languageDescPontoFR = languageDescPontoFR;
        this.titlePontoFR = titlePontoFR;
        this.subtitlePontoFR = subtitlePontoFR;
    }

    setThumbnail(image) {
        this.thumbnail = image;
    }
}
