import { supabase } from "../supabaseClient";

export const findaPartyByGuestName=async (searchName)=>{
    if(!searchName.trim()) return null;
    //search guests table for a match
    const {data: matchedGuests,error: searchErr}=await supabase
        .from('guests')
        .select('*')
        .ilike('first_name','%{searchName}%');
    if(searchErr){
        throw searchErr;
    }
    if(!matchedGuests || matchedGuests.length===0){
        return null;
    }
    //take party_id from matched guest'
    const primaryGuest=matchedGuests[0];
    //guest if singular
    if(!primaryGuest.party_id){
        return{
            id:null,
            party_name: `${primaryGuest.last_name || 'Guest'} Household`,
            is_submitted:false,
            guests:[primaryGuest]
        };
    }
    //guest is not singular: pull all guests linked to that party
    const {data: partyData,error: partyErr}=await supabase
        .from('parties')
        .select('id,party_name,is_attending,max_guests')
        .eq('id',partyID)
        .single()//expect one party object back
    if(partyErr){
        throw partyErr;
    }
    return partyData;
}