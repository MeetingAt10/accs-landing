import { Asset } from './asset';

/** The ACCS wordmark from the frame: "A", the key glyph standing in for "CC", then "S". Sized by font-size. */
export function Wordmark({ className }: { className?: string }) {
  return <span role="img" aria-label="ACCS" className={className ? `wordmark ${className}` : 'wordmark'}>
    <span aria-hidden="true" className="wordmark__a">A</span>
    <span aria-hidden="true" className="wordmark__glyph" />
    <span aria-hidden="true" className="wordmark__s">S</span>
  </span>;
}

/** The square logo mark used in the navbar. */
export function LogoMark() {
  return <span className="logo-mark"><Asset name="logo-mark.svg" width={42.671} height={27.186} /></span>;
}
