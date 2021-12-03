import React, { Component, useRef } from "react";
import Imagens from './components/Imagens'
import Home from './components/Home'
import {BrowserRouter as Router, Switch, Route} from'react-router-dom'
import Language from './components/Language'
import Idle from './components/Idle'
import { AnimatePresence, motion } from "framer-motion";
import './components/Language.css'
import rectangulo from './assets/icons/retangulo.png'
import pt from './assets/icons/pt.png'
import spa from './assets/icons/spa.png'
import fra from './assets/icons/fra.png'
import eng from './assets/icons/eng.png'


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      language: 'pt'
    }
  }

  
  render(){    

    const selector = <div className = 'linguagens'>
        <img src = {rectangulo} className = 'rectLang' />
        <img src = {pt} className = 'pt' onClick = {() => {
          this.setState({
            language: 'pt'
          })
        }}/>
        <img src = {eng} className = 'eng' onClick = {() => {
          this.setState({
            language: 'en'
          })
        }}/>
        <img src = {spa} className = 'spa' onClick = {() => {
          this.setState({
            language: 'es'
          })
        }}/>
        <img src = {fra} className = 'fra' onClick = {() => {
          this.setState({
            language: 'fr'
          })
        }}/>

    </div>

    return (
      <div>

      <Router>
        <Route
        render={({ location }) => (
          <AnimatePresence exitBeforeEnter intial = {false}>
              
            <Switch location={location} key={location.pathname}>
              <Route exact path="/quiosque-alverca" render={(props) => <Home {...props} teste = {this.state.language} />}  />
              <Route path="/quiosque-alverca/imagens" render={(props) => <Imagens {...props} teste = {this.state.language} />} />
            </Switch>
          </AnimatePresence>
        )}
      />
      </Router>

      {/* <Language /> */}
      <Idle teste = {this.state.language}/>
      {selector}
      </div>
      
    );
  }

}

export default App;
