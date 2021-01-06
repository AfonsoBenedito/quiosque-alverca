import React, { Component } from "react";
import data from '../assets/data/data.json'
import Point from './Point'
import './Imagens.css';
import setaEsquerda from '../assets/icons/baseline_arrow_left.png'
import setaDireita from '../assets/icons/baseline_arrow_right.png'
import setaVoltar from '../assets/icons/return_arrow.png'
import thumbsEsquerda from '../assets/icons/thumbs_esquerda.png'
import thumbsDireita from '../assets/icons/thumbs_direita.png'
import hl from '../assets/icons/hl.png'
import {Link} from 'react-router-dom'

class Imagens extends Component{
    constructor(match){
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
            const subtitlePonto = data['rooms'][0]['points'][i]['subtitle']
            const languageDescPonto = data['rooms'][0]['points'][i]['languageDesc']

            for (let l = 0; l < data['rooms'][0]['points'][i]['slideshow'].length; l++){
                const id = data['rooms'][0]['points'][i]['slideshow'][l]['id']
                const name = data['rooms'][0]['points'][i]['slideshow'][l]['name']
                
                const time = data['rooms'][0]['points'][i]['slideshow'][l]['time']
                const caption = data['rooms'][0]['points'][i]['slideshow'][l]['caption']
                if(time > 0 && time < 100){
                    const url = '/assets/images/' + data['rooms'][0]['points'][i]['slideshow'][l]['url']
                    const ponto = new Point(idPonto, namePonto, baseImagePonto, titlePonto, subtitlePonto, languageDescPonto, 'null', id, name, url, 'Imagem', time, caption, url)
                    this.pontos.push(ponto)

                }else if(time > 199 && time < 300){
                    const url = '/assets/videos/' + data['rooms'][0]['points'][i]['slideshow'][l]['url']
                    const ponto = new Point(idPonto, namePonto, baseImagePonto, titlePonto, subtitlePonto, languageDescPonto, 'null', id, name, url, 'Video', time, caption, url)
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

    thumbsDireita(){
        const vaar = this.thumbsDiv.current;
        vaar.scrollLeft += 100;
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
        }, 1000)        
    }
    
    render(){
        const displayThumbs = this.pontos.map((ponto, index) =>
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
                            <img className = 'imagemFundo' src={ponto.thumbnail}/>
                        </div>
                    )
            }else if(ponto.tipo == 'Video'){
                return(
                    <div>
                        <section className = 'espacoPrincipal'>
                            <video className = 'imagemPrincipal' src ={ponto.url} autoplay='true' loop/>
                        </section>
                        <video className = 'imagemFundo' src ={ponto.url}/>
                    </div>
                )
            }
        }})

        const texto = this.pontos.map((ponto, index) =>{
            if (ponto.id == this.state.activeIndex){
                return(
                    <div className = 'textoP'>
                        <h3 className = 'textoPonto'>{ponto.caption}</h3>
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

        

        const setaVoltarHome = <Link to={'/'}>
                <div className = 'returnHome'>
                    <img className = 'setaHome' src={setaVoltar} />
                    <p>Voltar à Galeria</p>
                </div>
            </Link>

        const textoRoom = this.pontos.map((ponto, index) =>{
            if (ponto.id == this.state.activeIndex){
                return(
                    <div>
                        <div className = 'pointInfo'>
                            <h1>{ponto.titlePonto}</h1>
                            <h2>{ponto.subtitlePonto}</h2>
                            <hr />
                            <p>{ponto.languageDescPonto}</p>
                        </div>
                    </div>
                )
            }})

        // const setFinal = () =>{
        //     const vaar = this.thumbsDiv.current;
        //     // vaar.scrollLeft = vaar.scrollWidth
        //     // vaar.scrollLeft += vaar.scrollWidth;
        //     // this.setState({final: vaar.scrollLeft})
        //     // vaar.scrollLeft -= vaar.scrollWidth
        //     console.log(vaar)
        // }

        return(
            <div>
                <div className = 'imagenscss'>
                    <div id = "retanguloBranco"></div>
                    <div id = "retanguloAzul"></div>
                    <div class = 'thumbsDiv' ref = {this.thumbsDiv}>
                        {displayThumbs}
                    </div>
                    {displayPrincipal}
                    {texto}
                    {setaParaTras()}
                    {setaParaFrente()}
                    {textoRoom}
                    {setaVoltarHome}
                    <img className = 'setaThumbDireita' onClick ={this.thumbsDireita.bind(this)} ref = {this.setaDireita} src={thumbsDireita} />
                    <img className = 'setaThumbEsquerda' ref = {this.setaEsquerda} onClick ={this.thumbsEsquerda.bind(this)} src={thumbsEsquerda} />
                </div>
            </div>
        )
    }
}


export default Imagens;