import React, { Component } from "react";
import data from '../assets/data/data.json'
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
    constructor(){
        super();
        this.pontos = [];
        this.state = {
            isIdle: true
        }
        this.changeToFalse = this.changeToFalse.bind(this)
    }
    
    creator(data){
        for (let i = 0; i < data['rooms'][0]['points'].length; i++){
            const idPonto = data['rooms'][0]['points'][i]['id']
            const namePonto = data['rooms'][0]['points'][i]['name']
            const baseImagePonto = '/assets/baseImages/' + data['rooms'][0]['points'][i]['baseImage']
            const titlePonto = data['rooms'][0]['points'][i]['title']
            const subtitlePonto = data['rooms'][0]['points'][i]['subtitle']
            const languageDescPonto = data['rooms'][0]['points'][i]['languageDesc']
            const number = data['rooms'][0]['points'][i]['number']
            const ponto = new Point(idPonto, namePonto, baseImagePonto, titlePonto, subtitlePonto, languageDescPonto, number)
            this.pontos.push(ponto)
        }
        this.pontos.sort((a, b) => (a.number > b.number) ? 1 : -1)
    }

    componentWillMount(){
        this.creator(data)
    }

    changeToFalse(){
        // this.setState({isIdle: false})
        // console.log('yey')
    }

    componentDidMount(){
        this.setState({isIdle: false})
    }
    
    render(){

        const baseImages = this.pontos.map((pontos) => {
            return(
                <div className='componenteImagem'>
                    <Link to={`/imagens/${pontos.idPonto}`}>
                        <img src={pontos.baseImagePonto}/>
                        <h1>{pontos.titlePonto}</h1>
                        <h2>{pontos.subtitlePonto}</h2>
                    </Link>
                </div>                
            )
        })

        const tituloLateral = <h1><b>Museu Municipal</b> Núcleo de Alverca</h1>
        const descricaoLateral = <p>{data['primaryText']}</p>

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
                    <HamburguerMenu/>
                
                    <div initial = {{x: -600, y: 0}} animate = {{x:0, y: -5, transition: {duration: 1}}} exit = {{x: -600, y: 0, transition: {duration: 0.75}}} className='sideBar'>
                        {tituloLateral}
                        {descricaoLateral}
                    </div>
                    <img initial = {{x: -600, y: 0}} animate = {{x:0, y: -5, transition: {duration: 1}}} exit = {{x: -600, y: 0, transition: {duration: 0.75}}} className = 'logo' src={logo} />
                </motion.div>
            </div>
        )
    }
}


export default Home;