import { useTranslation } from "react-i18next";
import Container from "../components/Container";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const Testimonials = () => {
  const { t } = useTranslation();
  const items = t("testimonials.items", {
    returnObjects: true,
  }) as Testimonial[];

  return (
    <Section id="testimonials">
      <Container className="space-y-12">
        <Reveal>
          <SectionHeading
            eyebrow={t("testimonials.eyebrow")}
            title={t("testimonials.title")}
            align="left"
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.1}>
              <div className="flex h-full flex-col justify-between rounded-3xl border border-ink-100 bg-white/90 p-8 shadow-soft dark:border-ink-700 dark:bg-ink-800/70">
                <p className="text-sm leading-relaxed text-ink-700 dark:text-ink-300">
                  “{item.quote}”
                </p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">
                    {item.name}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
                    {item.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Testimonials;
