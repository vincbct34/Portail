export function PortalLogo() {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/14 bg-white/8 shadow-[0_16px_24px_-18px_rgba(0,0,0,0.9)]">
        <svg viewBox="0 0 64 64" aria-hidden="true" className="h-7 w-7" fill="none">
          <rect width="64" height="64" rx="18" fill="#121018" />
          <text
            x="16"
            y="43"
            fill="#F8F3EA"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="30"
            fontWeight="700"
            letterSpacing="-2"
          >
            V
          </text>
          <text
            x="33"
            y="43"
            fill="#DD5A2F"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="30"
            fontWeight="700"
            letterSpacing="-2"
          >
            B
          </text>
        </svg>
      </div>

      <div className="leading-none">
        <p className="font-display text-[0.78rem] uppercase tracking-[0.3em] text-white/56">
          Portail
        </p>
        <p className="mt-1 font-display text-sm text-white/92">
          vincent.bichat.fr
        </p>
      </div>
    </div>
  );
}