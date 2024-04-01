import { About } from "./components/About";
import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { Sponsors } from "./components/Sponsors";
import "./styles/LandingPage.css";

function Landingpage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Sponsors />
      <About />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Landingpage;
