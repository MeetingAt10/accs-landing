import { Asset } from './asset';

/** ACCS logo mark and wordmark. `lg` is the footer size from the Figma frame. */
export function Brand({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return <span className={`brand brand--${size}`}>
    <span className="brand__mark">{size === 'lg' ? <Asset name="footer-logo-glyph" width={24.8} /> : <Asset name="logo-glyph" width={21.08} />}</span>
    <span className="brand__text"><span className="brand__name">ACCS</span><span className="brand__sub">College of Computer Studies</span></span>
  </span>;
}
