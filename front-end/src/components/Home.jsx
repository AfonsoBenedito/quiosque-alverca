import React, { Component } from "react";
import data from '../assets/data/datapt.json'
import dataES from '../assets/data/dataes.json'
import dataEN from '../assets/data/dataen.json'
import dataFR from '../assets/data/datafr.json'
import Point from './Point'
import vl from '../assets/icons/vl.png'
import hl from '../assets/icons/hl.png'
import logo from '../assets/icons/logo.png'
import './Home.css';
import {Link} from 'react-router-dom'
import HamburguerMenu from './HamburguerMenu'
import Idle from './Idle'
import { AnimatePresence, motion } from "framer-motion";

class Home extends Component{
    constructor(props){
        super(props);
        this.pontos = [];
        this.state = {
            isIdle: true,
            fechar: 0
        }
        this.changeToFalse = this.changeToFalse.bind(this)
    }
    
    creator(data, dataES, dataEN, dataFR){
        for (let i = 0; i < data['rooms'][0]['points'].length; i++){
            const idPonto = data['rooms'][0]['points'][i]['id']
            const namePonto = data['rooms'][0]['points'][i]['name']
            const baseImagePonto = import.meta.env.BASE_URL + 'assets/baseImages/' + data['rooms'][0]['points'][i]['baseImage']
            const titlePonto = data['rooms'][0]['points'][i]['title']
            const subtitlePonto = data['rooms'][0]['points'][i]['subtitle']
            const titlePontoES = dataES['rooms'][0]['points'][i]['title']
            const subtitlePontoES = dataES['rooms'][0]['points'][i]['subtitle']
            const titlePontoEN = dataEN['rooms'][0]['points'][i]['title']
            const subtitlePontoEN = dataEN['rooms'][0]['points'][i]['subtitle']
            const titlePontoFR = dataFR['rooms'][0]['points'][i]['title']
            const subtitlePontoFR = dataFR['rooms'][0]['points'][i]['subtitle']
            const languageDescPonto = data['rooms'][0]['points'][i]['languageDesc']
            const number = data['rooms'][0]['points'][i]['number']
            const ponto = new Point(idPonto, namePonto, baseImagePonto, titlePonto, subtitlePonto, languageDescPonto, number, null, null, null, null, null, null, null, null, null, titlePontoES, subtitlePontoES, null, null, titlePontoEN, subtitlePontoEN, null, null, titlePontoFR, subtitlePontoFR)
            this.pontos.push(ponto)
        }
        this.pontos.sort((a, b) => (a.number > b.number) ? 1 : -1)
    }

    componentWillMount(){
        this.creator(data, dataES, dataEN, dataFR)
    }

    changeToFalse(){
        // this.setState({isIdle: false})
        // console.log('yey')
    }

    componentDidMount(){
        this.setState({isIdle: false})
    }

    fecharWindow(){
        window.open("", "_self", '');
        window.close();
    }

    adicionarFechar(){
        this.setState({fechar: this.state.fechar + 1})
        if(this.state.fechar === 0){
            this.tempoFechar()
        } else if(this.state.fechar === 4){
            this.fecharWindow()
        }
        
    }

    tempoFechar(){
        setTimeout(() =>{
            // if (this.state.fechar < 4){
            //     this.setState({fechar: 0})
            // } else{
            //     this.fecharWindow()
            // }
            this.setState({fechar: 0})
        }, 4000)        
    }
    
    render(){

        const baseImages = this.pontos.map((pontos) => {
            var titulo = ''
            var subtitulo = ''
            if(this.props.teste == 'pt'){
                titulo = pontos.titlePonto
                subtitulo = pontos.subtitlePonto
            } else if (this.props.teste == 'es'){
                titulo = pontos.titlePontoES
                subtitulo = pontos.subtitlePontoES
            } else if (this.props.teste == 'en'){
                titulo = pontos.titlePontoEN
                subtitulo = pontos.subtitlePontoEN
            } else if (this.props.teste == 'fr'){
                titulo = pontos.titlePontoFR
                subtitulo = pontos.subtitlePontoFR
            }
            
            return(
                <div className='componenteImagem'>
                    <Link to={`/imagens/${pontos.idPonto}`}>
                        <img src={pontos.baseImagePonto}/>
                        <h1>{titulo}</h1>
                        <h2>{subtitulo}</h2>
                    </Link>
                </div>                
            )
        })

        const tituloLateral = () =>{ 
            var tituloLateral = ''
            if(this.props.teste == 'pt'){
                tituloLateral = data['title']
            } else if(this.props.teste == 'es'){
                tituloLateral = dataES['title']
            } else if(this.props.teste == 'en'){
                tituloLateral = dataEN['title']
            } else if(this.props.teste == 'fr'){
                tituloLateral = dataFR['title']
            }
            return(
                <h1 onClick = {this.adicionarFechar.bind(this)}>{tituloLateral}</h1>
            )}
        const descricaoLateral = () =>{ 
            var textoLateral = ''
            if (this.props.teste == 'pt'){
                textoLateral = data['primaryText']
            } else if (this.props.teste == 'es'){
                textoLateral = dataES['primaryText']
            } else if (this.props.teste == 'en'){
                textoLateral = dataEN['primaryText']
            } else if (this.props.teste == 'fr'){
                textoLateral = dataFR['primaryText']
            }
            return(
            <p>{textoLateral}</p>
            )}

        return(
            <div>
                <motion.div initial = {{opacity: 0}} animate = {{opacity: 1, transition: {delay: 0.75, duration: 0.5}}} exit = {{opacity: 0, transition: {duration: 0.75}}}>
                    <div id = "retanguloCastanho"></div>
                </motion.div>

                <motion.div initial = {{x: 1920, y: 0}} animate = {{x: 10, transition: {duration: 1}}} exit = {{x: 1920, transition: {duration: 0.75}}} className = 'grid'>
                    {baseImages}    
                </motion.div>
                
                {/* <img className = 'hl' src={hl} /> */}
                
                {/* <div id = 'azul'></div>  */}
                {/* <Idle isItOn = {this.state.isIdle}/> */}
                <motion.div initial = {{x: -600, y: -5}} animate = {{x:0, y: -10, transition: {duration: 1}}} exit = {{x: -600, y: 0, transition: {duration: 0.75}}}>
                    <HamburguerMenu teste = {this.props.teste}/>
                
                    <div initial = {{x: -600, y: 0}} animate = {{x:0, y: -5, transition: {duration: 1}}} exit = {{x: -600, y: 0, transition: {duration: 0.75}}} className='sideBar'>
                        {tituloLateral()}
                        {descricaoLateral()}
                    </div>
                    <img initial = {{x: -600, y: 0}} animate = {{x:0, y: -5, transition: {duration: 1}}} exit = {{x: -600, y: 0, transition: {duration: 0.75}}} className = 'logo' src={logo} />
                </motion.div>
            </div>
        )
    }
}


export default Home;