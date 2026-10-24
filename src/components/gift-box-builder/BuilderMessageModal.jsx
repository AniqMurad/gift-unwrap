import { useId, useRef, useState } from "react";
import { Title } from "@radix-ui/react-dialog";
import BuilderModal from "./BuilderModal";
import { CARD_MESSAGE_LIMIT, normalizeCardDetails, validateCardDetails } from "./builder-card-state";

export default function BuilderMessageModal({ card, savedDetails, onSave, onClose, returnFocus }) {
  const [draft, setDraft] = useState(() => ({ ...savedDetails }));
  const [errors, setErrors] = useState({});
  const committed = useRef(false);
  const id = useId();
  const update = (field, value) => { setDraft(previous => ({ ...previous, [field]: value })); setErrors(previous => ({ ...previous, [field]: undefined })); };
  const save = event => {
    event.preventDefault();
    if (committed.current) return;
    const nextErrors = validateCardDetails(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    committed.current = true;
    onSave(card, normalizeCardDetails(draft));
  };
  return <BuilderModal className="gu-builder-message-modal" labelledBy={`${id}-title`} onClose={onClose} returnFocus={returnFocus}>
    <Title id={`${id}-title`} className="gu-builder-message-title">Message</Title>
    <form noValidate onSubmit={save}>
      <label className="gu-builder-blank-card"><input type="checkbox" checked={draft.blank} onChange={event => { update("blank", event.target.checked); setErrors({}); }} /><span>Leave Card Blank</span></label>
      <fieldset disabled={draft.blank} className="gu-builder-message-fields">
        <legend className="sr-only">Personalize {card.name}</legend>
        {[['to', 'To'], ['from', 'From']].map(([field, label]) => <div className="gu-builder-message-field" key={field}>
          <label htmlFor={`${id}-${field}`}>{label}<span aria-hidden="true">*</span></label>
          <input id={`${id}-${field}`} value={draft[field]} required={!draft.blank} maxLength={100} onChange={event => update(field, event.target.value)} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${id}-${field}-error` : undefined} />
          {errors[field] && <p id={`${id}-${field}-error`} className="gu-builder-modal-error" role="alert">{errors[field]}</p>}
        </div>)}
        <div className="gu-builder-message-field">
          <label htmlFor={`${id}-message`}>Message<span aria-hidden="true">*</span></label>
          <div className="gu-builder-message-textarea">
            <textarea id={`${id}-message`} value={draft.message} maxLength={CARD_MESSAGE_LIMIT} required={!draft.blank} onChange={event => update("message", event.target.value.slice(0, CARD_MESSAGE_LIMIT))} aria-invalid={Boolean(errors.message)} aria-describedby={`${id}-count${errors.message ? ` ${id}-message-error` : ""}`} />
            <span id={`${id}-count`} aria-live="polite">{draft.message.length}/{CARD_MESSAGE_LIMIT}</span>
          </div>
          {errors.message && <p id={`${id}-message-error`} className="gu-builder-modal-error" role="alert">{errors.message}</p>}
        </div>
      </fieldset>
      <button type="submit" className="gu-builder-modal-primary">Save Message</button>
    </form>
  </BuilderModal>;
}
