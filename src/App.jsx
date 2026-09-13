import { useState } from 'react';
import EnvelopeIntro from './components/EnvelopeIntro';
import HomePage from './pages/HomePage';
import RSVPPage from './pages/RSVPPage';

function App(){
    const [currentPage,setCurrentPage]=useState('landing');

    return(
        <>
            {currentPage==='landing' && (
                <EnvelopeIntro
                    onComplete={()=>setCurrentPage('info')}
                />
            )}
            {currentPage==='info' && (
                <HomePage navigateTo={setCurrentPage}/>
            )}
            {currentPage==='rsvp' && (
                <RSVPPage navigateTo={setCurrentPage}/>
            )}
        </>
    );
}

export default App;