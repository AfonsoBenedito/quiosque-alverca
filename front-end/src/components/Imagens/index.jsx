import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import datapt from '../../assets/data/datapt.json';
import dataes from '../../assets/data/dataes.json';
import dataen from '../../assets/data/dataen.json';
import datafr from '../../assets/data/datafr.json';
import Point from '../../models/Point';
import setaEsquerdaImg from '../../assets/icons/baseline_arrow_left.png';
import setaDireitaImg   from '../../assets/icons/baseline_arrow_right.png';
import setaVoltarImg    from '../../assets/icons/return_arrow.png';
import thumbsEsquerdaImg from '../../assets/icons/thumbs_esquerda.png';
import thumbsDireitaImg  from '../../assets/icons/thumbs_direita.png';
import './Imagens.css';

const BACK_LABEL = { pt: 'Voltar à Galeria', es: 'Volver a la Galería', en: 'Back to Gallery', fr: 'Retour à la galerie' };

function buildAllPoints() {
    const pontos = [];

    for (let i = 0; i < datapt.rooms[0].points.length; i++) {
        const pt = datapt.rooms[0].points[i];
        const es = dataes.rooms[0].points[i];
        const en = dataen.rooms[0].points[i];
        const fr = datafr.rooms[0].points[i];

        for (let l = 0; l < pt.slideshow.length; l++) {
            const slide = pt.slideshow[l];
            const { id, name, time, caption } = slide;
            const captionES = es.slideshow[l].caption;
            const captionEN = en.slideshow[l].caption;
            const captionFR = fr.slideshow[l].caption;

            if (time >= 0 && time < 500) {
                const url = import.meta.env.BASE_URL + 'assets/images/' + slide.url;
                pontos.push(new Point({
                    idPonto: pt.id, namePonto: pt.name, baseImagePonto: pt.baseImage,
                    titlePonto: pt.title, subtitlePonto: pt.subtitle, languageDescPonto: pt.languageDesc,
                    id, name, url, tipo: 'Imagem', time, caption, thumbnail: url,
                    captionES, languageDescPontoES: es.languageDesc, titlePontoES: es.title, subtitlePontoES: es.subtitle,
                    captionEN, languageDescPontoEN: en.languageDesc, titlePontoEN: en.title, subtitlePontoEN: en.subtitle,
                    captionFR, languageDescPontoFR: fr.languageDesc, titlePontoFR: fr.title, subtitlePontoFR: fr.subtitle,
                }));
            } else if (time > 699 && time < 900) {
                const url = import.meta.env.BASE_URL + 'assets/videos/' + slide.url;
                pontos.push(new Point({
                    idPonto: pt.id, namePonto: pt.name, baseImagePonto: pt.baseImage,
                    titlePonto: pt.title, subtitlePonto: pt.subtitle, languageDescPonto: pt.languageDesc,
                    id, name, url, tipo: 'Video', time, caption, thumbnail: url,
                    captionES, languageDescPontoES: es.languageDesc, titlePontoES: es.title, subtitlePontoES: es.subtitle,
                    captionEN, languageDescPontoEN: en.languageDesc, titlePontoEN: en.title, subtitlePontoEN: en.subtitle,
                    captionFR, languageDescPontoFR: fr.languageDesc, titlePontoFR: fr.title, subtitlePontoFR: fr.subtitle,
                }));
            }
        }
    }

    for (let i = 0; i < datapt.rooms[0].points.length; i++) {
        const pt = datapt.rooms[0].points[i];
        for (let l = 0; l < pt.slideshow.length; l++) {
            const slide = pt.slideshow[l];
            const { time } = slide;
            if (time > 499 && time < 700) {
                const thumbnailUrl = import.meta.env.BASE_URL + 'assets/thumbnails/' + slide.url;
                const target = pontos.find(p => p.time === time - 100 && p.idPonto === pt.id);
                if (target) target.setThumbnail(thumbnailUrl);
            }
        }
    }

    return pontos;
}

const ALL_POINTS = buildAllPoints();

function Imagens({ language, match }) {
    const idPonto = parseInt(match.params.id);

    const sortedPoints = [...ALL_POINTS].sort((a, b) => a.time - b.time);

    const firstForPoint = ALL_POINTS.find(p => p.idPonto === idPonto);
    const [activeIndex, setActiveIndex] = useState(firstForPoint?.id ?? null);
    const [scrollMax, setScrollMax]     = useState(null);

    const thumbsDivRef    = useRef(null);
    const setaEsquerdaRef = useRef(null);
    const setaDireitaRef  = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const el = thumbsDivRef.current;
            if (!el) return;
            el.scrollLeft += el.scrollWidth;
            const max = el.scrollLeft;
            el.scrollLeft -= el.scrollWidth;
            setScrollMax(max);
        }, 3000);

        const interval = setInterval(() => {
            const el   = thumbsDivRef.current;
            const left = setaEsquerdaRef.current;
            const right = setaDireitaRef.current;
            if (!el || !left || !right) return;
            left.style.opacity  = el.scrollLeft === 0         ? 0.25 : 1;
            right.style.opacity = el.scrollLeft === scrollMax ? 0.25 : 1;
        }, 100);

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [scrollMax]);

    const currentItems = ALL_POINTS
        .filter(p => p.idPonto === idPonto)
        .sort((a, b) => a.time - b.time)
        .map(p => p.id);

    const scrollToIndex = (index) => {
        if (thumbsDivRef.current) {
            thumbsDivRef.current.scrollLeft = 15.5 + (238 + 15.5) * (index - 3);
        }
    };

    const handleClickThumb = (id) => setActiveIndex(id);

    const handlePrev = () => {
        const i = currentItems.indexOf(activeIndex);
        if (i > 0) {
            setActiveIndex(currentItems[i - 1]);
            scrollToIndex(i);
        }
    };

    const handleNext = () => {
        const i = currentItems.indexOf(activeIndex);
        if (i < currentItems.length - 1) {
            setActiveIndex(currentItems[i + 1]);
            scrollToIndex(i + 2);
        }
    };

    const scrollThumbsLeft  = () => { thumbsDivRef.current.scrollLeft -= 100; };
    const scrollThumbsRight = () => { thumbsDivRef.current.scrollLeft += 100; };

    const activePonto = ALL_POINTS.find(p => p.id === activeIndex);

    const caption = activePonto
        ? { pt: activePonto.caption, es: activePonto.captionES, en: activePonto.captionEN, fr: activePonto.captionFR }[language]
        : null;

    const roomTitle    = activePonto ? { pt: activePonto.titlePonto,    es: activePonto.titlePontoES,    en: activePonto.titlePontoEN,    fr: activePonto.titlePontoFR    }[language] : null;
    const roomSubtitle = activePonto ? { pt: activePonto.subtitlePonto, es: activePonto.subtitlePontoES, en: activePonto.subtitlePontoEN, fr: activePonto.subtitlePontoFR }[language] : null;
    const roomDesc     = activePonto ? { pt: activePonto.languageDescPonto, es: activePonto.languageDescPontoES, en: activePonto.languageDescPontoEN, fr: activePonto.languageDescPontoFR }[language] : null;

    const isFirst = activeIndex === currentItems[0];
    const isLast  = activeIndex === currentItems[currentItems.length - 1];

    return (
        <div>
            <div className='imagenscss'>
                <motion.div initial={{ x: -427 }} animate={{ x: -1, transition: { delay: 0.1, duration: 0.75 } }} exit={{ x: -427, transition: { duration: 0.75 } }} id="retanguloAzul"></motion.div>

                <motion.div initial={{ x: 1920 }} animate={{ x: 0, transition: { delay: 0.1, duration: 0.75 } }} exit={{ x: 1920, transition: { duration: 0.75 } }} className='thumbsDiv' ref={thumbsDivRef}>
                    {sortedPoints.map((ponto) => {
                        if (ponto.idPonto !== idPonto) return null;
                        if (ponto.tipo === 'Imagem') {
                            return <img key={ponto.id} className='thumbnails' src={ponto.thumbnail} alt="" onClick={() => handleClickThumb(ponto.id)} />;
                        }
                        if (ponto.tipo === 'Video') {
                            return <video key={ponto.id} className='thumbnails' src={ponto.url} onClick={() => handleClickThumb(ponto.id)} loop />;
                        }
                        return null;
                    })}
                </motion.div>

                <motion.div initial={{ x: 1920, y: 0 }} animate={{ x: 0, y: -5, transition: { delay: 0.1, duration: 0.75 } }} exit={{ x: 1920, y: -5, transition: { duration: 0.75 } }}>
                    {activePonto?.tipo === 'Imagem' && (
                        <div>
                            <section className='espacoPrincipal'>
                                <img className='imagemPrincipal' src={activePonto.thumbnail} alt="" />
                            </section>
                        </div>
                    )}
                    {activePonto?.tipo === 'Video' && (
                        <div>
                            <section className='espacoPrincipal'>
                                <video className='imagemPrincipal' src={activePonto.url} autoPlay loop />
                            </section>
                        </div>
                    )}
                </motion.div>

                <div>
                    <motion.div initial={{ x: 1920, y: 0 }} animate={{ x: 0, y: -5, transition: { delay: 0.1, duration: 0.75 } }} exit={{ x: 1920, y: -5, transition: { duration: 0.75 } }}>
                        <div className='setaTras'>
                            <img src={setaEsquerdaImg} className={isFirst ? 'desativado' : ''} onClick={isFirst ? undefined : handlePrev} alt="" />
                        </div>
                        <div className='textoP'>
                            <h3 className='textoPonto'>{caption}</h3>
                        </div>
                        <div className='setaFrente'>
                            <img src={setaDireitaImg} className={isLast ? 'desativado' : ''} onClick={isLast ? undefined : handleNext} alt="" />
                        </div>
                    </motion.div>

                    <motion.img initial={{ x: 1920 }} animate={{ x: 0, transition: { delay: 0.1, duration: 0.75 } }} exit={{ x: 1920, transition: { duration: 0.75 } }} className='setaThumbDireita'   ref={setaDireitaRef}  onClick={scrollThumbsRight} src={thumbsDireitaImg}  alt="" />
                    <motion.img initial={{ x: 1920 }} animate={{ x: 0, transition: { delay: 0.1, duration: 0.75 } }} exit={{ x: 1920, transition: { duration: 0.75 } }} className='setaThumbEsquerda' ref={setaEsquerdaRef} onClick={scrollThumbsLeft}  src={thumbsEsquerdaImg} alt="" />
                </div>

                <motion.div initial={{ x: -427, y: 0 }} animate={{ x: 0, y: -10, transition: { delay: 0.1, duration: 0.75 } }} exit={{ x: -427, y: -10, transition: { duration: 0.75 } }}>
                    {activePonto && (
                        <div>
                            <div className='pointInfo'>
                                <h1>{roomTitle}</h1>
                                <h2>{roomSubtitle}</h2>
                                <hr />
                                <p>{roomDesc}</p>
                            </div>
                        </div>
                    )}
                    <Link to='/'>
                        <div className='returnHome'>
                            <img className='setaHome' src={setaVoltarImg} alt="" />
                            <p>{BACK_LABEL[language]}</p>
                        </div>
                    </Link>
                </motion.div>

                <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1, transition: { delay: 0.1, duration: 1 } }} exit={{ opacity: 0.5, transition: { delay: 0.85, duration: 0.1 } }}>
                    <div id="retanguloBranco"></div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.3, delay: 0 } }} exit={{ opacity: 0, transition: { delay: 0.75, duration: 0.1 } }}>
                    {activePonto?.tipo === 'Imagem' && <div><img className='imagemFundo' src={activePonto.thumbnail} alt="" /></div>}
                    {activePonto?.tipo === 'Video'  && <div><video className='imagemFundo' src={activePonto.url} /></div>}
                </motion.div>
            </div>
        </div>
    );
}

export default Imagens;
