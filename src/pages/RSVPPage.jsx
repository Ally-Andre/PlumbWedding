import RSVPForm from './RSVPForm';
import { weddingDetails } from '../data/weddingDetails';
import '../styles/rsvp.css';

function RSVPPage({navigateTo}){
    function goBack(){
        navigateTo('info');
        window.scrollTo({
            top:0,
            behavior:'smooth',
        });
    }

    return(
        <div className="rsvp-page">
            <header className="rsvp-page-header">
                <button
                    className="rsvp-back-button"
                    type="button"
                    onClick={goBack}
                >
                    ← Back
                </button>
                <span>{weddingDetails.couple.initials}</span>
                <div className="rsvp-header-spacer"></div>
            </header>
            <main className="rsvp-page-content">
                <div className="rsvp-page-intro">
                    <span className="section-eyebrow">We hope you'll join us</span>
                    <h1>RSVP</h1>
                    <p>Search for your invitation below to let us know whether you'll be joining us.</p>
                </div>
                <RSVPForm/>
            </main>
        </div>
    );
}

export default RSVPPage;