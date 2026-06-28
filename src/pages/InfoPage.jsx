import plumBackground from '../assets/plumBackground.png';

const tileStyle = {
  width:'100%',
  backgroundImage:`url(${plumBackground})`,
  backgroundSize:'100% 100%',
  backgroundRepeat:'no-repeat',
  boxSizing:'border-box',
  aspectRatio:'390 / 844',
};

const innerStyle = {
  width:'100%',
  height:'100%',
  padding:'22% 18%',
  boxSizing:'border-box',
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  textAlign:'center',
};

function InfoPage({navigateTo}) {
  return (
    <div style={{
      width:'100%',
      minHeight:'100vh',
      backgroundColor:'#E8DCCA',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
   }}>
    <div style={{
      width:'100%',
      maxWidth:'380px',
      fontFamily:"'Inknut Antiqua',serif",
      color:'#222930',
      overflowX:'hidden',
   }}>
      <div style={tileStyle}>
        <div style={innerStyle}>
          <p style={{
            fontFamily:"'Inknut Antiqua',serif",
            fontSize:'0.75rem',
            letterSpacing:'0.14em',
            color:'#222930',
            margin:'0 0 6px',
            textTransform:'uppercase',
         }}>
            You are cordially invited<br/>to the wedding of
          </p>

          <h1 style={{
            fontFamily:"'Inspiration',cursive",
            fontSize:'2.6rem',
            color:'#C5A059',
            margin:'0 0 14px',
            lineHeight:1.1,
            fontWeight:400,
         }}>
            David &amp; Allyson
          </h1>

          <p style={{
            fontFamily:"'Inknut Antiqua',serif",
            fontWeight:'bold',
            fontSize:'0.8rem',
            letterSpacing:'0.08em',
            margin:'0 0 8px',
            color:'#222930',
         }}>
            JANUARY 23,2027
          </p>

          <p style={{fontSize:'0.75rem',color:'#222930',margin:'3px 0',fontFamily:"'Inknut Antiqua',serif"}}>
            At 2 o'clock in the afternoon
          </p>
          <p style={{fontSize:'0.75rem',color:'#222930',margin:'3px 0',fontFamily:"'Inknut Antiqua',serif"}}>
            **insert chapel address**
          </p>
          <p style={{fontSize:'0.75rem',color:'#222930',margin:'3px 0',fontFamily:"'Inknut Antiqua',serif"}}>
            Reception to follow at
          </p>
          <p style={{fontSize:'0.75rem',color:'#222930',margin:'3px 0 14px',fontFamily:"'Inknut Antiqua',serif"}}>
            <a href="https://maps.app.goo.gl/s3douE3Q6qGpGvsm8" style={{color:'#222930',textDecoration:'underline'}}>7 on Churchill,Winston Park</a>
          </p>

          <button
              onClick={()=>navigateTo('rsvp')}
              style={{
                padding:'2px 28px',
                backgroundColor:'#9EA8B5',
                color:'#222930',
                border:'none',
                borderRadius:'4px',
                cursor:'pointer',
                fontFamily:"'Inknut Antiqua',serif",
                fontSize:'0.7rem',
                letterSpacing:'0.08em',
             }}
            >
              RSVP Here
            </button>
        </div>
      </div>
      <div style={tileStyle}>
        <div style={innerStyle}>
          <h2 style={{
            fontFamily:"'Inspiration',cursive",
            fontSize:'2.2rem',
            color:'#C5A059',
            fontWeight:400,
            margin:'0 0 8px',
            lineHeight:1.2,
         }}>
            Accommodation
          </h2>
          <p style={{
            fontFamily:"'Inknut Antiqua',serif",
            fontSize:'0.75rem',
            color:'#222930',
            lineHeight:1.7,
            margin:'0 0 32px',
         }}>
            Please{' '}
            <a href="#" style={{color:'#C5A059',textDecoration:'underline'}}>
              click here to book
            </a>
            {' '}accommodation at our reception venue
          </p>

          <h2 style={{
            fontFamily:"'Inspiration',cursive",
            fontSize:'2.2rem',
            color:'#C5A059',
            fontWeight:400,
            margin:'0 0 8px',
            lineHeight:1.2,
         }}>
            Our Registry
          </h2>
          <p style={{
            fontFamily:"'Inknut Antiqua',serif",
            fontSize:'0.75rem',
            color:'#222930',
            lineHeight:1.7,
            margin:0,
         }}>
            Please look at our registry{' '}
            <a href="#" style={{color:'#C5A059',textDecoration:'underline'}}>
              here
            </a>
          </p>
        </div>
      </div>
      <div style={tileStyle}>
        <div style={{...innerStyle,justifyContent:'center'}}>
          <h2 style={{
            fontFamily:"'Inspiration',cursive",
            fontSize:'2.2rem',
            color:'#C5A059',
            fontWeight:400,
            margin:'0 0 18px',
            lineHeight:1.2,
         }}>
            The Itinerary
          </h2>

          <div style={{
            display:'flex',
            flexDirection:'column',
            gap:'10px',
            width:'100%',
            textAlign:'left',
         }}>
            {[
              {time:'13:30',desc:'Arrive at ceremony venue'},
              {time:'14:30',desc:'Ceremony begins'},
              {time:'15:30',desc:'Drive to reception venue'},
              {time:'16:30',desc:'Cut the cake and starters to follow'},
              {time:'18:00',desc:'Dinner'},
              {time:'19:30',desc:'First dance and party!'},
              {time:'20:00',desc:'Dessert'},
            ].map(({time,desc})=>(
              <div key={time} style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
                <span style={{
                  fontFamily:"'Inknut Antiqua',serif",
                  fontSize:'0.65rem',
                  color:'#C5A059',
                  minWidth:'38px',
                  paddingTop:'2px',
                  fontWeight:'bold',
               }}>
                  {time}
                </span>
                <span style={{
                  fontFamily:"'Inknut Antiqua',serif",
                  fontSize:'0.65rem',
                  color:'#222930',
                  lineHeight:1.5,
               }}>
                  {desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
    </div>
  );
}

export default InfoPage;