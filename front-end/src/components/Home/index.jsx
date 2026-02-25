import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import datapt from '../../assets/data/datapt.json';
import dataes from '../../assets/data/dataes.json';
import dataen from '../../assets/data/dataen.json';
import datafr from '../../assets/data/datafr.json';
import logo from '../../assets/icons/logo.png';
import Point from '../../models/Point';
import HamburguerMenu from '../HamburguerMenu';
import './Home.css';

const ALL_DATA = { pt: datapt, es: dataes, en: dataen, fr: datafr };

function buildPoints() {
    const pontos = [];
    for (let i = 0; i < datapt.rooms[0].points.length; i++) {
        const point = datapt.rooms[0].points[i];
        const ponto = new Point({
            idPonto: point.id,
            namePonto: point.name,
            baseImagePonto: import.meta.env.BASE_URL + 'assets/baseImages/' + point.baseImage,
            titlePonto: point.title,
            subtitlePonto: point.subtitle,
            languageDescPonto: point.languageDesc,
            number: point.number,
            titlePontoES: dataes.rooms[0].points[i].title,
            subtitlePontoES: dataes.rooms[0].points[i].subtitle,
            titlePontoEN: dataen.rooms[0].points[i].title,
            subtitlePontoEN: dataen.rooms[0].points[i].subtitle,
            titlePontoFR: datafr.rooms[0].points[i].title,
            subtitlePontoFR: datafr.rooms[0].points[i].subtitle,
        });
        pontos.push(ponto);
    }
    return pontos.sort((a, b) => a.number - b.number);
}

const POINTS = buildPoints();

const TITLE_KEY = { pt: ['titlePonto', 'subtitlePonto'], es: ['titlePontoES', 'subtitlePontoES'], en: ['titlePontoEN', 'subtitlePontoEN'], fr: ['titlePontoFR', 'subtitlePontoFR'] };

function Home({ language }) {
    const [fechar, setFechar] = useState(0);

    const closeWindow = useCallback(() => {
        window.open('', '_self', '');
        window.close();
    }, []);

    const handleTitleClick = useCallback(() => {
        setFechar(prev => {
            if (prev === 0) setTimeout(() => setFechar(0), 4000);
            if (prev === 4) closeWindow();
            return prev + 1;
        });
    }, [closeWindow]);

    const currentData = ALL_DATA[language];
    const [titleKey, subtitleKey] = TITLE_KEY[language];

    return (
        <div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.75, duration: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.75 } }}
            >
                <div id="retanguloCastanho"></div>
            </motion.div>

            <motion.div
                initial={{ x: 1920, y: 0 }}
                animate={{ x: 10, transition: { duration: 1 } }}
                exit={{ x: 1920, transition: { duration: 0.75 } }}
                className='grid'
            >
                {POINTS.map((point) => (
                    <div className='componenteImagem' key={point.idPonto}>
                        <Link to={`/imagens/${point.idPonto}`}>
                            <img src={point.baseImagePonto} alt={point[titleKey]} />
                            <h1>{point[titleKey]}</h1>
                            <h2>{point[subtitleKey]}</h2>
                        </Link>
                    </div>
                ))}
            </motion.div>

            <motion.div
                initial={{ x: -600, y: -5 }}
                animate={{ x: 0, y: -10, transition: { duration: 1 } }}
                exit={{ x: -600, y: 0, transition: { duration: 0.75 } }}
            >
                <HamburguerMenu language={language} />
                <div className='sideBar'>
                    <h1 onClick={handleTitleClick}>{currentData.title}</h1>
                    <p>{currentData.primaryText}</p>
                </div>
                <img className='logo' src={logo} alt="logo" />
            </motion.div>
        </div>
    );
}

export default Home;
