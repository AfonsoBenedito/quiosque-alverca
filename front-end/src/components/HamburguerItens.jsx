import React, { Component } from "react"
import {HamburguerData} from './HamburguerData'
import {HamburguerDataES} from './HamburguerDataES'
import {HamburguerDataEN} from './HamburguerDataEN'
import {HamburguerDataFR} from './HamburguerDataFR'
import setaVoltar from '../assets/icons/return_arrow.png'
import './HamburguerItens.css';
import logo from '../assets/icons/logo.png'
import { motion } from "framer-motion";

class HamburguerItens extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOn: true,
            title: null,
            texto: null,
            texto2: null,
            texto3: null,
            texto4: null,
            texto5: null,
            texto6: null,
            texto7: null,
            texto8: null,
            texto9: null,
            texto10: null,
            texto11: null,
            textoMuseu: null
        }
    }

    handleClickItens(ponto){
        this.setState({
            isOn: false,
            title: ponto.title,
            texto: ponto.texto,
            texto2: ponto.texto2,
            texto3: ponto.texto3,
            texto4: ponto.texto4,
            texto5: ponto.texto5,
            texto6: ponto.texto6,
            texto7: ponto.texto7,
            texto8: ponto.texto8,
            texto9: ponto.texto9,
            texto10: ponto.texto10,
            texto11: ponto.texto11,
            textoMuseu: ponto.textoMuseu
        })
    }

    handleClickCruz(){
        this.setState({
            isOn: true,
            title: null,
            texto: null,
            texto2: null,
            texto3: null,
            texto4: null,
            texto5: null,
            texto6: null,
            texto7: null,
            texto8: null,
            texto9: null,
            texto10: null,
            texto11: null,
            textoMuseu: null
        })
    }

    render(){

        const HambLang = () =>{
            var arrayHam = []
            if(this.props.teste == 'pt'){
                arrayHam = HamburguerData
            } else if (this.props.teste == 'es'){
                arrayHam = HamburguerDataES
            } else if (this.props.teste == 'en'){
                arrayHam = HamburguerDataEN
            } else if (this.props.teste == 'fr'){
                arrayHam = HamburguerDataFR
            }

            return(
                arrayHam
            )
        }
        
        return(
            
            <>
                {HambLang().map((ponto, index) => {
                        return(
                            <div>
                                <li style = {this.state.isOn ? {opacity: 1} : {opacity: 0}}>
                                    <h1 onClick = {() => this.handleClickItens(ponto)} className = {ponto.cName}>{ponto.title}</h1>
                                </li>
                                
                            </div>
                )})}

                <div className = {this.state.isOn ? 'setaHamb-hidden' : 'setaHamb-active'} onClick = {() => this.handleClickCruz()}>
                    {/* <div className = 'linhaHamburguer'> </div> */}
                    <motion.div className = 'borderRight'></motion.div>
                    <motion.div className = 'borderBottom'></motion.div>
                    <motion.div className = 'borderLeft'></motion.div>
                    <img className = 'logoEmItens' src = {logo} />
                    <img className = 'setaVoltarEmItens'src = {setaVoltar} />
                    
                </div>
                
                {/* <div className = {this.state.isOn ? 'bordasAtivas' : 'bordasHidden'}> </div> */}

                <div className = 'conteudoHamb'>
                    <h1>{this.state.title}</h1>
                    <p className = 'texto'>{this.state.texto}</p>
                    <p className = 'texto2'>{this.state.texto2}</p>
                    <p className = 'texto3'>{this.state.texto3}</p>
                    <p className = 'texto4'>{this.state.texto4}</p>
                    <p className = 'texto5'>{this.state.texto5}</p>
                    <p className = 'texto6'>{this.state.texto6}</p>
                    <p className = 'texto7'>{this.state.texto7}</p>
                    <p className = 'texto8'>{this.state.texto8}</p>
                    <p className = 'texto9'>{this.state.texto9}</p>
                    <p className = 'texto10'>{this.state.texto10}</p>
                    <p className = 'texto11'>{this.state.texto11}</p>
                    <p className = 'textoMuseu'>{this.state.textoMuseu}</p>
                </div>
                <div className = 'linhaHamburguer'> </div>
                
            </>
        )}
}
export default HamburguerItens;