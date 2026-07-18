import { Reveal } from './Reveal'

interface SectionHeaderProps {
  index: string
  label: string
}

/** "// 03 FREELANCE EXPERIENCE ————" section eyebrow */
export function SectionHeader({ index, label }: SectionHeaderProps) {
  return (
    <Reveal y={20}>
      <div className="flex items-center gap-4">
        <span className="mono-label text-cyan">{`// ${index}`}</span>
        <span className="mono-label text-muted">{label}</span>
        <div className="h-px w-[140px] bg-line sm:w-[200px]" />
      </div>
    </Reveal>
  )
}
