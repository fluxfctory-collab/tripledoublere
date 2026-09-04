import { contact, nav } from "../data/site";
import { Arrow, Reveal } from "./primitives";

export function Closing() {
  return (
    <section className="closing" id="contact" aria-labelledby="cl-h">
      <div className="container closing__inner">
        <Reveal className="closing__main">
          <p className="eyebrow eyebrow--dark">06 — Contact</p>
          <h2 id="cl-h" className="display closing__title">
            Let&rsquo;s create enduring
            {" "}
            <br />
            value together.
          </h2>
          <p className="lead closing__lead">
            Bring us an acquisition, a vacancy problem, or a building nobody
            else wants to underwrite.
          </p>
          <div className="closing__actions">
            <a className="btn btn--light" href={contact.emailHref}>
              Start a conversation
              <Arrow />
            </a>
            <a className="link-arrow link-arrow--light" href={contact.phoneHref}>
              {contact.phone}
            </a>
          </div>
        </Reveal>

        <Reveal className="closing__card" delay={100}>
          <p className="mono closing__card-k">Headquarters</p>
          <address className="closing__addr">
            {contact.addressLines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <p className="mono closing__card-k">Enquiries</p>
          <a className="closing__mail" href={contact.emailHref}>
            {contact.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot__top">
          <a className="foot__brand" href="#top" aria-label="Triple Double Real Estate — back to top">
            <img src="/img/logo-white.png" width="520" height="260" alt="" />
            <span className="sr-only">Triple Double Real Estate</span>
          </a>

          <div className="foot__cols">
            <div className="foot__col">
              <h2 className="label foot__k">Navigate</h2>
              <ul>
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href}>{n.label}</a>
                  </li>
                ))}
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>

            <div className="foot__col">
              <h2 className="label foot__k">Contact</h2>
              <ul>
                <li>
                  <a href={contact.emailHref}>{contact.email}</a>
                </li>
                <li>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </li>
              </ul>
            </div>

            <div className="foot__col">
              <h2 className="label foot__k">Headquarters</h2>
              <address>
                {contact.addressLines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
            </div>
          </div>
        </div>

        <div className="foot__bottom">
          <p>
            © {new Date().getFullYear()} Triple Double Real Estate. All rights
            reserved.
          </p>
          <ul className="foot__legal">
            <li>
              <a href="https://tripledoublere.com/terms/">Terms of use</a>
            </li>
            <li>
              <a href="https://tripledoublere.com/privacy-policy/">Privacy policy</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
