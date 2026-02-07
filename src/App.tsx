import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import Seo from "./seo/Seo";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Process from "./sections/Process";
import Performance from "./sections/Performance";
import Testimonials from "./sections/Testimonials";
import Faq from "./sections/Faq";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? "en";
  }, [i18n.resolvedLanguage]);

  return (
    <div className="bg-ink-50 text-ink-900 dark:bg-ink-900 dark:text-ink-100">
      <Seo />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Performance />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
