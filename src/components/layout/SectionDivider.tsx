export default function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className="section-divider">
      <svg viewBox="0 0 1440 40" preserveAspectRatio="none">
        <path
          d={flip ? "M0,20 C360,40 720,0 1080,20 C1260,30 1380,15 1440,20 L1440,0 L0,0 Z" : "M0,20 C360,0 720,40 1080,20 C1260,10 1380,25 1440,20 L1440,40 L0,40 Z"}
          fill="currentColor"
          className="text-muted/30"
        />
      </svg>
    </div>
  )
}
