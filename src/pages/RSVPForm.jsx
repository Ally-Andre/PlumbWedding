import { useState } from "react";
import SearchInput from "../components/SearchInput";
import plumBackground from "../assets/plumbBackground_light.png";

function RSVPForm(){
    const [party,setParty]=useState(null);
	const [err,setErr]=useState('');
	const [loading,setLoading]=useState(false);
	const [plusOneCount,setPlusOneCount]=useState({});
	const incrementPlusOne=(guestId,max)=>{
		setPlusOneCount(prev=>({
			...prev,
			[guestId]:Math.min((prev[guestId] || 0)+1,max)
		}));
	};
	const decrementPlusOne=(guestId)=>{
		setPlusOneCount(prev=>({
			...prev,
			[guestId]:Math.max((prev[guestId] || 0)-1,0)
		}));
	};
	return(
		<div style={{
			minHeight:'100vh',
			width:'100%',
			backgroundImage:`url(${plumBackground})`,
			backgroundRepeat:'repeat-y',
			backgroundPosition:'top center',
			backgroundSize:'100% auto',
			display:'flex',
			justifyContent:'center',
			alignItems:'flex-start',
			padding:'70px 38px 35px',
			boxSizing:'border-box'
		}}>
			<div style={{width:'100%',maxWidth:'335px'}}>
				<SearchInput onSearchSuccess={setParty} onErr={setErr} onLoading={setLoading}/>
				{loading && <p style={{ textAlign:'center',fontFamily:"'Inknut Antiqua', serif",color:'#222930',margin:'18px 0 0' }}>Accessing Guest List...</p>}
				{err && <p style={{ color:'#9f3f3f',textAlign:'center',fontFamily:"'Inknut Antiqua', serif",fontSize:'0.9rem',margin:'18px 0 0' }}>{err}</p>}
				{party && (
					<div style={{
						display:'flex',
						flexDirection:'column',
						gap:'25px',
						width:'100%',
						marginTop:'38px'
					}}>
						<div style={{
							display:'flex',
							justifyContent:'space-between',
							padding:'0 5px',
							fontFamily:"'Inknut Antiqua', serif",
							fontSize:'0.95rem',
							fontWeight:'bold',
							color:'#222930'
						}}>
							<span>Your party</span>
							<span>{party.guests?.length || 0} guests found</span>
						</div>
						{party.guests?.map((guest)=>(
							<div
								key={guest.id}
								style={{
									background:'#E8DCCA',
									borderRadius:'4px',
									padding:'10px 16px 14px',
									boxShadow:'0 5px 12px rgba(34,41,48,0.25)',
									border:'1px solid rgba(197,160,89,0.45)',
									fontFamily:"'Inknut Antiqua', serif",
									color:'#222930'
							}}>
								<div style={{
									display:'flex',
									justifyContent:'space-between',
									alignItems:'center',
									marginBottom:'8px',
									gap:'15px'
								}}>
									<span style={{ 
										fontSize:'0.8rem',
										fontWeight:'bold',
										whiteSpace:'nowrap',
										overflow:'hidden',
										textOverflow:'ellipsis',
										maxWidth:'170px'
									}}>{guest.first_name} {guest.last_name}</span>
									<label style={{ display:'flex',alignItems:'center',gap:'8px',fontSize:'0.7rem',cursor:'pointer',whiteSpace:'nowrap' }}>
										<input type="checkbox" defaultChecked={true} style={{ accentColor:'#C5A059',width:'16px',height:'16px' }} />
										Attending
									</label>
								</div>
								<div style={{
									fontSize:'0.9rem',
									letterSpacing:'0.05em',
									margin:'6px 0 6px 0',
									textAlign:'left'
								}}>Meal preference</div>
								<div style={{
									display:'flex',
									flexDirection:'column',
									gap:'6px',
									fontSize:'0.85rem'
								}}>
									<label style={{ display:'flex',alignItems:'center',gap:'9px',cursor:'pointer' }}>
										<input type="radio" name={`meal-${guest.id}`} defaultChecked style={{ accentColor:'#C5A059',width:'16px',height:'16px' }} /> Chicken
									</label>
									<label style={{ display:'flex',alignItems:'center',gap:'9px',cursor:'pointer' }}>
										<input type="radio" name={`meal-${guest.id}`} style={{ accentColor:'#C5A059',width:'16px',height:'16px' }} /> Beef
									</label>
								</div>
								<div style={{ 
									fontSize:'0.9rem',
									margin:'10px 0 10px 0',
									textAlign:'left'
								}}>I promise to dance if you play</div>
								<input 
									type="text" 
									placeholder="Song & artist" 
									style={{
										width:'100%',
										padding:'2px 13px',
										borderRadius:'7px',
										border:'1px solid #C5A059',
										backgroundColor:'rgba(255,255,255,0.3)',
										boxSizing:'border-box',
										fontFamily:"'Inknut Antiqua', serif",
										fontSize:'0.7rem',
										color:'#222930'
									}}
								/>
								{guest.max_guests > 0 && (
									<div style={{marginTop:'10px'}}>
										<div style={{
											display:'flex',
											justifyContent:'space-between',
											alignItems:'center'
										}}>
											<span style={{ fontSize:'0.9rem' }}>Add a plus one {guest.max_guests > 1 ? `(up to ${guest.max_guests})` : ''}</span>
											<div style={{ display:'flex',alignItems:'center',gap:'10px' }}>
												{(plusOneCount[guest.id] || 0) > 0 && (
													<button 
														onClick={() => decrementPlusOne(guest.id)}
														style={{
															width:'25px',
															height:'25px',
															borderRadius:'50%',
															border:'none',
															backgroundColor:'#9EA8B5',
															color:'#222930',
															fontSize:'1.7rem',
															cursor:'pointer',
															display:'flex',
															alignItems:'center',
															justifyContent:'center',
															padding:'0'
														}}
													>
														-
													</button>
												)}
												{(plusOneCount[guest.id] || 0) < guest.max_guests && (
													<button 
														onClick={() => incrementPlusOne(guest.id,guest.max_guests)}
														style={{
															width:'25px',
															height:'25px',
															borderRadius:'50%',
															border:'none',
															backgroundColor:'#9EA8B5',
															color:'#222930',
															fontSize:'1.7rem',
															cursor:'pointer',
															display:'flex',
															alignItems:'center',
															justifyContent:'center',
															padding:'0'
														}}
													>
														+
													</button>
												)}
											</div>
										</div>
										{Array.from({length:plusOneCount[guest.id] || 0}).map((_,i)=>(
											<div key={i} style={{display:'flex',gap:'12px',marginTop:'10px' }}>
												<input type="text" placeholder="Name" style={{ width:'50%',padding:'1px 12px',borderRadius:'7px',border:'1px solid #C5A059',backgroundColor:'rgba(255,255,255,0.3)',fontFamily:"'Inknut Antiqua', serif",fontSize:'0.7rem',boxSizing:'border-box',color:'#222930'}} />
												<input type="text" placeholder="Surname" style={{ width:'50%',padding:'1px 12px',borderRadius:'7px',border:'1px solid #C5A059',backgroundColor:'rgba(255,255,255,0.3)',fontFamily:"'Inknut Antiqua', serif",fontSize:'0.7rem',boxSizing:'border-box',color:'#222930'}} />
											</div>
										))}
									</div>
								)}
							</div>
						))}
						<button style={{
							width:'100%',
							padding:'2px',
							borderRadius:'6px',
							border:'none',
							backgroundColor:'#9EA8B5',
							color:'#222930',
							fontSize:'1rem',
							fontFamily:"'Inknut Antiqua', serif",
							cursor:'pointer',
							boxShadow:'0 4px 12px rgba(34,41,48,0.12)',
							marginTop:'16px'
						}}>
							Submit RSVP
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default RSVPForm;