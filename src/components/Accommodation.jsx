import SectionReveal from './SectionReveal';

function Accommodation(){
    return(
        <section id="stay" className="section accommodation-section">
            <div className="section-container">
                <div className="accommodation-layout">
                    <SectionReveal className="accommodation-heading">
                        <span className="section-eyebrow">Stay a little longer</span>
                        <h2>Accommodation</h2>
                    </SectionReveal>
                    <SectionReveal className="accommodation-card" delay={0.1}>
                        <p className="accommodation-lead">Accommodation is available at the wedding venue for guests who would like to stay over.</p>
                        <p>If you would like to arrange accommodation, please contact <strong>Susan Plumb</strong>. She will put you in touch with the venue and assist with arranging your booking at our special wedding rate.</p>
                        <a
                            className="primary-link-button"
                            href="tel:+27823375856"
                        >
                            Call Susan Plumb
                            <span>082 337 5856</span>
                        </a>
                        <a
                            className="primary-link-button"
                            href="https://wa.me/27823375856?text=Hi%20Susan%2C%20I%27d%20like%20to%20enquire%20about%20accommodation%20for%20David%20and%20Allyson%27s%20wedding."
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ marginTop: '10px' }}
                        >
                            WhatsApp Susan Plumb
                            <span>Send a message</span>
                        </a>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}

export default Accommodation;
