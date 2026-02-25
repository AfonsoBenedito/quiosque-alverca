import { useState } from 'react';
import teste from '../../assets/icons/teste.png';
import x from '../../assets/icons/x.png';
import hamburguer from '../../assets/icons/hamburguer.png';
import HamburguerItens from '../HamburguerItens';
import './HamburguerMenu.css';

function HamburguerMenu({ language }) {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <div>
                <img className='hamburguer' src={hamburguer} onClick={showSidebar} alt="" />
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <img className='aviao' src={teste} alt="" />
                <ul className='nav-menu-items'>
                    <li className='navbar-toggle' onClick={showSidebar}>
                        <img src={x} className='cruz' alt="" />
                    </li>
                    <div className='hamburguerAzul'></div>
                    <HamburguerItens language={language} />
                </ul>
            </nav>
        </>
    );
}

export default HamburguerMenu;
