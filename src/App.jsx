import { useEffect, useState } from 'react';
import EnvelopeIntro from './components/EnvelopeIntro';
import HomePage from './pages/HomePage';
import RSVPPage from './pages/RSVPPage';

const STORAGE_KEY = 'plumb-wedding-invitation';
const VALID_CODE = /^[A-F0-9]{24}$/;

// Capture the private household code once, before the envelope opens.
// sessionStorage retains it within this browser tab (including after refresh).
function getInvitationCode() {
    const incoming = new URLSearchParams(window.location.hash.slice(1)).get('invite');
    if (incoming !== null) {
        const code = incoming.trim().toUpperCase();
        return VALID_CODE.test(code) ? code : null;
    }
    try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        return saved && VALID_CODE.test(saved) ? saved : null;
    } catch {
        return null;
    }
}

function App() {
    const [currentPage, setCurrentPage] = useState('landing');
    const [invitationCode] = useState(getInvitationCode);

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.slice(1));
        if (!params.has('invite')) return;

        try {
            // An invalid new link must not reuse an older household's code.
            if (invitationCode) {
                sessionStorage.setItem(STORAGE_KEY, invitationCode);
            } else {
                sessionStorage.removeItem(STORAGE_KEY);
            }
        } catch {
            // In restricted browsers, navigation still works for this page load.
        }

        // Hide the private code from the address bar, preserving query parameters.
        window.history.replaceState(
            window.history.state,
            '',
            window.location.pathname + window.location.search
        );
    }, [invitationCode]);

    return (
        <>
            {currentPage === 'landing' && (
                <EnvelopeIntro onComplete={() => setCurrentPage('info')} />
            )}
            {currentPage === 'info' && (
                <HomePage navigateTo={setCurrentPage} />
            )}
            {currentPage === 'rsvp' && (
                <RSVPPage
                    navigateTo={setCurrentPage}
                    invitationCode={invitationCode}
                />
            )}
        </>
    );
}

export default App;
