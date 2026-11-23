'use client';
import { useId, useState } from 'react';
import { askTargets, type AskIntent } from '../_sections/site-list';
import { Asset } from './asset';

const concernWords = /\b(report|concern|complain|complaint|grievance|harass\w*|bully\w*|abuse|threat\w*|unfair|anonymous\w*)\b/i;
const bookWords = /\b(book\w*|appointment\w*|consult\w*|meet\w*|schedul\w*|slot\w*|office hours?)\b/i;

/** Reads what was typed: concern words open a new report, booking words open consultations, the rest go to portal search. */
export const intentFor = (text: string): AskIntent => concernWords.test(text) ? 'concern' : bookWords.test(text) ? 'book' : 'other';

const chips: { intent: AskIntent; label: string; icon: string }[] = [
  { intent: 'concern', label: 'Report a concern', icon: 'chip-cases' },
  { intent: 'book', label: 'Book appointment', icon: 'chip-calendar' },
  { intent: 'concern', label: 'Anonymous', icon: 'chip-lock' },
];

/** The hero quick-start box. Every action leaves for the portal; nothing is stored or sent from this page. */
export function HeroAsk() {
  const [text, setText] = useState('');
  const id = useId();
  const go = (intent: AskIntent) => window.location.assign(askTargets[intent]);
  return <form className="ask hero-in" style={{ '--i': 4 } as React.CSSProperties} role="search" aria-label="Quick start" onSubmit={event => { event.preventDefault(); go(intentFor(text)); }}>
    <label className="sr-only" htmlFor={id}>Describe your concern, or ask where to find something</label>
    <input id={id} className="ask__input" type="text" enterKeyHint="send" autoComplete="off" placeholder="Describe your concern, or ask where to find something…" value={text} onChange={event => setText(event.target.value)} />
    <div className="ask__row">
      <button type="button" className="ask__plus" aria-label="Start a new report with files" onClick={() => go('concern')}><Asset name="icon-plus" width={14} /></button>
      {chips.map(chip => <button key={chip.label} type="button" className="ask__chip" onClick={() => go(chip.intent)}><Asset name={chip.icon} width={14} />{chip.label}</button>)}
      <button type="submit" className="ask__send" aria-label="Send"><Asset name="send-arrow" width={16} /></button>
    </div>
  </form>;
}
