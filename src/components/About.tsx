import { leadership } from "../data/site";
import { Arrow, Img, Reveal } from "./primitives";

export function About() {
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
              The leadership came to Triple Double from development, from Wall
              Street compliance desks and from city planning departments —
              between them, careers spent buying, building and running thousands
              of residential units and millions of square feet of commercial
              space. That range is why the firm is comfortable with buildings
              other buyers find complicated.
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
          {leadership.map((p, i) => (
            <Reveal className="person" as="li" key={p.name} delay={i * 80}>
              <Img
                name={p.image}
                widths={[360, 520, 760]}
                sizes="(max-width: 560px) 44vw, (max-width: 1000px) 23vw, 290px"
                alt={`Portrait of ${p.name.replace(/[“”]/g, "")}, ${p.role} of Triple Double Real Estate.`}
                className="person__img"
              />
              <h3 className="person__name">{p.name}</h3>
              <p className="label person__role">{p.role}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
