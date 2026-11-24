"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "It all started at a small farm in Tahoe, California. Luscious soil and abundant sunshine helped the Richardson family press their organic juices and elixirs for over thirty years. The idea of organic cosmetics was the next step forward.";

const SPIRAL_PATH = Array.from({ length: 180 }, (_, i) => {
  const progress = i / 179;
  const angle = progress * Math.PI * 7;
  const radius = 10 + progress * 510;
  const x = 600 + Math.cos(angle) * radius;
  const y = 400 + Math.sin(angle) * radius * 0.62;
  return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
}).join(" ");

export default function Story() {
  const root = useRef(null);
  const spiral = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".story__w");
      const spiralPath = spiral.current;
      const spiralLength = spiralPath?.getTotalLength() || 0;

      if (spiralPath) {
        gsap.set(spiralPath, {
          strokeDasharray: spiralLength,
          strokeDashoffset: reduce ? 0 : spiralLength,
        });
      }

      if (reduce) {
        gsap.set(words, { opacity: 1 });
        return;
      }

      const stagger = 0.025;
      const wordDuration = 0.5;
      const revealDuration = wordDuration + Math.max(0, words.length - 1) * stagger;
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: ".story__copy", start: "top 75%", end: "bottom 70%", scrub: 1 },
      });

      timeline
        .fromTo(words, { opacity: 0.16 }, {
          opacity: 1,
          duration: wordDuration,
          stagger,
          ease: "none",
        }, 0)
        .to(spiralPath, {
          strokeDashoffset: 0,
          duration: revealDuration,
          ease: "none",
        }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="story" id="story" ref={root}>
      <svg
        className="story__spiral"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          ref={spiral}
          d={SPIRAL_PATH}
          stroke="var(--gold)"
          strokeWidth="1.4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="container">
        <p className="eyebrow story__eyebrow">Our Roots</p>
        <p className="story__copy serif">
          {TEXT.split(" ").map((w, i) => (
            <span key={i}>
              <span className="story__w">{w}</span>{" "}
            </span>
          ))}
        </p>
        <a href="/product/orange-sunset" className="btn btn--ghost story__btn" data-cursor="hover">
          Read Their Story
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
