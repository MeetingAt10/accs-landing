import { Asset } from './asset';

/** ACCS logo mark, drawn on its own with no tile, and wordmark. `lg` is the footer size from the Figma frame. */
export function Brand({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return <span className={`brand brand--${size}`}>
    {size === 'lg' ? <Asset name="logo-mark" width={50.2} height={32} /> : <Asset name="logo-mark" width={42.67} height={27.19} />}
    <span className="brand__text"><span className="brand__name">ACCS</span><span className="brand__sub">College of Computer Studies</span></span>
  </span>;
}
