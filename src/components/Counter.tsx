"use client";

import { useEffect, useRef, useState } from "react";

/* Counts up to `to` the first time it scrolls into view. Server HTML and the
   first client render both show the final number, so hydration always
   matches; the count-up starts only after mount. */
export default function Counter({ to, from = 0 }: { to: number; from?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1800);
          setValue(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 4))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, from]);

  return <span ref={ref}>{value}</span>;
}
