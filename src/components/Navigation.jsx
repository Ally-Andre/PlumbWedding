import { useEffect,useState } from 'react';
import { motion,AnimatePresence } from 'motion/react';
import { weddingDetails } from '../data/weddingDetails';
import '../styles/navigation.css';

function Navigation({onRSVP}){
    const [scrolled,setScrolled]=useState(false);
    const [menuOpen,setMenuOpen]=useState(false);

    useEffect(()=>{
        function handleScroll(){
            setScrolled(window.scrollY>40);
        }
        window.addEventListener('scroll',handleScroll);
        handleScroll();
        return()=>{
            window.removeEventListener('scroll',handleScroll);
        };
    },[]);

    function scrollToSection(id){
        const section=document.getElementById(id);
        setMenuOpen(false);
        if(section){
            section.scrollIntoView({
                behavior:'smooth',
                block:'start',
            });
        }
    }

    return(
        <header className={`navigation ${scrolled ? 'navigation-scrolled' : ''}`}>
            <button
                className="navigation-logo"
                type="button"
                onClick={()=>scrollToSection('home')}
            >
                {weddingDetails.couple.initials}
            </button>
            <nav className="navigation-links">
                <button type="button" onClick={()=>scrollToSection('wedding-eve')}>Wedding Eve</button>
                <button type="button" onClick={()=>scrollToSection('timeline')}>Itinerary</button>
                <button type="button" onClick={()=>scrollToSection('stay')}>Stay</button>
                <button type="button" onClick={()=>scrollToSection('registry')}>Gifts</button>
                <button className="navigation-rsvp" type="button" onClick={onRSVP}>RSVP</button>
            </nav>
            <button
                className={`navigation-menu-button ${menuOpen ? 'navigation-menu-button-open' : ''}`}
                type="button"
                onClick={()=>setMenuOpen(prev=>!prev)}
                aria-label="Open navigation"
            >
                <span></span>
                <span></span>
            </button>
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="navigation-mobile"
                        initial={{opacity:0,y:-15}}
                        animate={{opacity:1,y:0}}
                        exit={{opacity:0,y:-15}}
                        transition={{duration:0.25}}
                    >
                        <button type="button" onClick={()=>scrollToSection('wedding-eve')}>Wedding Eve</button>
                        <button type="button" onClick={()=>scrollToSection('timeline')}>Itinerary</button>
                        <button type="button" onClick={()=>scrollToSection('stay')}>Stay</button>
                        <button type="button" onClick={()=>scrollToSection('registry')}>Gifts</button>
                        <button className="navigation-mobile-rsvp" type="button" onClick={onRSVP}>RSVP</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Navigation;