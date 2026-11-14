import SectionReveal from './SectionReveal';
import { weddingDetails } from '../data/weddingDetails';

function Accommodation(){
    return(
        <section id="stay" className="section accommodation-section">
            <div className="section-container">
                <div className="accommodation-layout">
                    <SectionReveal className="accommodation-heading">
                        <h2>Accommodation</h2>
                    </SectionReveal>
                    <SectionReveal className="accommodation-card" delay={0.1}>
                        <p className="accommodation-lead">Accommodation is available at the wedding venue for guests who would like to stay over.</p>
                        <p>Please contact <strong>{weddingDetails.accommodation.contactName}</strong> directly to make your booking.</p>
                        <p>When booking, mention that you are part of the <strong>{weddingDetails.accommodation.bookingReference}</strong> to receive the discounted wedding rate.</p>
                        <a
                            className="primary-link-button"
                            href={`tel:${weddingDetails.accommodation.phone}`}
                        >
                            Call {weddingDetails.accommodation.contactName}
                            <span>{weddingDetails.accommodation.phoneDisplay}</span>
                        </a>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}

export default Accommodation;