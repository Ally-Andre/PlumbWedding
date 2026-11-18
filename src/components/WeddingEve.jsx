import SectionReveal from './SectionReveal';
import { weddingDetails } from '../data/weddingDetails';

function WeddingEve(){
    return(
        <section id="wedding-eve" className="section wedding-eve-section">
            <div className="wedding-eve-decoration wedding-eve-decoration-left"></div>
            <div className="wedding-eve-decoration wedding-eve-decoration-right"></div>
            <div className="section-container wedding-eve-container">
                <SectionReveal>
                    <span className="section-eyebrow">{weddingDetails.weddingEve.subtitle}</span>
                    <h2>{weddingDetails.weddingEve.title}</h2>
                    <span className="wedding-eve-date">{weddingDetails.weddingEve.dateDisplay}</span>
                    <div className="wedding-eve-rule">
                        <span></span>
                        <div></div>
                        <span></span>
                    </div>
                    <p className="wedding-eve-lead">A relaxed evening before the wedding with burgers, a braai and a little more time together.</p>
                    <div className="wedding-eve-meta">
                        <span>11 Krause Road</span>
                        <div></div>
                        <span>16:00</span>
                    </div>
                    <p className="wedding-eve-rsvp-copy">Please let us know on your wedding RSVP if you'll be joining us.</p>
                </SectionReveal>
            </div>
        </section>
    );
}

export default WeddingEve;