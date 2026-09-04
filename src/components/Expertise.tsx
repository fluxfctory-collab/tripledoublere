import { useState } from "react";
import { expertise } from "../data/site";
import { Img, Reveal } from "./primitives";

export function Expertise() {
  const [active, setActive] = useState(0);

  return (
    <section className="section expertise" id="expertise" aria-labelledby="exp-h">
      <div className="container expertise__body">
        <Reveal className="expertise__aside">
          <p className="eyebrow eyebrow--dark">02 — Expertise</p>
          <h2 id="exp-h" className="h2 expertise__title">
            Three disciplines.
            {" "}
            <br />
            One integrated strategy.
          </h2>
          <p className="lead expertise__lead">
            Nothing here is outsourced, so nothing here is guesswork. What the
            leasing desk learns, the acquisitions team prices.
          </p>

          {/* Photography follows the row being read — decorative only. */}
          <div className="expertise__stage" aria-hidden="true">
            {expertise.map((e, i) => (
              <div
                key={e.id}
                className={`expertise__shot ${i === active ? "is-on" : ""}`}
              >
                <Img
                  name={e.image}
                  widths={[380, 560, 800]}
                  sizes="(max-width: 1000px) 1px, 400px"
                  alt=""
                />
              </div>
            ))}
            <span className="mono expertise__stage-cap">
              {expertise[active].tags[0]}
            </span>
          </div>
        </Reveal>

        <ul className="expertise__list">
          {expertise.map((e, i) => (
            <li
              key={e.id}
              className={`exp ${i === active ? "is-active" : ""}`}
              onMouseEnter={() => setActive(i)}
            >
              <div className="exp__bar">
                <span className="mono exp__idx">{e.index}</span>
                <h3 className="h3 exp__title">{e.title}</h3>
              </div>
              <div className="exp__text">
                <p className="exp__summary">{e.summary}</p>
                <p className="exp__detail">{e.detail}</p>
                <ul className="exp__tags">
                  {e.tags.map((t) => (
                    <li className="label" key={t}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
