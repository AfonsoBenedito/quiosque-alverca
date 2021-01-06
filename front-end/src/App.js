import React, { Component, useRef } from "react";
import Imagens from './components/Imagens'
import Home from './components/Home'
import {BrowserRouter as Router, Switch, Route} from'react-router-dom'
import Language from './components/Language'
import Idle from './components/Idle'


class App extends Component{
  constructor(props){
    super(props)
  }
  render(){    
    return (
      <div>
        {console.clear()}
        <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/imagens' component={Imagens}/>
          </Switch>
        </Router>
        <Language />
        <Idle/>
        
      </div>
    );
  }

}

export default App;
