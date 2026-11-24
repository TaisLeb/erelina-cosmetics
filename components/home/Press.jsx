"use client";

import { useReveal } from "../useReveal";

const LOGOS = [
  { src: "/assets/logo-womenshealth.png", alt: "Women's Health", h: 40, blend: true },
  { src: "/assets/logo-elle.png", alt: "Elle", h: 34, blend: true },
  { src: "/assets/logo-oprah.png", alt: "The Oprah Magazine", h: 46 },
];

export default function Press() {
  const scope = useReveal();
  return (
    <section className="press" ref={scope}>
      <div className="container">
        <p className="eyebrow press__eyebrow" data-reveal>As featured in</p>
        <div className="press__row">
          {LOGOS.map((l, i) => (
            <img
              key={l.alt}
              src={l.src}
              alt={l.alt}
              className={l.blend ? "press__logo--blend" : undefined}
              style={{ height: l.h }}
              data-reveal
              data-reveal-order={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
