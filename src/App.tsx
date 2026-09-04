import { About } from "./components/About";
import { Approach } from "./components/Approach";
import { Closing, Footer } from "./components/Closing";
import { Expertise } from "./components/Expertise";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { Portfolio } from "./components/Portfolio";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Intro />
        <Expertise />
        <Portfolio />
        <Approach />
        <About />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
