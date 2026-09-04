import { useState } from "react";
import { leadership } from "../data/site";
import { Arrow, Img, Reveal } from "./primitives";

export function About() {
  // Pointer devices reveal the bio on hover; touch and keyboard toggle this.
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section about" id="about" aria-labelledby="ab-h">
      <div className="container">
        <div className="about__grid">
          <Reveal className="about__head">
            <p className="eyebrow">05 — About</p>
            <h2 id="ab-h" className="h2 about__title">
              Operations shape
              {" "}
              <br />
              every investment.
            </h2>
            <p className="about__note">
              Headquartered in Deerfield Beach, Florida, with assets and
              management operations across four states.
            </p>
          </Reveal>

          <Reveal className="about__copy" delay={80}>
            <p className="lead">
              Leadership drawn from development, Wall Street compliance and city
              planning — careers spent buying, building and running thousands of
              residential units and millions of square feet of commercial space.
              It is why complicated buildings are the ones we look for.
            </p>
            <a
              className="link-arrow"
              href="https://tripledoublere.com/"
              rel="noreferrer"
            >
              Meet our leadership
              <Arrow />
            </a>
          </Reveal>
        </div>

        <ul className="about__people">
          {leadership.map((p, i) => {
            const bioId = `bio-${p.image}`;
            const isOpen = open === i;
            return (
              <Reveal
                className={`person ${isOpen ? "is-open" : ""}`}
                as="li"
                key={p.name}
                delay={(i % 3) * 70}
              >
                <button
                  type="button"
                  className="person__btn"
                  aria-expanded={isOpen}
                  aria-controls={bioId}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="person__frame">
                    <Img
                      name={p.image}
                      widths={[360, 520, 760, 1000]}
                      sizes="(max-width: 560px) 88vw, (max-width: 1000px) 44vw, 400px"
                      alt={`Portrait of ${p.name.replace(/[“”]/g, "")}, ${p.role} of Triple Double Real Estate.`}
                      className="person__img"
                    />
                    <span className="person__bio" id={bioId}>
                      <span className="person__bio-text">{p.bio}</span>
                      <span className="label person__cue">
                        {isOpen ? "Close" : "Read bio"}
                      </span>
                    </span>
                  </span>
                  <span className="person__meta">
                    <span className="person__name">{p.name}</span>
                    <span className="label person__role">{p.role}</span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
