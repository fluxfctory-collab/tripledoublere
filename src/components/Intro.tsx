import { stats } from "../data/site";
import { Arrow, Reveal } from "./primitives";

/** The four specialisms the firm staffs dedicated teams for. */
const divisions = [
  "Urban assets",
  "Medical office",
  "Workforce housing",
  "Adaptive re-use",
];

export function Intro() {
  return (
    <section className="section intro" id="intro" aria-labelledby="intro-h">
      <div className="container intro__grid">
        <Reveal className="intro__head">
          <p className="eyebrow">01 — The firm</p>
          <h2 id="intro-h" className="display intro__title">
            One team owns the
            {" "}
            <br />
            asset, the operation
            {" "}
            <br />
            and the outcome.
          </h2>

          <ul className="divisions">
            {divisions.map((d) => (
              <li key={d}>
                <span className="label">{d}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="intro__copy" delay={90}>
          <p className="lead">
            Most owners hire the acquisition, the leasing, the construction and
            the management separately, then spend the next decade reconciling
            four sets of incentives. Triple Double holds all four under one roof
            and one balance sheet.
          </p>
          <p className="lead">
            The structure is the strategy. Underwriting is done by the people who
            will answer for the building afterwards; a decision about a floor
            plate reaches a contractor the same week. From Deerfield Beach, the
            firm applies that model to commercial and residential assets in four
            states.
          </p>
          <a className="link-arrow intro__link" href="#expertise">
            How we work
            <Arrow />
          </a>
        </Reveal>
      </div>

      <div className="container">
        <Reveal className="stats" as="ul" delay={60}>
          {stats.map((s, i) => (
            <li className="stat" key={s.label}>
              <span className="mono stat__idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="stat__fig">
                {s.figure}
                <em>{s.suffix}</em>
              </span>
              <span className="stat__label">{s.label}</span>
              <span className="stat__note">{s.note}</span>
            </li>
          ))}
        </Reveal>
        <p className="stats__foot">
          Figures reflect Triple Double Real Estate's own published platform
          scope, not individual career totals.
        </p>
      </div>
    </section>
  );
}
