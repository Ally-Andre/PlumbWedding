import { supabase } from '../supabaseClient';

// Never read the entire guests table from the browser.
// The secure database RPC returns only a party authorized by both name and code.
export async function findaPartyByGuestName(searchName, invitationCode) {
  const name = searchName.trim();
  const code = invitationCode.replace(/\s/g, '').trim().toUpperCase();
  if (!name || !code) return null;

  const { data, error } = await supabase.rpc('lookup_wedding_party', {
    p_search_name: name,
    p_invitation_code: code,
  });
  if (error) throw error;
  return data ? { ...data, invitationCode: code } : null;
}

// The server checks the code again and atomically locks the invitation.
// Never use a service_role key or direct table updates in frontend code.
export async function submitWeddingRSVP(payload) {
  const { invitationCode, ...rsvpPayload } = payload;
  if (!invitationCode) throw new Error('Please search for your invitation again.');
  const { data, error } = await supabase.rpc('submit_wedding_rsvp', {
    p_invitation_code: invitationCode,
    p_payload: rsvpPayload,
  });
  if (error) throw new Error(error.message || 'Unable to submit your RSVP.');
  if (!data?.success) throw new Error('We could not confirm your RSVP. Please try again.');
  return data;
}

// A private link is a bearer credential: whoever has the link can access
// that household's RSVP until it is submitted. Keep links confidential.
export async function findPartyByInvitationLink(code) {
  const invitationCode = String(code ?? '').trim().toUpperCase();
  if (!/^[A-F0-9]{24}$/.test(invitationCode)) return null;
  const { data, error } = await supabase.rpc('lookup_wedding_party_by_link', {
    p_invitation_code: invitationCode,
  });
  if (error) throw error;
  return data ? { ...data, invitationCode } : null;
}
