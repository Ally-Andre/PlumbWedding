import { useState } from "react";
import SearchInput from "./components/SearchInput";

function App(){
	const [party,setParty]=useState(null);
	const [err,setErr]=useState('');
	const [loading,setLoading]=useState(false);
	const [activePlusOne,setActivePlusOne]=useState({});
	const togglePlusOne=(guestId)=>{
		setActivePlusOne(prev=>({
		...prev,
		[guestId]:!prev[guestId]
		}));
	};
	return(
		<div style={{
			width:'100%',
			backgroundImage:`url('/assets/plumBackground.png')`,
			backgroundRepeat:'repeat-y',
			backgroundPosition:'top center',
			backgroundSize:'100% auto',
			display:'flex',
			justifyContent:'center',
			alignItems:'flex-start',
			padding:'40px 20px',
			boxSizing:'border-box'
		}}>
			<div style={{width:'100%',maxWidth:'380px'}}>
				{/* view a:searching guest */}
				{!party && (
					<div style={{
						marginTop:'40px',
						backgroundColor:'#222930',
						backdropFilter:'blur(4px)',
						padding:'20px',
						borderRadius:'16px'
					}}>
						<SearchInput onSearchSuccess={setParty} onErr={setErr} onLoading={setLoading}/>
					</div>
				)}
				{loading && <p style={{ textAlign:'center',fontFamily:'serif',color:'#222930' }}>Accessing Guest List...</p>}
				{err && <p style={{ color:'#c0392b',textAlign:'center',fontFamily:'sans-serif',fontSize:'0.9rem' }}>{error}</p>}
				{/* wiew b:guest cards */}
				{party && (
					<div style={{
						display:'flex',
						flexDirection:'column',
						gap:'25px',
						width:'100%'
					}}>
						<div style={{
							display:'flex',
							justifyContent:'space-between',
							padding:'0 10px',
							fontFamily:"'Noto Serif',serif",
							fontSize:'0.9rem',
							fontWeight:'bold',
							color:'#222930'
						}}>
							<span>Your Party</span>
							<span>{party.guests?.length || 0} guests found</span>
						</div>
						{party.guests?.map((guest)=>(
							<div
								key={guestId}
								style={{
									background:'#E8DCCA',
									backdropFilter:'blur(12px)',
									WebkitBackdropFilter:'blur(12px)',
									borderRadius:'14px',
									padding:'24px',
									boxShadow:'0 8px 32px rgba(0,0,0,0.08)',
									border:'1px solid #C5A059',
									fontFamily:"'Noto Serif',serif",
									color:'#222930'
							}}>
								{/* header-name + attending or not check box */}
								<div style={{
									display:'flex',
									justifyContent:'space-between',
									alignItems:'center',
									marginBottom:'15px' 
								}}>
									<span style={{ fontSize:'1.1rem',fontWeight:'bold' }}>{guest.first_name} {guest.last_name}</span>
									<label style={{ display:'flex',alignItems:'center',gap:'8px',fontSize:'0.9rem',cursor:'pointer' }}>
										<input type="checkbox" defaultChecked={true} style={{ accentColor:'#C5A059',scale:'1.2' }} />
										Attending
									</label>
								</div>
								{/* meal option-chicken and been just for temporary placement */}
								<div style={{
									fontSize:'0.8rem',
									letterSpacing:'0.05em',
									fontWeight:'bold',
									margin:'15px 0 8px 0' 
								}}>MEAL PREFERENCE</div>
								<div style={{
									display:'flex',
									flexDirection:'column',
									gap:'8px',
									fontSize:'0.95rem'
								}}>
									<label style={{ display:'flex',alignItems:'center',gap:'10px',cursor:'pointer' }}>
										<input type="radio" name={`meal-${guest.id}`} defaultChecked style={{ accentColor:'#C5A059' }} /> Chicken
									</label>
									<label style={{ display:'flex',alignItems:'center',gap:'10px',cursor:'pointer' }}>
										<input type="radio" name={`meal-${guest.id}`} style={{ accentColor:'#C5A059' }} /> Beef
									</label>
								</div>
								{/* sond selection */}
								<div style={{ 
									fontSize:'0.95rem',
									margin:'15px 0 8px 0',
									fontStyle:'italic'
								}}>I promise to dance if you play</div>
								<input 
									type="text" 
									placeholder="Song & artist" 
									style={{
										width:'100%',
										padding:'10px 15px',
										borderRadius:'8px',
										border:'1px solid #C5A059',
										backgroundColor:'rgba(255,255,255,0.4)',
										boxSizing:'border-box',
										fontFamily:'inherit'
									}}
								/>
								{/* Plus one add on -if alowed plus onE */}
								<div style={{
									display:'flex',
									justifyContent:'space-between',
									alignItems:'center',
									marginTop:'20px',
									paddingTop:'15px',
									borderTop:'1px solid rgba(0,0,0,0.06)'
								}}>
									<span style={{ fontSize:'0.95rem' }}>Add a plus one</span>
									<button 
										onClick={() => togglePlusOne(guest.id)}
										style={{
										width:'32px',
										height:'32px',
										borderRadius:'50%',
										border:'none',
										backgroundColor:'#9EA8B5',
										color:'#222930',
										fontSize:'1.2rem',
										cursor:'pointer',
										display:'flex',
										alignItems:'center',
										justifyContent:'center'
										}}
									>
										{activePlusOnes[guest.id] ? '−' :'+'}
									</button>
								</div>
								{activePlusOnes[guest.id] && (
									<div style={{display:'flex',gap:'10px',marginTop:'15px' }}>
										<input type="text" placeholder="Name" style={{ width:'50%',padding:'10px',borderRadius:'8px',border:'1px solid #d4af37',backgroundColor:'rgba(255,255,255,0.4)' }} />
										<input type="text" placeholder="Surname" style={{ width:'50%',padding:'10px',borderRadius:'8px',border:'1px solid #d4af37',backgroundColor:'rgba(255,255,255,0.4)' }} />
									</div>
									)}
							</div>
						))}
						<button style={{
							width:'100%',
							padding:'14px',
							borderRadius:'8px',
							border:'none',
							backgroundColor:'#9EA8B5',
							color:'#222930',
							fontSize:'1rem',
							fontWeight:'bold',
							letterSpacing:'0.05em',
							cursor:'pointer',
							boxShadow:'0 4px 15px rgba(0,0,0,0.05)',
							marginTop:'10px'
						}}>
							Submit RSVP
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
export default App;