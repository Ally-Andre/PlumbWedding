import SectionReveal from './SectionReveal';
import { weddingDetails } from '../data/weddingDetails';

function Registry(){
    return(
        <section id="registry" className="section registry-section">
            <div className="section-container registry-container">
                <SectionReveal>
                    <h2>Gifts</h2>
                    <p className="registry-lead">Having you there to celebrate with us really is gift enough.</p>
                    <p>We're incredibly fortunate to already have everything we need for our home, so please don't feel any pressure to give us anything.</p>
                    <p>If you would still like to give us a gift, we would be very grateful for a <strong>Hirsch's gift voucher</strong>. It means we can save them towards something special we may need together in the future.</p>
                    <p>Vouchers can be purchased in any Hirsch's store or online.</p>
                    <a
                        className="registry-link"
                        href={weddingDetails.registry.website}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Buy a voucher online
                    </a>
                </SectionReveal>
            </div>
        </section>
    );
}

export default Registry;