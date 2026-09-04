import { approach } from "../data/site";
import { Reveal } from "./primitives";

export function Approach() {
  return (
    <section className="section approach" id="approach" aria-labelledby="ap-h">
      <div className="approach__bg" aria-hidden="true" />
      <div className="container approach__inner">
        <Reveal className="approach__head">
          <p className="eyebrow eyebrow--dark">04 — Value creation</p>
          <h2 id="ap-h" className="h2 approach__title">
            A repeatable sequence,
            {" "}
            <br />
            applied one building at a time.
          </h2>
        </Reveal>

        <ol className="steps">
          {approach.map((s, i) => (
            <Reveal className="step" as="li" key={s.step} delay={i * 80}>
              <span className="step__tick" aria-hidden="true" />
              <span className="mono step__num">{s.step}</span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__body">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
