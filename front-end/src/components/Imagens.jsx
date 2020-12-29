import React, { Component } from "react";
import data from '../assets/data/data.json'
import Point from './Point'
import './Imagens.css';
import setaEsquerda from '../assets/icons/baseline_arrow_left.png'
import setaDireita from '../assets/icons/baseline_arrow_right.png'
import setaVoltar from '../assets/icons/return_arrow.png'
import {Link} from 'react-router-dom'

class Imagens extends Component{
    constructor(match){
        super();
        this.pontos = [];
        this.state = {
            idPonto: parseInt(match.location.pathname.replace('/imagens/', '')),
            activeIndex: null
        }
    }

    handleClickThumb(toque){
        this.setState({
            activeIndex: toque
        })
    }

    handleClickSetaTras(array){
        for(let i = 0; i < array.length; i++){
            if (array[i] == this.state.activeIndex){
                this.setState({
                    activeIndex: array[i - 1]
                })
            }
        }
    }

    handleClickSetaFrente(array){
        for(let i = 0; i < array.length; i++){
            if (array[i] == this.state.activeIndex){
                this.setState({
                    activeIndex: array[i + 1]
                })
            }
        }
    }
    
    creator(data){
        for (let i = 0; i < data['rooms'][0]['points'].length; i++){
            const idPonto = data['rooms'][0]['points'][i]['id']
            const namePonto = data['rooms'][0]['points'][i]['name']
            const baseImagePonto = data['rooms'][0]['points'][i]['baseImage']
            const titlePonto = data['rooms'][0]['points'][i]['title']
            const languageDescPonto = data['rooms'][0]['points'][i]['languageDesc']

            for (let l = 0; l < data['rooms'][0]['points'][i]['slideshow'].length; l++){
                const id = data['rooms'][0]['points'][i]['slideshow'][l]['id']
                const name = data['rooms'][0]['points'][i]['slideshow'][l]['name']
                
                const time = data['rooms'][0]['points'][i]['slideshow'][l]['time']
                const caption = data['rooms'][0]['points'][i]['slideshow'][l]['caption']
                if(time > 0 && time < 100){
                    const url = '/assets/images/' + data['rooms'][0]['points'][i]['slideshow'][l]['url']
                    const ponto = new Point(idPonto, namePonto, baseImagePonto, titlePonto, languageDescPonto, id, name, url, 'Imagem', time, caption, url)
                    this.pontos.push(ponto)

                }else if(time > 199 && time < 300){
                    const url = '/assets/videos/' + data['rooms'][0]['points'][i]['slideshow'][l]['url']
                    const ponto = new Point(idPonto, namePonto, baseImagePonto, titlePonto, languageDescPonto, id, name, url, 'Video', time, caption, url)
                    this.pontos.push(ponto)

                }
            }
        }

        for (let i = 0; i < data['rooms'][0]['points'].length; i++){

            const idPontoParaThumb = data['rooms'][0]['points'][i]['id']

            for (let l = 0; l < data['rooms'][0]['points'][i]['slideshow'].length; l++){
                const urlParaThumb = '/assets/thumbnails/' + data['rooms'][0]['points'][i]['slideshow'][l]['url']
                const timeParaThumb = data['rooms'][0]['points'][i]['slideshow'][l]['time']
                if (timeParaThumb > 99 && timeParaThumb < 200){
                    for(let k = 0; k < this.pontos.length; k++){
                        if((timeParaThumb - 100) == this.pontos[k].time && idPontoParaThumb == this.pontos[k].idPonto){
                            this.pontos[k].setThumbnail(urlParaThumb)
                        }
                    }
                }
            }
        }
    }

    componentWillMount(){
        this.creator(data)
        const primeiroActive = this.pontos.reverse().map((pontos, index) => {
            if(pontos.idPonto == this.state.idPonto){
                this.setState({
                    activeIndex: pontos.id
                })
            }
        })
        this.pontos.reverse()
    }
    
    render(){
        const displayThumbs = this.pontos.map((ponto, index) =>
            {if(ponto.idPonto == this.state.idPonto){
                    if(ponto.tipo == 'Imagem'){
                        return(<img src={ponto.thumbnail} onClick={() => this.handleClickThumb(ponto.id)}/>)
                    }else if(ponto.tipo == 'Video'){
                        return(
                            <video src ={ponto.url} onClick={() => this.handleClickThumb(ponto.id)} autoplay='true' loop/>
                        )
                    }
                }
            }
        )

        const displayPrincipal = this.pontos.map((ponto, index) => {
            if (ponto.id == this.state.activeIndex){
                if(ponto.tipo == 'Imagem'){
                    return(<img src={ponto.thumbnail}/>)
            }else if(ponto.tipo == 'Video'){
                return(
                    <video src ={ponto.url} autoplay='true' loop/>
                )
            }
        }})

        const texto = this.pontos.map((ponto, index) =>{
            if (ponto.id == this.state.activeIndex){
                return(<h3>{ponto.caption}</h3>)
            }})

        const arrayAtual = []

        const array = this.pontos.map((ponto, index) => {
            if(ponto.idPonto == this.state.idPonto){
                arrayAtual.push(ponto.id)
            }
        })

        const setaParaTras = () => {
            if(this.state.activeIndex != arrayAtual[0]){
                return(<img src={setaEsquerda} onClick={() => this.handleClickSetaTras(arrayAtual)}/>)
            } else{
                return(<img className = 'desativado' src={setaEsquerda}/>)
            }
        }

        const setaParaFrente = () => {
            if(this.state.activeIndex != arrayAtual[arrayAtual.length - 1]){
                return(<img src={setaDireita} onClick={() => this.handleClickSetaFrente(arrayAtual)}/>)
            } else{
                return(<img className = 'desativado' src={setaDireita}/>)
            }
        }

        const setaVoltarHome = <Link to={'/'}><img src={setaVoltar} /></Link>

        const textoRoom = this.pontos.map((ponto, index) =>{
            if (ponto.id == this.state.activeIndex){
                return(
                    <div>
                        <h2>{ponto.namePonto}</h2>
                        <p>{ponto.languageDescPonto}</p>
                    </div>
                )
            }})


        return(
            <div>
                {displayThumbs}
                {displayPrincipal}
                {texto}
                {setaParaTras()}
                {setaParaFrente()}
                {textoRoom}
                {setaVoltarHome}
            </div>
        )
    }
}


export default Imagens;