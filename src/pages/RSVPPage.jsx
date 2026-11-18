import RSVPForm from './RSVPForm';
import waxSeal from '../assets/EnvSeal.png';
import '../styles/rsvp.css';

function RSVPPage({ navigateTo, onSubmitRSVP, invitationCode }) {
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
        <span className="wr-monogram" role="img" aria-label="David and Allyson"
          style={{ display: 'inline-block', flexShrink: 0, width: 46, height: 46, backgroundImage: `url(${waxSeal})`, backgroundSize: '300% auto', backgroundPosition: '50.6% 50.7%', backgroundRepeat: 'no-repeat', verticalAlign: 'middle' }} />
      </header>

      <main className="wr-main">
        <section className="wr-intro">
          <h1>RSVP</h1>
          <p>Let us know whether you’ll be joining us for the wedding and the dinner the night before.<br /><strong>Kindly RSVP by 1 January 2027.</strong></p>
        </section>

        <RSVPForm onSubmitRSVP={onSubmitRSVP} invitationCode={invitationCode} />
      </main>
      <footer className="wr-footer">WITH LOVE &amp; GRATITUDE</footer>
    </div>
  );
}

export default RSVPPage;
