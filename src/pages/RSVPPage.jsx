import RSVPForm from './RSVPForm';
import { weddingDetails } from '../data/weddingDetails';
import sealMark from '../assets/seal-nav.png';
import '../styles/rsvp.css';
import '../styles/rsvp-polish.css';

function RSVPPage({ navigateTo, onSubmitRSVP }) {
  function goBack() {
    navigateTo('info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="rsvp-page wr-page">
      <header className="wr-header">
        <button type="button" className="wr-back-button" onClick={goBack}>
          Back to details
        </button>
        <img
          className="wr-seal"
          src={sealMark}
          alt={weddingDetails.couple.initials}
          width="46"
          height="46"
        />
      </header>

      <main className="wr-main">
        <section className="wr-intro">
          <h1>RSVP</h1>
          <p>Let us know whether you’ll be joining us for the wedding and the dinner the night before.</p>
        </section>

        <RSVPForm onSubmitRSVP={onSubmitRSVP} />
      </main>
      <footer className="wr-footer">WITH LOVE &amp; GRATITUDE</footer>
    </div>
  );
}

export default RSVPPage;
