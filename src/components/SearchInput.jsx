import { useState } from "react";
import { findaPartyByGuestName } from "../API/rsvpService";

function SearchInput({onSearchSuccess,onErr,onLoading}){
    const [inputName,setInputName]=useState('');
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!inputName.trim()){
            return;
        }
        onLoading(true);
        onErr('');
        try{
            const partyData=await findaPartyByGuestName(inputName);
            if(!partyData){
                onErr("We couldn't find that name on our guest list. Please reach out and we will fix the spelling");
                onSearchSuccess(null);
            }else{
                onSearchSuccess(partyData);
            }
        }catch(err){
            console.error(err);
            onError("An error occured while looking up your invitation.");
        }finally{
            onLoading(false);
        }
    };
    return(
        <div style={{textAlign:'center',width:'100%'}}>
            {/* RSVP STYLE*/}
            <h1 style={{
                fontFamily:"'Cormorant Garmond',serif",
                fontSize:'3rem',
                color:'#C5A059',
                margin:'0 0 10px 0',
                fontWeight:'300'
            }}>RSVP</h1>
            <p style={{
                fontFamily:"'Noto Serif', serif",
                fontSize:'1rem',
                color:'#222930',
                marginBottom:'25px',
                lineHeight:'1.4'
            }}>Please search your name to<br/>confirm your attendance</p>
            <h3 style={{
                fontFamily:"'Noto Serif', serif",
                fontSize:'0.85rem',
                color:'#222930',
                margin:'0 0 10px 0',
                letterSpacing:'0.1em'
            }}>SEARCH GUEST LIST</h3>
            <form onSubmit={handleSubmit} style={{
                position:'relative',
                maxWidth:'340px',
                margin:'0 auto'
            }}>
                <input
                    type="text"
                    value={inputName}
                    onChange={(e)=>setInputName(e.target.value)}
                    placeholder="Name & Surname"
                    style={{
                        width:'100%',
                        padding:'12px 40px 12px 20px',
                        borderRadius:'25px',
                        border:'1px solid #C5A059',
                        backgroundColor:'#E8DCCA',
                        boxSizing:'border-box',
                        fontSize:'1rem',
                        fontFamily:"'Noto Serif', serif",
                        color:'#222930'
                    }}
                />
                <span style={{
                    position:'absolute',
                    right:'20px',
                    top:'50%',
                    transform:'translateY(-50%)',
                    color:'#222930',
                    cursor:'pointer',
                }}onClick={handleSubmit}>
                🔍
                </span>
            </form>
        </div>
    );
}
export default SearchInput;