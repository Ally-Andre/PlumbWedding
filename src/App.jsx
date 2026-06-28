import { useState } from 'react';
import RSVPForm from './pages/RSVPForm';
import InfoPage from './pages/InfoPage';

import closedEnvelope from './assets/envelope-closed-reference.png';
import basePocket from './assets/envelope-base-pocket-clean.png';
import topFlap from './assets/envelope-moving-top-flap.png';

function App() {
  const [currentPage,setCurrentPage] = useState('landing');
  const [envelopeOpen,setEnvelopeOpen] = useState(false);

  function openEnvelope() {
    setEnvelopeOpen(true);
    setTimeout(() => {
      setCurrentPage('info');
    },1000);
  }

  return (
    <>
      {currentPage === 'landing' && (
        <div style={{
          height:'100dvh',
          width:'100vw',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'#E8DCCA',
          fontFamily:'serif',
          overflow:'hidden',
        }}>
          <div
            onClick={openEnvelope}
            style={{
				position:'relative',
				height:'100dvh',
				width:'46.21dvh',
				maxWidth:'100vw',
				cursor:'pointer',
				perspective:'1200px',
				overflow:'hidden',
				}}>
            <img
              src={basePocket}
              alt=""
              style={{
                position:'absolute',
                inset:0,
                width:'auto',
                height:'100%',
                objectFit:'fill',
                zIndex:3,
                pointerEvents:'none',
                transformOrigin:'50% 100%',
                transform:envelopeOpen
                  ? 'rotateX(-130deg) translateY(60px)'
                  :'rotateX(0deg) translateY(0)',
                transition:'transform 2.5s cubic-bezier(.2,.8,.2,1) 0.3s',
                backfaceVisibility:'hidden',
              }}/>
			<img
              src={topFlap}
              alt=""
              style={{
                position:'absolute',
                inset:0,
                width:'auto',
                height:'100%',
                objectFit:'fill',
                zIndex:5,
                pointerEvents:'none',
                transformOrigin:'50% 0%',
                transform:envelopeOpen
                  ? 'rotateX(140deg) translateY(-60px)'
                  :'rotateX(0deg) translateY(0)',
                transition:'transform 2.5s cubic-bezier(.2,.8,.2,1)',
                backfaceVisibility:'hidden',
              }}/>
            <img
              src={closedEnvelope}
              alt="Wedding envelope"
              style={{
                position:'absolute',
                inset:0,
                width:'auto',
                height:'100%',
                objectFit:'fill',
                zIndex:20,
                opacity:envelopeOpen ? 0 :1,
                transition:'opacity 0.4s ease',
                pointerEvents:'none',
              }}/>
          </div>
        </div>
      )}
      {currentPage === 'info' && <InfoPage navigateTo={setCurrentPage} />}
      {currentPage === 'rsvp' && (
        <div>
          <RSVPForm />
          <div style={{ textAlign:'center',paddingBottom:'40px' }}>
            <button
              onClick={() => setCurrentPage('info')}
              style={{
                background:'none',
                border:'none',
                textDecoration:'underline',
                color:'#222930',
                cursor:'pointer',
              }}
            >
              Back to Details
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;