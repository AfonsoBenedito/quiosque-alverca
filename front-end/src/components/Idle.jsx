import React, { Component, useState } from "react";
import idle_logos from '../assets/icons/idle_logos.png'
import teste from '../assets/icons/teste.png'
import './Idle.css';
import IdleTimer from 'react-idle-timer'
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

    return(
        <>
            <div className={idleImage ? 'idle' : 'idle active'} onClick={showIdle}>
                <div className='imagem'>
                    <img className='principal' src={teste}/>
                </div>
                <img className='logos' src={idle_logos}/>
            </div>
            <IdleTimer ref={ref => {idleTimerRef = ref}} timeout={5 * 60000} onIdle={onIdle} />
        </>
    )
}

export default Idle;