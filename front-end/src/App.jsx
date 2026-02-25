import React, { Component } from "react";
import Imagens from './components/Imagens'
import Home from './components/Home'
import {HashRouter as Router, Switch, Route} from'react-router-dom'
import Idle from './components/Idle'
import { AnimatePresence } from "framer-motion";
import './components/Language.css'
import './App.css'
import rectangulo from './assets/icons/retangulo.png'
import pt from './assets/icons/pt.png'
import spa from './assets/icons/spa.png'
import fra from './assets/icons/fra.png'
import eng from './assets/icons/eng.png'


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      language: 'pt',
      scale: 1,
      offsetX: 0,
      offsetY: 0
    }
    this.updateScale = this.updateScale.bind(this)
  }

  updateScale() {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    const offsetX = (window.innerWidth - 1920 * scale) / 2;
    const offsetY = (window.innerHeight - 1080 * scale) / 2;
    this.setState({ scale, offsetX, offsetY });
  }

  componentDidMount() {
    this.updateScale();
    window.addEventListener('resize', this.updateScale);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateScale);
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
      <div className="app-outer">
        <div className="app-frame" style={{ transform: `translate(${this.state.offsetX}px, ${this.state.offsetY}px) scale(${this.state.scale})` }}>

          <Router>
            <Route
            render={({ location }) => (
              <AnimatePresence exitBeforeEnter intial = {false}>

                <Switch location={location} key={location.pathname}>
                  <Route exact path="/" render={(props) => <Home {...props} teste = {this.state.language} />}  />
                  <Route path="/imagens" render={(props) => <Imagens {...props} teste = {this.state.language} />} />
                </Switch>
              </AnimatePresence>
            )}
          />
          </Router>

          {/* <Language /> */}
          <Idle teste = {this.state.language}/>
          {selector}

        </div>
      </div>

    );
  }

}

export default App;
