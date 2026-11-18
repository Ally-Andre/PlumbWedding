import { weddingDetails } from '../data/weddingDetails';
import waxSeal from '../assets/EnvSeal.png';

function Footer(){
    return(
        <footer className="wedding-footer">
            <div className="footer-mark"><span role="img" aria-label="David and Allyson" style={{ display: 'inline-block', flexShrink: 0, width: 72, height: 72, backgroundImage: `url(${waxSeal})`, backgroundSize: '300% auto', backgroundPosition: '50.6% 50.7%', backgroundRepeat: 'no-repeat', verticalAlign: 'middle' }} /></div>
            <p>{weddingDetails.dateDisplay}</p>
            <span>Made with love for our favourite people.</span>
        </footer>
    );
}

export default Footer;