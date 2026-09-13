import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import WeddingEve from '../components/WeddingEve';
import Timeline from '../components/Timeline';
import Accommodation from '../components/Accommodation';
import Registry from '../components/Registry';
import RSVPCTA from '../components/RSVPCTA';
import Footer from '../components/Footer';
import '../styles/home.css';

function HomePage({navigateTo}){
    function goToRSVP(){
        navigateTo('rsvp');
        window.scrollTo({
            top:0,
            behavior:'smooth',
        });
    }

    return(
        <div className="home-page">
            <Navigation onRSVP={goToRSVP}/>
            <main>
                <Hero/>
                <WeddingEve/>
                <Timeline/>
                <Accommodation/>
                <Registry/>
                <RSVPCTA onRSVP={goToRSVP}/>
            </main>
            <Footer/>
        </div>
    );
}

export default HomePage;