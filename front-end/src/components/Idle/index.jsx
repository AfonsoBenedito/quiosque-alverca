import { useState, useRef } from 'react';
import IdleTimer from 'react-idle-timer';
import idle_logos from '../../assets/icons/idle_logos.png';
import teste from '../../assets/icons/teste.png';
import './Idle.css';

const COMECAR_LABEL = { pt: 'Clique para começar', en: 'Click to start', es: 'Haga clic para empezar', fr: 'Cliquer pour commencer' };
const TITULO_LABEL  = { pt: 'Alverca e a Aviação', en: 'Alverca and Aviation', es: 'Alverca y Aviación', fr: 'Alverca et Aviation' };

function Idle({ language }) {
    const [idleImage, setIdleImage] = useState(true);

    const idleTimerRef = useRef(null);

    const showIdle = () => setIdleImage(false);
    const onIdle  = () => setIdleImage(true);

    return (
        <>
            <div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={idleImage ? 'idle' : 'idle active'} onClick={showIdle}>
                <div className='imagem'>
                    <div className='azulIdle'></div>
                    <img className='principal' src={teste} alt="" />
                </div>
                <img className='logos' src={idle_logos} alt="" />
                <div className='textosIdle'>
                    <h1 className='comecar'>{COMECAR_LABEL[language]}</h1>
                    <h1 className='tituloIdle'>{TITULO_LABEL[language]}</h1>
                    <h1 className='anosIdle'>1918 - 2018</h1>
                </div>
            </div>
            <IdleTimer ref={idleTimerRef} timeout={5 * 60000} onIdle={onIdle} />
        </>
    );
}

export default Idle;
