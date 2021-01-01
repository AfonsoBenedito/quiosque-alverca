import React, { Component } from "react";
import data from '../assets/data/data.json'
import Point from './Point'
import vl from '../assets/icons/vl.png'
import hl from '../assets/icons/hl.png'
import hamburguer from '../assets/icons/hamburguer.png'
import './Home.css';
import {Link} from 'react-router-dom'

class Home extends Component{
    constructor(){
        super();
        this.pontos = [];
    }
    
    creator(data){
        for (let i = 0; i < data['rooms'][0]['points'].length; i++){
            const idPonto = data['rooms'][0]['points'][i]['id']
            const namePonto = data['rooms'][0]['points'][i]['name']
            const baseImagePonto = '/assets/baseImages/' + data['rooms'][0]['points'][i]['baseImage']
            const titlePonto = data['rooms'][0]['points'][i]['title']
            const languageDescPonto = data['rooms'][0]['points'][i]['languageDesc']
            const ponto = new Point(idPonto, namePonto, baseImagePonto, titlePonto, languageDescPonto)
            this.pontos.push(ponto)
        }
    }

    componentWillMount(){
        this.creator(data)
    }
    
    render(){

        const baseImages = this.pontos.map((pontos) => {
            return(
                <div className='componenteImagem'>
                    <Link to={`/imagens/${pontos.idPonto}`}>
                        <img src={pontos.baseImagePonto}/>
                        <p>{pontos.namePonto}</p>
                    </Link>
                </div>                
            )
        })

        const tituloLateral = <h1><b>Museu Municipal</b> Núcleo de Alverca</h1>
        const descricaoLateral = <p>{data['primaryText']}</p>

        return(
            <div>
                <div className = 'grid'>
                    {baseImages}    
                </div>
                <div className='sideBar'>
                    {tituloLateral}
                    {descricaoLateral}
                </div>
                <img className = 'vl' src={vl}/>
                <img className = 'hl' src={hl} />
                <img className = 'hamburguer' src = {hamburguer} />
            </div>
        )
    }
}


export default Home;