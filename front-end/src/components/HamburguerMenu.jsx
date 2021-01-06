import './HamburguerMenu.css';
import React, { Component, useState } from "react";
import teste from '../assets/icons/teste.png'
import x from '../assets/icons/x.png'
import hamburguer from '../assets/icons/hamburguer.png'
import {HamburguerData} from './HamburguerData'

function HamburguerMenu(){
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return(
        <>
            <div>
                <img className = 'hamburguer' src = {hamburguer} onClick = {showSidebar} />
            </div>         
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <img className = 'aviao' src={teste} />
                <ul className = 'nav-menu-items'>
                    <li className='navbar-toggle' onClick={showSidebar}><img src={x}/></li>
                    <li><h1 className = 'qs'>Quem somos</h1></li>
                    <li><h1 className = 'cont'>Contactos</h1></li>
                    <li><h1 className = 'ace'>Acessibilidade</h1></li>
                    <li><h1 className = 'conf'>Configurações</h1></li>
                    <li><h1 className = 'cre'>Créditos</h1></li>
                </ul>
            </nav>
        </>
    )
}


export default HamburguerMenu;