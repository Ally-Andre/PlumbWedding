import { useState } from "react";
import { Search } from "lucide-react";
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
            onErr("An error occured while looking up your invitation.");
            onSearchSuccess(null);
        }finally{
            onLoading(false);
        }
    };
    return(
        <div style={{textAlign:'center',width:'100%'}}>
            <h1 style={{
                fontFamily:"'Inspiration', cursive",
                fontSize:'3.3rem',
                color:'#C5A059',
                margin:'0 0 8px 0',
                fontWeight:'300',
                textShadow:'0 3px 4px #2229302d'
            }}>RSVP</h1>
            <br/>
            <p style={{
                fontFamily:"'Inknut Antiqua', serif",
                fontSize:'1rem',
                color:'#222930',
                margin:'0 0 8px 0',
                lineHeight:'1.35',
                fontWeight:'600'
            }}>Please search your name to<br/>confirm your attendance</p><br/>
            <h3 style={{
                fontFamily:"'Inknut Antiqua', serif",
                fontSize:'1rem',
                color:'#222930',
                margin:'0 0 10px 0',
                letterSpacing:'0.02em'
            }}>SEARCH GUEST LIST</h3>
            <form onSubmit={handleSubmit} style={{
                position:'relative',
                maxWidth:'335px',
                margin:'0 auto'
            }}>
                <input
                    type="text"
                    value={inputName}
                    onChange={(e)=>setInputName(e.target.value)}
                    placeholder="Name & Surname"
                    style={{
                        width:'100%',
                        padding:'2px 4px 1px 17px',
                        borderRadius:'22px',
                        border:'1px solid #C5A059',
                        backgroundColor:'#E8DCCA',
                        boxSizing:'border-box',
                        fontSize:'0.8rem',
                        fontFamily:"'Inknut Antiqua', serif",
                        color:'#222930',
                        outline:'none'
                    }}
                />
                <button type="submit" style={{
                    position:'absolute',
                    right:'13px',
                    top:'50%',
                    transform:'translateY(-50%)',
                    color:'#222930',
                    cursor:'pointer',
                    border:'none',
                    background:'transparent',
                    fontSize:'1rem',
                    padding:'4px'
                }}>
                    <Search size={18} color="#222930"/>
                </button>
            </form>
        </div>
    );
}
export default SearchInput;