import React, { Component } from "react";
import data from '../assets/data/datapt.json'
import dataES from '../assets/data/dataes.json'
import dataEN from '../assets/data/dataen.json'
import dataFR from '../assets/data/datafr.json'
import Point from './Point'
import './Imagens.css';
import setaEsquerda from '../assets/icons/baseline_arrow_left.png'
import setaDireita from '../assets/icons/baseline_arrow_right.png'
import setaVoltar from '../assets/icons/return_arrow.png'
import thumbsEsquerda from '../assets/icons/thumbs_esquerda.png'
import thumbsDireita from '../assets/icons/thumbs_direita.png'
import hl from '../assets/icons/hl.png'
import {Link} from 'react-router-dom'
import { AnimatePresence, motion } from "framer-motion";

class Imagens extends Component{
    constructor(match, props){
        super();
        this.pontos = [];
        this.thumbsDiv = React.createRef();
        this.setaEsquerda = React.createRef();
        this.setaDireita = React.createRef();
        this.state = {
            idPonto: parseInt(match.location.pathname.replace('/imagens/', '')),
            activeIndex: null,
            final: null
        }
    }

    handleClickThumb(toque){
        this.setState({
            activeIndex: toque
        })
        console.log(toque)
    }

    handleClickSetaTras(array){
        for(let i = 0; i < array.length; i++){
            if (array[i] == this.state.activeIndex){
                this.setState({
                    activeIndex: array[i - 1]
                })
                this.teste(i)
            }
        }
    }

    handleClickSetaFrente(array){
        for(let i = 0; i < array.length; i++){
            if (array[i] == this.state.activeIndex){
                this.setState({
                    activeIndex: array[i + 1]
                })
                this.teste(i+2)
            }
        }
    }

    creator(data, dataES, dataEN, dataFR){
        for (let i = 0; i < data['rooms'][0]['points'].length; i++){
            const idPonto = data['rooms'][0]['points'][i]['id']
            const namePonto = data['rooms'][0]['points'][i]['name']
            const baseImagePonto = data['rooms'][0]['points'][i]['baseImage']
            const titlePonto = data['rooms'][0]['points'][i]['title']
            const titlePontoES = dataES['rooms'][0]['points'][i]['title']
            const titlePontoEN = dataEN['rooms'][0]['points'][i]['title']
            const titlePontoFR = dataFR['rooms'][0]['points'][i]['title']
            const subtitlePonto = data['rooms'][0]['points'][i]['subtitle']
            const subtitlePontoES = dataES['rooms'][0]['points'][i]['subtitle']
            const subtitlePontoEN = dataEN['rooms'][0]['points'][i]['subtitle']
            const subtitlePontoFR = dataFR['rooms'][0]['points'][i]['subtitle']
            const languageDescPonto = data['rooms'][0]['points'][i]['languageDesc']
            const languageDescPontoES = dataES['rooms'][0]['points'][i]['languageDesc']
            const languageDescPontoEN = dataEN['rooms'][0]['points'][i]['languageDesc']
            const languageDescPontoFR = dataFR['rooms'][0]['points'][i]['languageDesc']

            for (let l = 0; l < data['rooms'][0]['points'][i]['slideshow'].length; l++){
                const id = data['rooms'][0]['points'][i]['slideshow'][l]['id']
                const name = data['rooms'][0]['points'][i]['slideshow'][l]['name']
                
                const time = data['rooms'][0]['points'][i]['slideshow'][l]['time']
                const caption = data['rooms'][0]['points'][i]['slideshow'][l]['caption']
                const captionES = dataES['rooms'][0]['points'][i]['slideshow'][l]['caption']
                const captionEN = dataEN['rooms'][0]['points'][i]['slideshow'][l]['caption']
                const captionFR = dataFR['rooms'][0]['points'][i]['slideshow'][l]['caption']
                if(time >= 0 && time < 500){
                    const url = import.meta.env.BASE_URL + 'assets/images/' + data['rooms'][0]['points'][i]['slideshow'][l]['url']
                    const ponto = new Point(idPonto, namePonto, baseImagePonto, titlePonto, subtitlePonto, languageDescPonto, 'null', id, name, url, 'Imagem', time, caption, url, captionES, languageDescPontoES, titlePontoES, subtitlePontoES, captionEN, languageDescPontoEN, titlePontoEN, subtitlePontoEN, captionFR, languageDescPontoFR, titlePontoFR, subtitlePontoFR)
                    this.pontos.push(ponto)

                }else if(time > 699 && time < 900){
                    const url = import.meta.env.BASE_URL + 'assets/videos/' + data['rooms'][0]['points'][i]['slideshow'][l]['url']
                    const ponto = new Point(idPonto, namePonto, baseImagePonto, titlePonto, subtitlePonto, languageDescPonto, 'null', id, name, url, 'Video', time, caption, url, captionES, languageDescPontoES, titlePontoES, subtitlePontoES, captionEN, languageDescPontoEN, titlePontoEN, subtitlePontoEN, captionFR, languageDescPontoFR, titlePontoFR, subtitlePontoFR)
                    this.pontos.push(ponto)

                }
            }
        }

        for (let i = 0; i < data['rooms'][0]['points'].length; i++){

            const idPontoParaThumb = data['rooms'][0]['points'][i]['id']

            for (let l = 0; l < data['rooms'][0]['points'][i]['slideshow'].length; l++){
                const urlParaThumb = import.meta.env.BASE_URL + 'assets/thumbnails/' + data['rooms'][0]['points'][i]['slideshow'][l]['url']
                const timeParaThumb = data['rooms'][0]['points'][i]['slideshow'][l]['time']
                if (timeParaThumb > 499 && timeParaThumb < 700){
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
        this.creator(data, dataES, dataEN, dataFR)
        const primeiroActive = this.pontos.reverse().map((pontos, index) => {
            if(pontos.idPonto == this.state.idPonto){
                this.setState({
                    activeIndex: pontos.id
                })
            }
        })
        this.pontos.reverse()
    }

    thumbsDireita(){
        const vaar = this.thumbsDiv.current;
        vaar.scrollLeft += 100;
    }

    teste(indice){
        const vaar = this.thumbsDiv.current;
        const mudar = indice
        vaar.scrollLeft = 15.5 + (238 + 15.5) * (mudar - 3)
    }

    thumbsEsquerda(){
        const vaar = this.thumbsDiv.current;
        vaar.scrollLeft -= 100;
        console.log(vaar)
    }

    checkWidth(){
        const vaar = this.thumbsDiv.current;
        vaar.scrollLeft += vaar.scrollWidth
        const final = vaar.scrollLeft
        vaar.scrollLeft -= vaar.scrollWidth
        return (final)
    }

    componentDidMount(){
        const vaar = this.thumbsDiv.current;
        const setaEsquerda = this.setaEsquerda.current;
        const setaDireita = this.setaDireita.current;
        setTimeout(()=>{
            this.setState({
                final: this.checkWidth()
            })
        }, 3000)
        setInterval(() =>{
            if(vaar.scrollLeft == 0){
                setaEsquerda.style.opacity = 0.25
            } else{
                setaEsquerda.style.opacity = 1
            };

            if(vaar.scrollLeft == this.state.final){
                setaDireita.style.opacity = 0.25
            } else{
                setaDireita.style.opacity = 1
            };
        }, 100)        
    }
    
    render(){
        const displayThumbs = this.pontos.sort((a, b) => a.time > b.time ? 1 : -1).map((ponto, index) =>
            {if(ponto.idPonto == this.state.idPonto){
                    if(ponto.tipo == 'Imagem'){
                        return(<img className ='thumbnails' src={ponto.thumbnail} onClick={() => this.handleClickThumb(ponto.id)}/>)
                    }else if(ponto.tipo == 'Video'){
                        return(
                            <video className ='thumbnails'  src ={ponto.url} onClick={() => this.handleClickThumb(ponto.id)}  loop/>
                        )
                    }
                }
            }
        )

        const displayPrincipal = this.pontos.map((ponto, index) => {
            if (ponto.id == this.state.activeIndex){
                if(ponto.tipo == 'Imagem'){
                    return(
                        <div>
                            <section className = 'espacoPrincipal'>
                                <img className = 'imagemPrincipal' src={ponto.thumbnail}/>
                            </section>
                            {/* <img className = 'imagemFundo' src={ponto.thumbnail}/> */}
                        </div>
                    )
            }else if(ponto.tipo == 'Video'){
                return(
                    <div>
                        <section className = 'espacoPrincipal'>
                            <video className = 'imagemPrincipal' src ={ponto.url} autoplay='true' loop/>
                        </section>
                        {/* <video className = 'imagemFundo' src ={ponto.url}/> */}
                    </div>
                )
            }
        }})

        const imagemDeFundo = this.pontos.map((ponto, index) => {
            if (ponto.id == this.state.activeIndex){
                if(ponto.tipo == 'Imagem'){
                    return(
                        <div>
                            <img className = 'imagemFundo' src={ponto.thumbnail}/>
                        </div>
                    )
            }else if(ponto.tipo == 'Video'){
                return(
                    <div>
                        <video className = 'imagemFundo' src ={ponto.url}/>
                    </div>
                )
            }
        }})

        const texto = this.pontos.map((ponto, index) =>{
            if (ponto.id == this.state.activeIndex){
                var caption = ''

                if (this.props.teste == 'pt'){
                    caption = ponto.caption
                } else if (this.props.teste == 'es'){
                    caption = ponto.captionES
                } else if (this.props.teste == 'en'){
                    caption = ponto.captionEN
                } else if (this.props.teste == 'fr'){
                    caption = ponto.captionFR
                }
                
                return(
                    <div className = 'textoP'>
                        <h3 className = 'textoPonto'>{caption}</h3>
                    </div>
                    )
            }})

        const arrayAtual = []

        const array = this.pontos.map((ponto, index) => {
            if(ponto.idPonto == this.state.idPonto){
                arrayAtual.push(ponto.id)
            }
        })

        const setaParaTras = () => {
            if(this.state.activeIndex != arrayAtual[0]){
                return(
                    <div className = 'setaTras'>
                        <img src={setaEsquerda} onClick={() => this.handleClickSetaTras(arrayAtual)}/>
                    </div>

            )} else{
                return(<div className = 'setaTras'>
                        <img className = 'desativado' src={setaEsquerda}/>
                    </div>)
            }
        }

        const setaParaFrente = () => {
            if(this.state.activeIndex != arrayAtual[arrayAtual.length - 1]){
                return(
                <div className = 'setaFrente'>
                    <img src={setaDireita} onClick={() => this.handleClickSetaFrente(arrayAtual)}/>
                </div>)
            } else{
                return(<div className = 'setaFrente'>
                        <img className = 'desativado' src={setaDireita}/>
                    </div>)
            }
        }

        const setaVoltarHome = () => {
            var goBack = ''
            if (this.props.teste == 'pt'){
                goBack = 'Voltar à Galeria'
            } else if (this.props.teste == 'es'){
                goBack = 'Volver a la Galería'
            } else if (this.props.teste == 'en'){
                goBack = 'Back to Gallery'
            } else if (this.props.teste == 'fr'){
                goBack = 'Retour à la galerie'
            }
            return(
                <Link to={'/'}>
                    <div className = 'returnHome'>
                        <img className = 'setaHome' src={setaVoltar} />
                        <p>{goBack}</p>
                    </div>
                </Link>
            )}

        const textoRoom = this.pontos.map((ponto, index) =>{
            if (ponto.id == this.state.activeIndex){
                var titulo = ''
                var subtitulo = ''
                var languageDescPonto = ''
                if (this.props.teste == 'pt'){
                    titulo = ponto.titlePonto
                    subtitulo = ponto.subtitlePonto
                    languageDescPonto =  ponto.languageDescPonto
                } else if (this.props.teste == 'es'){
                    titulo = ponto.titlePontoES
                    subtitulo = ponto.subtitlePontoES
                    languageDescPonto =  ponto.languageDescPontoES
                } else if (this.props.teste == 'en'){
                    titulo = ponto.titlePontoEN
                    subtitulo = ponto.subtitlePontoEN
                    languageDescPonto =  ponto.languageDescPontoEN
                } else if (this.props.teste == 'fr'){
                    titulo = ponto.titlePontoFR
                    subtitulo = ponto.subtitlePontoFR
                    languageDescPonto =  ponto.languageDescPontoFR
                }
                return(
                    <div>
                        <div className = 'pointInfo'>
                            <h1>{titulo}</h1>
                            <h2>{subtitulo}</h2>
                            <hr />
                            <p>{languageDescPonto}</p>
                        </div>
                    </div>
                )
            }
        })

        return(
            <div>
                <div className = 'imagenscss'>

                    <motion.div initial = {{x: -427}} animate = {{x: -1, transition: {delay: 0.1, duration: 0.75}}} exit = {{x: -427, transition:{duration: 0.75}}} id = "retanguloAzul"></motion.div>

                    <motion.div initial = {{x: 1920}} animate = {{x: 0, transition: {delay: 0.1, duration: 0.75}}} exit = {{x: 1920, transition:{duration: 0.75}}} class = 'thumbsDiv' ref = {this.thumbsDiv}>
                        {displayThumbs}
                    </motion.div>

                    <motion.div initial = {{x: 1920, y: 0}} animate = {{x: 0, y: -5, transition: {delay: 0.1, duration: 0.75}}} exit = {{x: 1920, y: -5, transition:{duration: 0.75}}}>
                        {displayPrincipal}
                    </motion.div>

                    <div>
                        
                        <motion.div initial = {{x: 1920, y:0}} animate = {{x: 0,y: -5, transition: {delay: 0.1, duration: 0.75}}} exit = {{x: 1920, y: -5, transition:{duration: 0.75}}}>
                            {setaParaTras()}
                            {texto}
                            {setaParaFrente()}
                        </motion.div>
                        
                        <motion.img initial = {{x: 1920}} animate = {{x: 0, transition: {delay: 0.1, duration: 0.75}}} exit = {{x: 1920, transition:{duration: 0.75}}} className = 'setaThumbDireita' onClick ={this.thumbsDireita.bind(this)} ref = {this.setaDireita} src={thumbsDireita} />
                        <motion.img initial = {{x: 1920}} animate = {{x: 0, transition: {delay: 0.1, duration: 0.75}}} exit = {{x: 1920, transition:{duration: 0.75}}} className = 'setaThumbEsquerda' ref = {this.setaEsquerda} onClick ={this.thumbsEsquerda.bind(this)} src={thumbsEsquerda} />
                    </div>

                    <motion.div initial = {{x: -427, y: 0}} animate = {{x: 0, y: -10, transition: {delay: 0.1, duration: 0.75}}} exit = {{x: -427, y: -10, transition:{duration: 0.75}}}>
                        {textoRoom}
                        {setaVoltarHome()}
                    </motion.div>
                    

                    <motion.div initial = {{opacity: 1}} animate = {{opacity: 1, transition: {delay: 0.1, duration: 1}}} exit = {{opacity: 0.5, transition: {delay: 0.85, duration: 0.1}}}>
                        <div id = "retanguloBranco"></div>
                    </motion.div>

                    <motion.div initial = {{opacity: 0}} animate = {{opacity: 1, transition: {duration: 0.3, delay: 0}}} exit = {{opacity: 0, transition: {delay: 0.75, duration: 0.1}}}>
                        {imagemDeFundo}
                    </motion.div>
                </div>
            </div>
        )
    }
}


export default Imagens;