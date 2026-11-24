"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function OrganicLuxury() {
  const root = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      const section = root.current;
      const lines = gsap.utils.toArray(".ol__line");
      const wipes = gsap.utils.toArray(".ol__wipe");
      const measure = () => {
        const sectionRect = section.getBoundingClientRect();
        lines.forEach((line, index) => {
          const rect = line.querySelector(".ol__line-text").getBoundingClientRect();
          const inset = rect.height * 0.3;
          const left = rect.left - sectionRect.left + inset;
          const right = rect.right - sectionRect.left - inset;
          const middle = rect.top - sectionRect.top + rect.height * 0.8;
          const start = left;
          const end = right;
          const span = end - start;
          const tilt = rect.height * 0.25;
          const arch = rect.height * (index === 1 ? 0.5 : 0.7);
          gsap.set(wipes[index], { attr: {
            d: `M ${start} ${middle + tilt} C ${start + span * 0.25} ${middle - arch + tilt}, ${start + span * 0.7} ${middle - arch - tilt}, ${end} ${middle - tilt}`,
            "stroke-width": rect.height * 2.1,
          } });
        });
      };
      measure();
      section.classList.add("ol--glass-ready");
      gsap.set(wipes, { opacity: 0, attr: { "stroke-dashoffset": 1 } });
      const wipeTimeline = gsap.timeline({
        scrollTrigger: { trigger: ".ol__title", start: "top 85%", end: "bottom 48%", scrub: 1, invalidateOnRefresh: true, onRefreshInit: measure },
      });
      wipes.forEach((wipe, index) => {
        wipeTimeline.set(wipe, { opacity: 1 }, index);
        wipeTimeline.to(wipe, { attr: { "stroke-dashoffset": 0 }, duration: 1, ease: "power1.inOut" }, index);
      });
      const observer = new ResizeObserver(() => ScrollTrigger.refresh());
      observer.observe(section);
      return () => { observer.disconnect(); section.classList.remove("ol--glass-ready"); };
    }, root);
    return () => ctx.revert();
  }, []);

  const lines = [
    <>Organic <em className="script">Luxury</em></>,
    <>That Feeds Your Skin</>,
    <>With Every Drop</>,
  ];

  return (
    <section className="ol" ref={root}>
      <div className="ol__bg" aria-hidden="true" />
      <div className="ol__grain" aria-hidden="true" />

      <div className="container ol__inner">
        <p className="eyebrow ol__eyebrow">Every Drop</p>
        <h2 className="ol__title">
          {lines.map((line, i) => (
            <span className="ol__line" key={i}>
              <span className="ol__line-text">{line}</span>{" "}
            </span>
          ))}
        </h2>
      </div>

      <svg className="ol__glass" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <filter id="organic-wipe-feather" filterUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <mask id="organic-glass-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            <rect width="100%" height="100%" fill="white" />
            {lines.map((_, i) => <path className="ol__wipe" key={i} pathLength="1" fill="none" stroke="black" strokeLinecap="round" strokeDasharray="1 2" strokeDashoffset="1" opacity="0" filter="url(#organic-wipe-feather)" />)}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="#e5d3c0" fillOpacity="0.88" mask="url(#organic-glass-mask)" />
      </svg>
    </section>
  );
}
