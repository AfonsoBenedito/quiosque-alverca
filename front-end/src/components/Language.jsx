import React, { Component } from "react";
import './Language.css'
import rectangulo from '../assets/icons/retangulo.png'
import pt from '../assets/icons/pt.png'
import spa from '../assets/icons/spa.png'
import fra from '../assets/icons/fra.png'
import eng from '../assets/icons/eng.png'

class Language extends Component {
    render() {

    const selector = <div>
        <img src = {rectangulo} className = 'rectLang' />
        <img src = {pt} className = 'pt' />
        <img src = {eng} className = 'eng' />
        <img src = {spa} className = 'spa' />
        <img src = {fra} className = 'fra' />

    </div>

    return (
      <div>
          {selector}
      </div>
    );
  }
}

export default Language;
