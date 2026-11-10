type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const Arrow = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Phone = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
  </svg>
);

export const Pin = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);

export const Clock = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const Plus = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Facebook = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
  </svg>
);

export const Youtube = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
  </svg>
);

/* The lotus from the Nufărul logo, redrawn as a single-weight line mark.
   Every path has pathLength=1 so `.draw` can trace it as it scrolls in. */
export const Lotus = ({ className, animate = false }: P & { animate?: boolean }) => (
  <svg viewBox="0 0 120 84" className={`${className ?? ""} ${animate ? "draw" : ""}`} {...base} strokeWidth={1.2}>
    <path pathLength={1} d="M60 6c10 13 12 32 0 50C48 38 50 19 60 6Z" />
    <path pathLength={1} d="M60 56c-6-13-18-23-34-26 1 14 14 25 34 26Z" style={{ ["--o" as string]: "8%" }} />
    <path pathLength={1} d="M60 56c6-13 18-23 34-26-1 14-14 25-34 26Z" style={{ ["--o" as string]: "8%" }} />
    <path pathLength={1} d="M60 60c-17 0-37-6-50-17 11 15 29 22 50 22" style={{ ["--o" as string]: "16%" }} />
    <path pathLength={1} d="M60 60c17 0 37-6 50-17-11 15-29 22-50 22" style={{ ["--o" as string]: "16%" }} />
    <path pathLength={1} d="M22 74h76" style={{ ["--o" as string]: "24%" }} />
    <path pathLength={1} d="M38 80h44" style={{ ["--o" as string]: "28%" }} />
  </svg>
);

export const Download = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 4v11m-4.5-4.5L12 15l4.5-4.5M5 19.5h14" />
  </svg>
);
