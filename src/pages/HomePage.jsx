import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import WeddingEve from '../components/WeddingEve';
import Timeline from '../components/Timeline';
import Accommodation from '../components/Accommodation';
import Registry from '../components/Registry';
import RSVPCTA from '../components/RSVPCTA';
import Footer from '../components/Footer';
import '../styles/home.css';


// Guest attire palette: editorial display only, intentionally without labels.
// Names appear only as a hover tooltip, never as printed labels.
const guestPalette = [
    { hex: '#E8DCCA', name: 'Bone' },
    { hex: '#C5A059', name: 'Golden bronze' },
    { hex: '#9EA8B5', name: 'Cool steel' },
    { hex: '#222930', name: 'Charcoal' },
    { hex: '#000000', name: 'Black' },
];

function DressCodeSection() {
    return (
        <section id="dress-code" className="section dress-code-section" aria-labelledby="dress-code-title">
            <div className="section-container dress-code-layout">
                <div className="dress-code-intro">
                    <h2 id="dress-code-title">Dress Code</h2>
                    <p className="dress-code-formality">Formal / Evening Formal</p>
                    <div className="dress-code-palette-block">
                        <span className="dress-code-palette-caption">Our suggested colours</span>
                        <div className="dress-code-palette" role="img" aria-label="Guest attire colours: bone, golden bronze, cool steel, charcoal and black">
                            {guestPalette.map(({ hex, name }) => (
                                <span key={hex} className="dress-code-swatch" title={name} style={{ backgroundColor: hex }} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="dress-code-guidance">
                    <div className="dress-code-guidance-item">
                        <h3>For the ladies</h3>
                        <p>Floor-length or sleek cocktail dresses, elegant jumpsuits, or dressy separates.</p>
                    </div>
                    <div className="dress-code-guidance-item">
                        <h3>For the gentlemen</h3>
                        <p>A suit with a tie, in seasonally appropriate colours.</p>
                    </div>
                    <div className="dress-code-guidance-item">
                        <h3>Good to know</h3>
                        <p>We will be walking between venues, so comfortable shoes are a good idea. It is January, so think light fabrics for the afternoon heat.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

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
                <DressCodeSection/>
                <Accommodation/>
                <Registry/>
                <RSVPCTA onRSVP={goToRSVP}/>
            </main>
            <Footer/>
        </div>
    );
}

export default HomePage;