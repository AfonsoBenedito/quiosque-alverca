import { useState } from 'react';
import { motion } from 'framer-motion';
import { HamburguerData }   from '../../data/HamburguerData';
import { HamburguerDataES } from '../../data/HamburguerDataES';
import { HamburguerDataEN } from '../../data/HamburguerDataEN';
import { HamburguerDataFR } from '../../data/HamburguerDataFR';
import setaVoltar from '../../assets/icons/return_arrow.png';
import logo from '../../assets/icons/logo.png';
import './HamburguerItens.css';

const DATA_BY_LANGUAGE = { pt: HamburguerData, es: HamburguerDataES, en: HamburguerDataEN, fr: HamburguerDataFR };

function HamburguerItens({ language }) {
    const [selected, setSelected] = useState(null);

    const items = DATA_BY_LANGUAGE[language] ?? HamburguerData;

    return (
        <>
            {items.map((item) => (
                <div key={item.cName}>
                    <li style={{ opacity: selected ? 0 : 1 }}>
                        <h1 onClick={() => setSelected(item)} className={item.cName}>{item.title}</h1>
                    </li>
                </div>
            ))}

            <div className={selected ? 'setaHamb-active' : 'setaHamb-hidden'} onClick={() => setSelected(null)}>
                <motion.div className='borderRight'></motion.div>
                <motion.div className='borderBottom'></motion.div>
                <motion.div className='borderLeft'></motion.div>
                <img className='logoEmItens' src={logo} alt="" />
                <img className='setaVoltarEmItens' src={setaVoltar} alt="" />
            </div>

            <div className='conteudoHamb'>
                <h1>{selected?.title}</h1>
                <p className='texto'>{selected?.texto}</p>
                <p className='texto2'>{selected?.texto2}</p>
                <p className='texto3'>{selected?.texto3}</p>
                <p className='texto4'>{selected?.texto4}</p>
                <p className='texto5'>{selected?.texto5}</p>
                <p className='texto6'>{selected?.texto6}</p>
                <p className='texto7'>{selected?.texto7}</p>
                <p className='texto8'>{selected?.texto8}</p>
                <p className='texto9'>{selected?.texto9}</p>
                <p className='texto10'>{selected?.texto10}</p>
                <p className='texto11'>{selected?.texto11}</p>
                <p className='textoMuseu'>{selected?.textoMuseu}</p>
            </div>
            <div className='linhaHamburguer'></div>
        </>
    );
}

export default HamburguerItens;
