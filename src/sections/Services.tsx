import { useTranslation } from "react-i18next";
import Container from "../components/Container";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

type Service = {
  title: string;
  description: string;
  points: string[];
};

const Services = () => {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }) as Service[];

  return (
    <Section
      id="services"
      className="bg-section-gradient dark:bg-[radial-gradient(100%_100%_at_0%_0%,rgba(80,75,64,0.25)_0%,rgba(23,21,17,1)_70%)]"
    >
      <Container className="space-y-12">
        <Reveal>
          <SectionHeading
            eyebrow={t("services.eyebrow")}
            title={t("services.title")}
            description={t("services.description")}
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1}>
              <div className="flex h-full flex-col gap-6 rounded-3xl border border-ink-100 bg-white/90 p-8 shadow-soft dark:border-ink-700 dark:bg-ink-800/70">
                <div>
                  <h3 className="text-xl font-semibold text-ink-900 dark:text-ink-50">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                    {item.description}
                  </p>
                </div>
                <ul className="space-y-3 text-sm text-ink-700 dark:text-ink-300">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-ocean-500 dark:bg-ocean-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Services;
