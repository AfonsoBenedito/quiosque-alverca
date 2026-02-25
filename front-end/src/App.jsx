import { useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Imagens from './components/Imagens';
import Home from './components/Home';
import Idle from './components/Idle';
import { useWindowScale } from './hooks/useWindowScale';
import { useImagePreloader } from './hooks/useImagePreloader';
import './styles/Language.css';
import './App.css';
import rectangulo from './assets/icons/retangulo.png';
import pt from './assets/icons/pt.png';
import spa from './assets/icons/spa.png';
import fra from './assets/icons/fra.png';
import eng from './assets/icons/eng.png';
import idleBg from './assets/icons/teste.png';
import idleLogos from './assets/icons/idle_logos.png';

const PRELOAD_SOURCES = [idleBg, idleLogos];

function App() {
  const [language, setLanguage] = useState('pt');
  const { scale, offsetX, offsetY } = useWindowScale();
  const ready = useImagePreloader(PRELOAD_SOURCES);

  return (
    <div className="app-outer">
      <div
        className="app-frame"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
          opacity: ready ? 1 : 0,
          transition: ready ? 'opacity 0.4s ease-in' : 'none',
        }}
      >
        <Router>
          <Route render={({ location }) => (
            <AnimatePresence exitBeforeEnter initial={false}>
              <Switch location={location} key={location.pathname}>
                <Route exact path="/"           render={(props) => <Home    {...props} language={language} />} />
                <Route       path="/imagens/:id" render={(props) => <Imagens {...props} language={language} />} />
              </Switch>
            </AnimatePresence>
          )} />
        </Router>

        <Idle language={language} />

        <div className='linguagens'>
          <img src={rectangulo} className='rectLang' alt="" />
          <img src={pt}  className='pt'  onClick={() => setLanguage('pt')} alt="" />
          <img src={eng} className='eng' onClick={() => setLanguage('en')} alt="" />
          <img src={spa} className='spa' onClick={() => setLanguage('es')} alt="" />
          <img src={fra} className='fra' onClick={() => setLanguage('fr')} alt="" />
        </div>
      </div>
    </div>
  );
}

export default App;
