/** A downloaded Figma asset from public/landing, drawn at its native size as a decorative background. */
export function Asset({ name, width, height = width, className }: { name: string; width: number; height?: number; className?: string }) {
  return <span aria-hidden="true" className={className ? `asset ${className}` : 'asset'} style={{ width, height, backgroundImage: `url(/landing/${name})` }} />;
}
