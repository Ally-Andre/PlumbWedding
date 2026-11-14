import { useState } from 'react';
import SearchInput from '../components/SearchInput';
import { submitWeddingRSVP } from '../API/rsvpService';
// Load this stylesheet even when the form is mounted separately from RSVPPage.
import rsvpStyleText from '../styles/rsvp.css?inline';

// The search component is unchanged; it still supplies the selected party.
// A real Supabase save function can be passed as the onSubmitRSVP prop.
const STARTERS = ['Butternut soup', 'Springbok'];
const MAINS = ['Steak', 'Chicken'];
const DESSERTS = ['Homemade ice cream', 'Chocolate pudding'];

const emptyResponse = () => ({
  burgerDinner: '',
  wedding: '',
  starter: '',
  main: '',
  dessert: '',
  dietaryRequirements: '',
  songRequest: '',
  plusOnes: [],
});

const emptyPlusOne = () => ({
  firstName: '',
  lastName: '',
  burgerDinner: '',
  wedding: '',
  starter: '',
  main: '',
  dessert: '',
  dietaryRequirements: '',
});

function AttendanceChoice({ name, label, date, value, onChange }) {
  return (
    <fieldset className="wr-fieldset wr-event-fieldset">
      <legend className="wr-screen-reader-only">{label}{date ? `, ${date}` : ''}</legend>
      <div className="wr-event-header" aria-hidden="true">
        <span className="wr-event-title">{label}</span>
        {date && <span className="wr-event-date">{date}</span>}
      </div>
      <div className="wr-choice-row">
        {[{ value: 'yes', label: 'Joyfully accepts' }, { value: 'no', label: 'Regretfully declines' }].map((choice) => (
          <label className="wr-choice" key={choice.value}>
            <input
              type="radio"
              name={name}
              value={choice.value}
              checked={value === choice.value}
              onChange={() => onChange(choice.value)}
            />
            <span>{choice.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function MealChoice({ label, options, value, onChange, name }) {
  return (
    <fieldset className="wr-fieldset">
      <legend className="wr-field-label">{label} <span className="wr-required"></span></legend>
      <div className="wr-meal-options">
        {options.map((option) => (
          <label className="wr-choice wr-meal-choice" key={option}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function MealSection({ response, onFieldChange, groupId }) {
  return (
    <div className="wr-meal-section">
      <div className="wr-subsection-heading">
        <span className="wr-mini-rule" />
        <span>Your dinner</span>
        <span className="wr-mini-rule" />
      </div>
      <p className="wr-help">Please choose a starter, main course and dessert.</p>
      <div className="wr-meal-grid">
        <MealChoice label="Starter" options={STARTERS} value={response.starter} onChange={(v) => onFieldChange('starter', v)} name={`${groupId}-starter`} />
        <MealChoice label="Main course" options={MAINS} value={response.main} onChange={(v) => onFieldChange('main', v)} name={`${groupId}-main`} />
        <MealChoice label="Dessert" options={DESSERTS} value={response.dessert} onChange={(v) => onFieldChange('dessert', v)} name={`${groupId}-dessert`} />
      </div>
      <label className="wr-input-label" htmlFor={`${groupId}-dietary`}>Allergies or dietary requirements <span>(optional)</span></label>
      <input
        id={`${groupId}-dietary`}
        type="text"
        className="wr-input"
        placeholder="Please tell us anything we should know"
        value={response.dietaryRequirements}
        onChange={(e) => onFieldChange('dietaryRequirements', e.target.value)}
      />
    </div>
  );
}

function validatePerson(person, name) {
  if (!person.burgerDinner) return `Please choose a burger dinner response for ${name}.`;
  if (!person.wedding) return `Please choose a wedding response for ${name}.`;
  if (person.wedding === 'yes' && (!person.starter || !person.main || !person.dessert)) {
    return `Please choose all three meal courses for ${name}.`;
  }
  return null;
}

function isGuestComplete(response) {
  if (validatePerson(response, '')) return false;
  return response.plusOnes.every(
    (p) => p.firstName.trim() && p.lastName.trim() && !validatePerson(p, '')
  );
}

function summarise(response) {
  const tick = (v) => (v === 'yes' ? '✓' : '✗');
  const parts = [`Burger ${tick(response.burgerDinner)}`, `Wedding ${tick(response.wedding)}`];
  if (response.wedding === 'yes') parts.push(`${response.starter}, ${response.main}, ${response.dessert}`);
  if (response.plusOnes.length) parts.push(`+1 ${response.plusOnes[0].firstName.trim()}`);
  return parts.join(' · ');
}

function RSVPForm({ onSubmitRSVP = submitWeddingRSVP }) {
  const [party, setParty] = useState(null);
  const [responses, setResponses] = useState({});
  const [searchError, setSearchError] = useState('');
  const [formError, setFormError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [review, setReview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [collapsed, setCollapsed] = useState({});

  const guests = party?.guests ?? [];
  // Only one plus-one is permitted for the entire invitation, even if
  // multiple invited guests have a positive max_guests value.
  const plusOneOwnerId = Object.keys(responses).find(
    (guestId) => responses[guestId]?.plusOnes?.length > 0
  );

  function handleSearchSuccess(foundParty) {
    setParty(foundParty);
    setResponses(Object.fromEntries((foundParty?.guests ?? []).map((guest) => [String(guest.id), emptyResponse()])));
    setFormError('');
    setSearchError('');
    setReview(false);
    setSaved(false);
    setCollapsed({});
  }

  function updateGuest(guestId, field, value) {
    const id = String(guestId);
    setResponses((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
        ...(field === 'wedding' && value === 'no' ? {
          starter: '', main: '', dessert: '', dietaryRequirements: '', songRequest: '',
        } : {}),
      },
    }));
    setReview(false);
    setFormError('');
  }

  function updatePlusOne(guestId, index, field, value) {
    const id = String(guestId);
    setResponses((prev) => {
      const response = prev[id];
      const plusOnes = response.plusOnes.map((person, i) => i === index ? {
        ...person,
        [field]: value,
        ...(field === 'wedding' && value === 'no' ? {
          starter: '', main: '', dessert: '', dietaryRequirements: '',
        } : {}),
      } : person);
      return { ...prev, [id]: { ...response, plusOnes } };
    });
    setReview(false);
    setFormError('');
  }

  function togglePlusOne(guest) {
    const id = String(guest.id);
    if (!(Number(guest.max_guests) > 0)) return;
    setResponses((prev) => {
      const response = prev[id];
      if (!response) return prev;
      const alreadyAdded = response.plusOnes.length > 0;
      if (!alreadyAdded && Object.entries(prev).some(
        ([otherId, other]) => otherId !== id && other.plusOnes?.length > 0
      )) return prev;
      return {
        ...prev,
        [id]: { ...response, plusOnes: alreadyAdded ? [] : [emptyPlusOne()] },
      };
    });
    setReview(false);
    setFormError('');
  }

  function buildPayload() {
    return {
      partyId: party?.id ?? null,
      invitationCode: party?.invitationCode ?? '',
      responses: guests.map((guest) => {
        const response = responses[String(guest.id)];
        return {
          guestId: guest.id,
          firstName: guest.first_name,
          lastName: guest.last_name,
          burgerDinner: response.burgerDinner === 'yes',
          wedding: response.wedding === 'yes',
          starter: response.wedding === 'yes' ? response.starter : null,
          main: response.wedding === 'yes' ? response.main : null,
          dessert: response.wedding === 'yes' ? response.dessert : null,
          dietaryRequirements: response.wedding === 'yes' ? response.dietaryRequirements.trim() : null,
          songRequest: response.songRequest.trim(),
          plusOnes: response.plusOnes.map((person) => ({
            firstName: person.firstName.trim(),
            lastName: person.lastName.trim(),
            burgerDinner: person.burgerDinner === 'yes',
            wedding: person.wedding === 'yes',
            starter: person.wedding === 'yes' ? person.starter : null,
            main: person.wedding === 'yes' ? person.main : null,
            dessert: person.wedding === 'yes' ? person.dessert : null,
            dietaryRequirements: person.wedding === 'yes' ? person.dietaryRequirements.trim() : null,
          })),
        };
      }),
    };
  }

  function validateAll() {
    for (const guest of guests) {
      const response = responses[String(guest.id)];
      if (!response) return 'Please search for your invitation again.';
      const name = `${guest.first_name} ${guest.last_name}`;
      const error = validatePerson(response, name);
      if (error) return error;
      for (let i = 0; i < response.plusOnes.length; i += 1) {
        const plusOne = response.plusOnes[i];
        if (!plusOne.firstName.trim() || !plusOne.lastName.trim()) {
          return `Please enter the full name of plus-one ${i + 1} for ${name}.`;
        }
        const plusOneError = validatePerson(plusOne, `${plusOne.firstName} ${plusOne.lastName}`);
        if (plusOneError) return plusOneError;
      }
    }
    return null;
  }

  function reviewResponses(event) {
    event.preventDefault();
    const error = validateAll();
    if (error) {
      setFormError(error);
      setReview(false);
      return;
    }
    setFormError('');
    setReview(true);
    setTimeout(() => document.getElementById('wr-review')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  }

  async function confirmSave() {
    if (typeof onSubmitRSVP !== 'function') return;
    setSaving(true);
    setFormError('');
    try {
      await onSubmitRSVP(buildPayload());
      setSaved(true);
      setParty((prev) => prev ? { ...prev, is_submitted: true } : prev);
    } catch (error) {
      const message = error?.message || 'We could not save your RSVP. Please try again.';
      if (/already been submitted/i.test(message)) {
        setParty((prev) => prev ? { ...prev, is_submitted: true } : prev);
        setReview(false);
      } else {
        setFormError(message);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="wr-form-shell" aria-label="RSVP form">
      <style>{rsvpStyleText}</style>
      <div className="wr-search-card">
        <h2>Find your invitation</h2>
        <div className="wr-search-input-wrap">
          <SearchInput onSearchSuccess={handleSearchSuccess} onErr={setSearchError} onLoading={setSearchLoading} />
        </div>
        {searchLoading && <p className="wr-notice" role="status">Searching the guest list…</p>}
        {searchError && <p className="wr-error" role="alert">{searchError}</p>}
      </div>

      {party && guests.length === 0 && (
        <p className="wr-notice">No guests were returned for this invitation. Please try searching again.</p>
      )}

      {party?.is_submitted && !saved && (
        <div className="wr-review-card wr-lock-card" role="status">
          <h2>We've received your RSVP</h2>
          <p>This invitation has already been submitted, so responses are now locked. If you need to make a change, please contact us.</p>
        </div>
      )}

      {guests.length > 0 && !party?.is_submitted && (
        <form className="wr-party-form" onSubmit={reviewResponses} noValidate>
          <div className="wr-guest-list-heading">
            <div>
              <h2>Your party</h2>
            </div>
            <span className="wr-guest-count">{guests.length} {guests.length === 1 ? 'invited guest' : 'invited guests'}</span>
          </div>

          {guests.map((guest) => {
            const key = String(guest.id);
            const response = responses[key];
            if (!response) return null;
            const guestName = `${guest.first_name} ${guest.last_name}`;
            const canBringPlusOne = Number(guest.max_guests) > 0;
            const hasPlusOne = response.plusOnes.length > 0;
            const plusOneTakenElsewhere = Boolean(plusOneOwnerId && plusOneOwnerId !== key);
            const complete = isGuestComplete(response);
            if (collapsed[key] && complete) {
              return (
                <article className="wr-guest-card wr-guest-card-collapsed" key={key}>
                  <div>
                    <h3>{guestName}</h3>
                    <span className="wr-guest-summary">
                      <span className="wr-guest-done-mark" aria-hidden="true">✓</span>
                      {summarise(response)}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="wr-link-button"
                    onClick={() => setCollapsed((prev) => ({ ...prev, [key]: false }))}
                  >
                    Edit
                  </button>
                </article>
              );
            }
            return (
              <article className="wr-guest-card" key={key}>
                <div className="wr-guest-card-heading">
                  <h3>{guestName}</h3>
                </div>
                <AttendanceChoice
                  name={`burger-${key}`}
                  label="Build-a-Burger dinner"
                  date="Friday, 22 January 2027"
                  value={response.burgerDinner}
                  onChange={(v) => updateGuest(key, 'burgerDinner', v)}
                />
                <AttendanceChoice
                  name={`wedding-${key}`}
                  label="Wedding celebration"
                  date="Saturday, 23 January 2027"
                  value={response.wedding}
                  onChange={(v) => updateGuest(key, 'wedding', v)}
                />
                {response.wedding === 'yes' && (
                  <MealSection
                    groupId={`guest-${key}`}
                    response={response}
                    onFieldChange={(field, value) => updateGuest(key, field, value)}
                  />
                )}
                {response.wedding === 'yes' && (
                  <div className="wr-song-field">
                    <label className="wr-input-label" htmlFor={`song-${key}`}>I promise to dance if you play… <span>(optional)</span></label>
                    <input
                      id={`song-${key}`}
                      className="wr-input"
                      type="text"
                      value={response.songRequest}
                      placeholder="Song title and artist"
                      onChange={(e) => updateGuest(key, 'songRequest', e.target.value)}
                    />
                  </div>
                )}

                {canBringPlusOne && (
                  <div className="wr-plus-ones">
                    <div className="wr-plus-header">
                      <div>
                        <h4>Your plus-one</h4>
                        <p>One additional guest per invitation.</p>
                      </div>
                      <button
                        type="button"
                        className={`wr-plus-toggle ${hasPlusOne ? 'wr-plus-remove' : ''}`}
                        onClick={() => togglePlusOne(guest)}
                        disabled={!hasPlusOne && plusOneTakenElsewhere}
                        aria-expanded={hasPlusOne}
                      >
                        {hasPlusOne ? 'Remove plus-one' : (plusOneTakenElsewhere ? 'Plus-one added' : '+ Add plus-one')}
                      </button>
                    </div>
                    {hasPlusOne && (
                      <div className="wr-plus-card">
                        <div className="wr-name-grid">
                          <div>
                            <label className="wr-input-label" htmlFor={`first-${key}`}>First name</label>
                            <input id={`first-${key}`} type="text" autoComplete="off" className="wr-input wr-name-input" value={response.plusOnes[0].firstName} onChange={(e) => updatePlusOne(key, 0, 'firstName', e.target.value)} />
                          </div>
                          <div>
                            <label className="wr-input-label" htmlFor={`last-${key}`}>Surname</label>
                            <input id={`last-${key}`} type="text" autoComplete="off" className="wr-input wr-name-input" value={response.plusOnes[0].lastName} onChange={(e) => updatePlusOne(key, 0, 'lastName', e.target.value)} />
                          </div>
                        </div>
                        <AttendanceChoice name={`plus-burger-${key}`} label="Build-a-Burger dinner" date="Friday, 22 January 2027" value={response.plusOnes[0].burgerDinner} onChange={(v) => updatePlusOne(key, 0, 'burgerDinner', v)} />
                        <AttendanceChoice name={`plus-wedding-${key}`} label="Wedding celebration" date="Saturday, 23 January 2027" value={response.plusOnes[0].wedding} onChange={(v) => updatePlusOne(key, 0, 'wedding', v)} />
                        {response.plusOnes[0].wedding === 'yes' && (
                          <MealSection
                            groupId={`plus-${key}`}
                            response={response.plusOnes[0]}
                            onFieldChange={(field, value) => updatePlusOne(key, 0, field, value)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}

                {complete && (
                  <div className="wr-done-row">
                    <button
                      type="button"
                      className="wr-done-button"
                      onClick={() => setCollapsed((prev) => ({ ...prev, [key]: true }))}
                    >
                      Done with {guest.first_name}
                    </button>
                  </div>
                )}
              </article>
            );
          })}

          {formError && <p className="wr-error wr-form-error" role="alert">{formError}</p>}
          <button className="wr-primary-button" type="submit">Review your RSVP</button>
          <p className="wr-fine-print">Review your choices before confirming. Your RSVP is not saved until you see a confirmation.</p>
        </form>
      )}

      {review && !saved && !party?.is_submitted && (
        <div id="wr-review" className="wr-review-card" aria-live="polite">
          <h2>Everything look right?</h2>
          {guests.map((guest) => {
            const response = responses[String(guest.id)];
            const people = [
              { label: `${guest.first_name} ${guest.last_name}`, ...response },
              ...response.plusOnes.map((p) => ({ label: `${p.firstName} ${p.lastName}`, ...p })),
            ];
            return people.map((person, i) => (
              <div className="wr-review-person" key={`${guest.id}-${i}`}>
                <strong>{person.label}</strong>
                <span>Burger dinner: {person.burgerDinner === 'yes' ? 'Attending' : 'Not attending'}</span>
                <span>Wedding: {person.wedding === 'yes' ? 'Attending' : 'Not attending'}</span>
                {person.wedding === 'yes' && <span>Menu: {person.starter} · {person.main} · {person.dessert}</span>}
              </div>
            ));
          })}
          <div className="wr-review-actions">
            <button className="wr-secondary-button" type="button" onClick={() => { setReview(false); setFormError(''); }}>Edit answers</button>
            {typeof onSubmitRSVP === 'function' ? (
              <button type="button" className="wr-primary-button" onClick={confirmSave} disabled={saving}>
                {saving ? 'Sending RSVP…' : 'Confirm & send RSVP'}
              </button>
            ) : (
              <p className="wr-integration-note"><strong>Preview only:</strong> these answers have not been sent or saved. Supabase submission still needs to be connected.</p>
            )}
          </div>
        </div>
      )}
      {saved && (
        <div id="wr-review" className="wr-review-card wr-success" role="status">
          <h2>We have your RSVP!</h2>
          <p>Thank you for letting us know. We look forward to celebrating with you.</p>
        </div>
      )}
    </section>
  );
}

export default RSVPForm;
