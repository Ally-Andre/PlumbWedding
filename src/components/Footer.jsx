import { weddingDetails } from '../data/weddingDetails';

function Footer(){
    return(
        <footer className="wedding-footer">
            <div className="footer-mark">{weddingDetails.couple.initials}</div>
            <p>{weddingDetails.dateDisplay}</p>
            <span>Made with love for our favourite people.</span>
        </footer>
    );
}

export default Footer;