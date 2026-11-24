/**
 * Decorative mascots with the hover states of the frame's Lion Mascot and Hi components.
 * The lion waves, then says "Hi!"; the cub tilts and says "Hi!". Hover, or focus inside the
 * surrounding section, triggers them; they carry no text and are hidden from assistive technology.
 */
export function Lion({ className }: { className?: string }) {
  return <span aria-hidden="true" className={`mascot lion ${className ?? ''}`}>
    <span className="mascot__layer lion__rest" />
    <span className="mascot__layer lion__wave" />
    <span className="mascot__layer lion__hi" />
  </span>;
}

export function Cub({ className }: { className?: string }) {
  return <span aria-hidden="true" className={`mascot cub ${className ?? ''}`}>
    <span className="mascot__layer cub__body" />
    <span className="cub__bubble">Hi!</span>
  </span>;
}
