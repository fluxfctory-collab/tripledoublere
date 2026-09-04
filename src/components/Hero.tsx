import { Arrow } from "./primitives";

const rail = [
  { k: "Established platform", v: "20+ years" },
  { k: "Under management", v: "1M+ SF" },
  { k: "Markets", v: "FL · GA · AL · TX" },
];

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__media">
        {/* A taller crop of the same building carries the phone layout. */}
        <picture>
          <source
            media="(max-width: 700px)"
            type="image/webp"
            srcSet="/img/hero-portrait-560.webp 560w, /img/hero-portrait-760.webp 760w, /img/hero-portrait-1050.webp 1050w"
            sizes="100vw"
          />
          <source
            media="(max-width: 700px)"
            srcSet="/img/hero-portrait-560.jpg 560w, /img/hero-portrait-760.jpg 760w, /img/hero-portrait-1050.jpg 1050w"
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet="/img/hero-1024.webp 1024w, /img/hero-1440.webp 1440w, /img/hero-1920.webp 1920w"
            sizes="100vw"
          />
          <img
            src="/img/hero-1440.jpg"
            srcSet="/img/hero-1024.jpg 1024w, /img/hero-1440.jpg 1440w, /img/hero-1920.jpg 1920w"
            sizes="100vw"
            alt="2151 West Hillsboro Boulevard, a four-storey banded office building owned and managed by Triple Double Real Estate in Deerfield Beach, Florida."
            className="hero__img"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="hero__body container">
        <p className="mono hero__eyebrow">Invest. Transform. Operate.</p>
        <h1 className="display hero__title">
          Creating value where
          {" "}
          <br />
          others see complexity.
        </h1>
        <p className="hero__lead">
          A South Florida investment firm that acquires under-performing
          commercial and residential buildings, repositions them, and then stays
          on as the operator.
        </p>
        <div className="hero__actions">
          <a className="btn btn--light" href="#portfolio">
            Explore our portfolio
            <Arrow />
          </a>
          <a className="btn btn--ghost-light" href="#expertise">
            Discover our expertise
            <Arrow />
          </a>
        </div>
      </div>

      <div className="hero__rail">
        <div className="container hero__rail-inner">
          <ul className="hero__rail-list">
            {rail.map((r) => (
              <li key={r.k}>
                <span className="mono hero__rail-k">{r.k}</span>
                <span className="hero__rail-v">{r.v}</span>
              </li>
            ))}
          </ul>
          <p className="mono hero__loc">26°19′N 80°06′W — Deerfield Beach, FL</p>
        </div>
      </div>
    </section>
  );
}
