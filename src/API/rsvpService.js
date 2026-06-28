import { supabase } from "../supabaseClient";

export const findaPartyByGuestName=async(searchName)=>{
    const cleanName=searchName.trim().toLowerCase();
    if(!cleanName) return null;
    const {data: guests,error: searchErr}=await supabase
        .from('guests')
        .select('*');
    if(searchErr){
        throw searchErr;
    }
    const searchWords=cleanName.split(/\s+/);
    const matchedGuests=guests?.filter((guest)=>{
        const fullName=`${guest.first_name || ''} ${guest.last_name || ''}`.toLowerCase();
        return searchWords.every((word)=>fullName.includes(word));
    });
    if(!matchedGuests || matchedGuests.length===0){
        return null;
    }
    const primaryGuest=matchedGuests[0];
    if(!primaryGuest.party_id){
        return{
            id:null,
            party_name:`${primaryGuest.last_name || 'Guest'} Household`,
            is_submitted:false,
            guests:[primaryGuest]
        };
    }
    const {data: partyData,error: partyErr}=await supabase
        .from('parties')
        .select('id,party_name,is_submitted')
        .eq('id',primaryGuest.party_id)
        .single();
    if(partyErr){
        throw partyErr;
    }
    const {data: partyGuests,error: guestsErr}=await supabase
        .from('guests')
        .select('*')
        .eq('party_id',primaryGuest.party_id)
        .order('id',{ascending:true});
    if(guestsErr){
        throw guestsErr;
    }
    return{
        ...partyData,
        guests:partyGuests || [primaryGuest]
    };
};