import { useState } from 'react';
import { motion } from 'motion/react';
import envelopeBottom from '../assets/EnvBottom.png';
import envelopeTop from '../assets/EnvTop.png';
import envelopeSeal from '../assets/EnvSeal.png';
import { weddingDetails } from '../data/weddingDetails';
import EnvelopeAmbient from './EnvelopeAmbient';
import '../styles/envelope.css';

function EnvelopeIntro({onComplete}){
    const [opening,setOpening]=useState(false);
    const [morphing,setMorphing]=useState(false);

    function openEnvelope(){
        if(opening){
            return;
        }
        setOpening(true);
        setTimeout(()=>{
            setMorphing(true);
        },1900);
        setTimeout(()=>{
            onComplete();
        },3200);
    }

    return(
        <motion.div
            className={`envelope-intro ${morphing ? 'envelope-intro-morphing' : ''}`}
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.6}}
        >
            <EnvelopeAmbient hidden={opening || morphing}/>
            <div className="envelope-table-shadow"></div>
            <motion.button
                type="button"
                className="real-envelope-scene"
                onClick={openEnvelope}
                whileHover={opening ? {} : {
                    y:-6,
                    rotate:-0.25,
                    scale:1.01,
                }}
                whileTap={opening ? {} : {
                    scale:0.99,
                }}
                aria-label="Open wedding invitation"
            >
                <motion.div
                    className="real-invitation-card"
                    animate={opening ? {
                        y:'-58%',
                        opacity:1,
                    } : {
                        y:'10%',
                        opacity:0,
                    }}
                    transition={{
                        delay:0.75,
                        duration:1.15,
                        ease:[0.22,1,0.36,1],
                    }}
                >
                    <div className="real-invitation-inner">
                        <span className="real-invitation-small">The wedding of</span>
                        <h1>{weddingDetails.couple.displayName}</h1>
                        <div className="real-invitation-divider"></div>
                        <span className="real-invitation-date">{weddingDetails.dateDisplay}</span>
                        <span className="real-invitation-location">Witpoort · Midrand</span>
                    </div>
                </motion.div>
                <img
                    src={envelopeBottom}
                    alt=""
                    className="real-envelope-layer real-envelope-pocket"
                />
                <motion.img
                    src={envelopeTop}
                    alt=""
                    className="real-envelope-layer real-envelope-flap"
                    animate={opening ? {
                        rotateX:165,
                        y:-8,
                    } : {
                        rotateX:0,
                        y:0,
                    }}
                    transition={{
                        duration:1.15,
                        ease:[0.65,0,0.35,1],
                    }}
                />
                <motion.img
                    src={envelopeSeal}
                    alt=""
                    className="real-envelope-seal"
                    animate={opening ? {
                        rotateX:165,
                        y:6,
                        opacity:[1,1,0],
                        scale:[1,1,0.95],
                    } : {
                        rotateX:0,
                        y:18,
                        opacity:1,
                        scale:1,
                    }}
                    transition={{
                        duration:1.15,
                        times:[0,0.58,1],
                        ease:[0.65,0,0.35,1],
                    }}
                />
            </motion.button>
        </motion.div>
    );
}

export default EnvelopeIntro;