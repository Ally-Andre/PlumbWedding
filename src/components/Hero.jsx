import { motion } from 'motion/react';
import { weddingDetails } from '../data/weddingDetails';
import plumBackground from '../assets/plumbBackground_light.png';

function Hero(){
    function scrollToDetails(){
        document.getElementById('details')?.scrollIntoView({
            behavior:'smooth',
        });
    }

    return(
        <section
            id="home"
            className="editorial-hero"
        >
            <motion.div
                className="editorial-hero-art"
                initial={{
                    opacity:0,
                    scale:1.04,
                }}
                animate={{
                    opacity:1,
                    scale:1,
                }}
                transition={{
                    duration:1.8,
                    ease:[0.22,1,0.36,1],
                }}
            >
                <img
                    src={plumBackground}
                    alt=""
                />
            </motion.div>
            <div className="editorial-hero-wash"></div>
            <div className="editorial-hero-frame">
                <motion.div
                    className="editorial-side editorial-side-left"
                    initial={{
                        opacity:0,
                        x:-20,
                    }}
                    animate={{
                        opacity:1,
                        x:0,
                    }}
                    transition={{
                        duration:0.9,
                        delay:0.4,
                    }}
                >
                    <span className="editorial-side-large">23</span>
                    <span>January</span>
                    <span>2027</span>
                </motion.div>
                <motion.div
                    className="editorial-hero-main"
                    initial={{
                        opacity:0,
                        y:28,
                    }}
                    animate={{
                        opacity:1,
                        y:0,
                    }}
                    transition={{
                        duration:1.1,
                        delay:0.15,
                        ease:[0.22,1,0.36,1],
                    }}
                >
                    <span className="editorial-kicker">Together with our favourite people</span>
                    <h1>
                        <span>{weddingDetails.couple.partnerOne}</span>
                        <span className="editorial-ampersand">&</span>
                        <span>{weddingDetails.couple.partnerTwo}</span>
                    </h1>
                    <div className="editorial-rule">
                        <span></span>
                        <div></div>
                        <span></span>
                    </div>
                    <p>We're getting married</p>
                </motion.div>
                <motion.div
                    className="editorial-side editorial-side-right"
                    initial={{
                        opacity:0,
                        x:20,
                    }}
                    animate={{
                        opacity:1,
                        x:0,
                    }}
                    transition={{
                        duration:0.9,
                        delay:0.4,
                    }}
                >
                    <span className="editorial-side-large">Witpoort</span>
                    <span>Midrand</span>
                    <span>South Africa</span>
                </motion.div>
            </div>
            <motion.button
                type="button"
                className="editorial-scroll"
                onClick={scrollToDetails}
                initial={{
                    opacity:0,
                    y:10,
                }}
                animate={{
                    opacity:1,
                    y:0,
                }}
                transition={{
                    duration:0.8,
                    delay:1,
                }}
            >
                <span>Explore the weekend</span>
                <div className="editorial-scroll-line"></div>
            </motion.button>
        </section>
    );
}

export default Hero;