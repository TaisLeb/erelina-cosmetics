"use client";

import { useReveal } from "../useReveal";

const CARDS = [
  {
    key: "cleanse",
    label: "Cleanse",
    video: "/videos/cleanse.mp4",
    alt: "Model cleansing her face behind wet glass",
    pos: "50% 30%",
    badge: "badge--sage",
    parallax: -9,
  },
  {
    key: "nourish",
    label: "Nourish",
    video: "/videos/nourish.mp4",
    alt: "Model applying nourishing lotion to her face",
    pos: "50% 30%",
    badge: "badge--peach",
    parallax: -15,
  },
  {
    key: "brighten",
    label: "Brighten",
    video: "/videos/brighten.mp4",
    alt: "Model pressing brightening serum into her skin",
    pos: "50% 40%",
    badge: "badge--cream",
    parallax: -6,
  },
];

export default function Ritual() {
  const scope = useReveal();

  return (
    <section className="ritual" ref={scope}>
      <div className="container">
        <div className="ritual__head">
          <p className="eyebrow" data-reveal>The Daily Ritual</p>
          <h2 className="ritual__title serif" data-reveal data-reveal-order="1">
            Three steps to skin that <em className="script">glows</em>
          </h2>
        </div>

        <div className="ritual__grid" data-parallax-scope>
          {CARDS.map((c, i) => (
            <article
              className={`ritual__card ${i === 1 ? "is-tall" : ""}`}
              key={c.key}
              data-cursor="hover"
              data-parallax={c.parallax}
            >
              <div className="ritual__media">
                <video
                  data-reveal="img"
                  src={c.video}
                  aria-label={c.alt}
                  style={{ objectPosition: c.pos }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
              <span className={`ritual__badge ${c.badge} script`}>{c.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
