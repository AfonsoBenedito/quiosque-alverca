import React, { Component, useState } from "react";
import idle_logos from '../assets/icons/idle_logos.png'
import teste from '../assets/icons/teste.png'
import './Idle.css';
import IdleTimer from 'react-idle-timer'
import { AnimatePresence, motion } from "framer-motion";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from'react-router-dom'

function Idle(props){

    const [idleImage, setIdleImage] = useState(true);

    const showIdle = () => setIdleImage(false);
    const hideIdle = () => setIdleImage(true);
    var idleTimerRef = null
    const onIdle = () => {
      return(  
            <div>
                {hideIdle()}                
            </div>)
                
    }
    const comecar = () => {
        var comecarIdle = ''
        if (props.teste == 'pt'){
            comecarIdle = "Clique para começar"
        } else if (props.teste == 'en'){
            comecarIdle = "Click to start"
        } else if (props.teste == 'es'){
            comecarIdle = "Haga clic para empezar"
        } else if (props.teste == 'fr'){
            comecarIdle = "Cliquer pour commencer"
        }
        return(
            comecarIdle
        )
    }

    const alvercaEAviacao = () => {
        var alverca = ''
        if (props.teste == 'pt'){
            alverca = "Alverca e a Aviação"
        } else if (props.teste == 'en'){
            alverca = "Alverca and Aviation"
        } else if (props.teste == 'es'){
            alverca = "Alverca y Aviación"
        } else if (props.teste == 'fr'){
            alverca = "Alverca et Aviation"
        }
        return(
            alverca
        )
    }

    return(
        <>
            <div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={idleImage ? 'idle' : 'idle active'} onClick={showIdle}>
                <div className='imagem'>
                    <div className = 'azulIdle'></div>
                    <img className ='principal' src={teste}/>
                </div>
                <img className='logos' src={idle_logos}/>
                <div className = 'textosIdle'>
                    <h1 className = 'comecar'>{comecar()}</h1>
                    <h1 className = 'tituloIdle'>{alvercaEAviacao()}</h1>
                    <h1 className = 'anosIdle'>1918 - 2018</h1>
                </div>
            </div>
            <IdleTimer ref={ref => {idleTimerRef = ref}} timeout={5 * 60000} onIdle={onIdle} />
        </>
    )
}

export default Idle;