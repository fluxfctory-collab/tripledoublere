import { featured, projects } from "../data/site";
import { Arrow, Img, Reveal } from "./primitives";

export function Portfolio() {
  return (
    <section className="section portfolio" id="portfolio" aria-labelledby="pf-h">
      <div className="container">
        <Reveal className="portfolio__head">
          <div>
            <p className="eyebrow">03 — Portfolio</p>
            <h2 id="pf-h" className="h2 portfolio__title">
              Buildings we own,
              {" "}
              <br />
              operate and answer for.
            </h2>
          </div>
          <a
            className="link-arrow portfolio__all"
            href="https://tripledoublere.com/portfolio/"
            rel="noreferrer"
          >
            Explore full portfolio
            <Arrow />
          </a>
        </Reveal>

        {/* Featured asset — asymmetric: portrait image against a data plate. */}
        <Reveal className="feat" as="article">
          <div className="feat__media">
            <Img
              name={featured.image}
              widths={[560, 800, 1120]}
              sizes="(max-width: 900px) 92vw, (max-width: 1400px) 34vw, 470px"
              alt={featured.alt}
              className="feat__img"
            />
            <span className="label feat__badge">Featured asset</span>
          </div>

          <div className="feat__panel">
            <p className="mono feat__loc">{featured.location}</p>
            <h3 className="display feat__name">{featured.name}</h3>
            <p className="lead feat__blurb">{featured.blurb}</p>
            <dl className="feat__facts">
              {featured.facts.map((f) => (
                <div key={f.k}>
                  <dt className="mono">{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mono feat__tag">
              {featured.type} · {featured.year}
            </p>
          </div>
        </Reveal>

        <ul className="cards">
          {projects.map((p, i) => (
            <Reveal className="card" as="li" key={p.name} delay={i * 90}>
              <div className="card__media">
                <Img
                  name={p.image}
                  widths={[560, 800, 1050]}
                  sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 29vw"
                  alt={p.alt}
                  className="card__img"
                />
              </div>
              <p className="mono card__loc">{p.location}</p>
              <h3 className="h3 card__name">{p.name}</h3>
              <p className="card__fact">{p.fact}</p>
              <p className="label card__type">{p.type}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
