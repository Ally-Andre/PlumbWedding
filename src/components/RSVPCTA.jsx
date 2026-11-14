import { motion } from 'motion/react';
import SectionReveal from './SectionReveal';

function RSVPCTA({onRSVP}){
    return(
        <section className="section rsvp-cta-section">
            <div className="section-container rsvp-cta-container">
                <SectionReveal>
                    <span className="section-eyebrow">One last thing</span>
                    <h2>Will We See You There?</h2>
                    <p>We can't wait to celebrate with you. Let us know whether you'll be joining us for the wedding and the Wedding Eve braai.</p>
                    <motion.button
                        className="rsvp-cta-button"
                        type="button"
                        onClick={onRSVP}
                        whileHover={{y:-3}}
                        whileTap={{scale:0.98}}
                    >
                        RSVP
                    </motion.button>
                </SectionReveal>
            </div>
        </section>
    );
}

export default RSVPCTA;