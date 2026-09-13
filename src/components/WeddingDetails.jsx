import SectionReveal from './SectionReveal';
import { weddingDetails } from '../data/weddingDetails';

function WeddingDetails(){
    return(
        <section id="details" className="section wedding-details-section">
            <div className="section-container">
                <SectionReveal>
                    <div className="section-heading wedding-details-heading">
                        <span className="section-eyebrow">Saturday · 23 January 2027</span>
                        <h2>The Wedding</h2>
                        <p>Everything you need to know about where to arrive and where we'll be celebrating.</p>
                    </div>
                </SectionReveal>
                <div className="location-journey">
                    <SectionReveal className="location-stop location-stop-parking">
                        <div className="location-stop-number">01</div>
                        <div className="location-stop-content">
                            <span className="location-kicker">Start here</span>
                            <h3>11 Krause Road</h3>
                            <span className="location-place">Parking & Welcome Drinks</span>
                            <p>Please park at 11 Krause Road rather than driving directly to the wedding venue.</p>
                            <p>We'll be there from <strong>14:00</strong> with welcome drinks while everyone arrives.</p>
                            <a
                                href={weddingDetails.parking.mapUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Open parking location
                                <span>↗</span>
                            </a>
                        </div>
                    </SectionReveal>
                    <SectionReveal className="location-connection" delay={0.08}>
                        <span className="location-connection-line"></span>
                        <div className="location-walk">
                            <span>14:45</span>
                            <strong>A short walk together</strong>
                            <p>We'll leave the cars behind and make our way up the road to the ceremony together.</p>
                        </div>
                        <span className="location-connection-line"></span>
                    </SectionReveal>
                    <SectionReveal className="location-stop location-stop-venue" delay={0.15}>
                        <div className="location-stop-number">02</div>
                        <div className="location-stop-content">
                            <span className="location-kicker">Celebrate here</span>
                            <h3>506 Krause Road</h3>
                            <span className="location-place">The Wedding Venue</span>
                            <p>Our ceremony begins at <strong>15:00</strong>, with the rest of the celebrations following at the venue.</p>
                            <a
                                href={weddingDetails.ceremony.mapUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Open wedding venue
                                <span>↗</span>
                            </a>
                        </div>
                    </SectionReveal>
                </div>
                <SectionReveal>
                    <div className="wedding-details-note">
                        <span>Park once, relax and enjoy</span>
                        <p>Once you've arrived at 11 Krause Road, you won't need your car again until you're ready to leave.</p>
                    </div>
                </SectionReveal>
            </div>
        </section>
    );
}

export default WeddingDetails;