import { useTranslation } from "react-i18next";
import Container from "../components/Container";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

type FaqItem = {
  question: string;
  answer: string;
};

const Faq = () => {
  const { t } = useTranslation();
  const items = t("faq.items", { returnObjects: true }) as FaqItem[];

  return (
    <Section
      id="faq"
      className="bg-section-gradient dark:bg-[radial-gradient(100%_100%_at_0%_0%,rgba(80,75,64,0.25)_0%,rgba(23,21,17,1)_70%)]"
    >
      <Container className="space-y-12">
        <Reveal>
          <SectionHeading
            eyebrow={t("faq.eyebrow")}
            title={t("faq.title")}
          />
        </Reveal>
        <div className="grid gap-4">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.05}>
              <details className="group rounded-3xl border border-ink-100 bg-white/90 p-6 shadow-soft dark:border-ink-700 dark:bg-ink-800/70">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-ink-900 dark:text-ink-50">
                  {item.question}
                  <span className="ml-4 text-xs font-semibold uppercase tracking-[0.2em] text-ocean-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Faq;
