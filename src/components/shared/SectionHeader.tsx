import { Reveal } from './Reveal'

interface SectionHeaderProps {
  index: string
  label: string
  /** inverted (cream) sections need the dark ink treatment */
  tone?: 'dark' | 'paper'
}

/** "01 / ABOUT ————" section eyebrow */
export function SectionHeader({ index, label, tone = 'dark' }: SectionHeaderProps) {
  const paper = tone === 'paper'
  return (
    <Reveal y={16}>
      <div className="flex items-center gap-3">
        <span className={`mono-label ${paper ? 'text-paper-accent' : 'text-accent'}`}>{index}</span>
        <span className={`mono-label ${paper ? 'text-paper-muted' : 'text-faint'}`}>/</span>
        <span className={`mono-label ${paper ? 'text-paper-muted' : 'text-muted'}`}>{label}</span>
        <div className={`h-px flex-1 ${paper ? 'bg-paper-line' : 'bg-line'}`} />
      </div>
    </Reveal>
  )
}
