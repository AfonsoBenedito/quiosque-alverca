import './HamburguerMenu.css';
import React, { Component, useState } from "react";
import teste from '../assets/icons/teste.png'
import x from '../assets/icons/x.png'
import hamburguer from '../assets/icons/hamburguer.png'
import {HamburguerData} from './HamburguerData'
import HamburguerItens from './HamburguerItens'

function HamburguerMenu(props){
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const con = () => {console.log('nice')}

    const onClickChange = (ponto) =>{
        return(<p>{ponto.texto}</p>)
    }

    return(
        <>
            <div>
                <img className = 'hamburguer' src = {hamburguer} onClick = {showSidebar} />
            </div>         
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <img className = 'aviao' src={teste} />
                
                <ul className = 'nav-menu-items'>
                    <li className='navbar-toggle' onClick={showSidebar}><img src={x} className='cruz'/></li>

                    {/* {HamburguerData.map((ponto, index) => {
                        return(
                            <li onClick={() => onClickChange(ponto)}>
                                <h1 className = {ponto.cName}>{ponto.title}</h1>
                            </li>
                        )})} */}
                    <div className = 'hamburguerAzul'></div>
                    <HamburguerItens teste = {props.teste}/>


                    {/* <li onClick = {() => {console.log('hello')}}><h1 className = 'qs'>Quem somos</h1></li>
                    <li><h1 className = 'cont'>Contactos</h1></li>
                    <li><h1 className = 'ace'>Acessibilidade</h1></li>
                    <li><h1 className = 'conf'>Configurações</h1></li>
                    <li><h1 className = 'cre'>Créditos</h1></li> */}
                </ul>
            </nav>
        </>
    )
}


export default HamburguerMenu;