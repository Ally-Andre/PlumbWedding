#!/usr/bin/env python3
"""Apply small, guarded edits to the EXISTING Vite wedding project.
Run from the project root: python3 scripts/enable_personal_links.py
Backs up all 3 files as *.before-private-links (do not commit backups).
"""
from pathlib import Path
import sys

root = Path.cwd()
paths = {
    'app': root / 'src/App.jsx',
    'api': root / 'src/API/rsvpService.js',
    'form': root / 'src/pages/RSVPForm.jsx',
}
for key, path in paths.items():
    if not path.is_file():
        sys.exit(f"Missing {path}. Run from the PlumbWedding project root.")

app = paths['app'].read_text(encoding='utf-8')
api = paths['api'].read_text(encoding='utf-8')
form = paths['form'].read_text(encoding='utf-8')

# Avoid half-applying patches or overwriting a newer implementation.
if ('findPartyByInvitationLink' in api or
    'openingPrivateLink' in form or
    'privateInvitation' in app):
    sys.exit('Private-link changes seem already present. No files were changed.')

app_anchor = "onComplete={()=>setCurrentPage('info')}"
if app.count(app_anchor) != 1:
    sys.exit("App.jsx differs from the expected version. No files changed. Please review onComplete manually.")
app = app.replace(app_anchor, '''onComplete={() => {
                      const privateInvitation = new URLSearchParams(
                        window.location.hash.slice(1)
                      ).has('invite');
                      setCurrentPage(privateInvitation ? 'rsvp' : 'info');
                    }}''')

api_anchor = "import { supabase } from '../supabaseClient';"
if api_anchor not in api:
    sys.exit("rsvpService.js import not found; nothing modified.")
api += '''\n// A private link is a bearer credential: whoever has the link can access
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
'''

old_import_state = "import { useState } from 'react';"
old_import_api = "import { submitWeddingRSVP } from '../API/rsvpService';"
if form.count(old_import_state) != 1 or form.count(old_import_api) != 1:
    sys.exit('RSVPForm.jsx imports differ from expected version; no files changed.')
form = form.replace(old_import_state, "import { useEffect, useRef, useState } from 'react';")
form = form.replace(old_import_api, "import { submitWeddingRSVP, findPartyByInvitationLink } from '../API/rsvpService';")

state_anchor = "  const [saved, setSaved] = useState(false);"
if form.count(state_anchor) != 1:
    sys.exit('RSVPForm.jsx state section differs; no files changed.')
form = form.replace(state_anchor, state_anchor + '''
  const [openingPrivateLink, setOpeningPrivateLink] = useState(false);
  const privateLinkAttempted = useRef(false);''')

update_anchor = "  function updateGuest(guestId, field, value) {"
if form.count(update_anchor) != 1:
    sys.exit('RSVPForm.jsx guest update section differs; no files changed.')
effect = '''  // If a guest opens a private link, resolve their party automatically.
  // The fragment (#invite=...) is not sent with the initial web request.
  useEffect(() => {
    if (privateLinkAttempted.current) return;
    const params = new URLSearchParams(window.location.hash.slice(1));
    const code = params.get('invite');
    if (code === null) return;
    privateLinkAttempted.current = true;

    // Remove the token from the visible address bar and current history entry.
    window.history.replaceState(window.history.state, '',
      window.location.pathname + window.location.search);

    setOpeningPrivateLink(true);
    findPartyByInvitationLink(code)
      .then((foundParty) => {
        if (foundParty) {
          handleSearchSuccess(foundParty);
        } else {
          setSearchError('This private invitation link is invalid. Please contact the hosts.');
        }
      })
      .catch(() => {
        // Do not log invitation tokens or guest data to the console.
        setSearchError('We could not open your private invitation. Please try again later.');
      })
      .finally(() => setOpeningPrivateLink(false));
  }, []);

'''
form = form.replace(update_anchor, effect + update_anchor)

search_before = '''      <div className="wr-search-card">
        <h2>Find your invitation</h2>
        <div className="wr-search-input-wrap">
          <SearchInput onSearchSuccess={handleSearchSuccess} onErr={setSearchError} onLoading={setSearchLoading} />
        </div>
        {searchLoading && <p className="wr-notice" role="status">Searching the guest list…</p>}
        {searchError && <p className="wr-error" role="alert">{searchError}</p>}
      </div>'''
search_after = '''      {!party && (
        <div className="wr-search-card">
          <h2>{openingPrivateLink ? 'Opening your invitation…' : 'Find your invitation'}</h2>
          {!openingPrivateLink && (
            <div className="wr-search-input-wrap">
              <SearchInput onSearchSuccess={handleSearchSuccess} onErr={setSearchError} onLoading={setSearchLoading} />
            </div>
          )}
          {openingPrivateLink && <p className="wr-notice" role="status">Finding your household…</p>}
          {searchLoading && <p className="wr-notice" role="status">Searching the guest list…</p>}
          {searchError && <p className="wr-error" role="alert">{searchError}</p>}
        </div>
      )}'''
if form.count(search_before) != 1:
    sys.exit('RSVPForm.jsx search markup differs; no files changed.')
form = form.replace(search_before, search_after)

# Successful preflight: save backups and then write all files.
for key, content in [('app', app), ('api', api), ('form', form)]:
    path = paths[key]
    backup = path.with_name(path.name + '.before-private-links')
    if backup.exists():
        sys.exit(f"Backup {backup} already exists. No files changed. Move it first.")

for key, content in [('app', app), ('api', api), ('form', form)]:
    path = paths[key]
    backup = path.with_name(path.name + '.before-private-links')
    backup.write_bytes(path.read_bytes())
    path.write_text(content, encoding='utf-8')
    print('Updated:', path.relative_to(root))
print('Done. Next run: npm run build')
