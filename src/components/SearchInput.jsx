import { useState } from 'react';
import { Search } from 'lucide-react';
import { findaPartyByGuestName } from '../API/rsvpService';

function SearchInput({ onSearchSuccess, onErr, onLoading }) {
  const [inputName, setInputName] = useState('');
  const [invitationCode, setInvitationCode] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (!inputName.trim() || !invitationCode.trim()) {
      onErr('Please enter your name, surname and invitation code.');
      return;
    }
    onLoading(true);
    onErr('');
    try {
      const party = await findaPartyByGuestName(inputName, invitationCode);
      if (!party) {
        onSearchSuccess(null);
        onErr('We could not match that name and invitation code. Please check both or contact us.');
      } else {
        onSearchSuccess(party);
      }
    } catch (error) {
      console.error('Invitation lookup failed:', error);
      onSearchSuccess(null);
      onErr('We could not access your invitation right now. Please try again.');
    } finally {
      onLoading(false);
    }
  }

  return (
    <form className="wr-search-form" onSubmit={handleSubmit}>
      <label htmlFor="guest-search" className="wr-input-label">Name and surname</label>
      <div className="wr-search-line">
        <input
          id="guest-search"
          type="search"
          autoComplete="name"
          value={inputName}
          onChange={(event) => setInputName(event.target.value)}
          placeholder="Enter your name and surname"
          required
        />
      </div>
      <label htmlFor="invitation-code" className="wr-input-label wr-code-label">Private invitation code</label>
      <div className="wr-search-line wr-search-code-line">
        <input
          id="invitation-code"
          type="text"
          autoComplete="off"
          spellCheck="false"
          value={invitationCode}
          onChange={(event) => setInvitationCode(event.target.value)}
          placeholder="Code supplied with your invitation"
          required
        />
        <button type="submit" aria-label="Find invitation">
          <Search size={19} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

export default SearchInput;
