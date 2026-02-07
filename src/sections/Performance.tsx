import { useTranslation } from "react-i18next";
import Container from "../components/Container";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

type Metric = {
    label: string;
    value: string;
};

const Performance = () => {
    const { t } = useTranslation();
    const metrics = t("performance.metrics", {
        returnObjects: true,
    }) as Metric[];
    const benefits = t("performance.benefits", {
        returnObjects: true,
    }) as string[];

    return (
        <Section
            id="performance"
            className="bg-section-gradient dark:bg-[radial-gradient(100%_100%_at_0%_0%,rgba(80,75,64,0.25)_0%,rgba(23,21,17,1)_70%)]"
        >
            <Container className="space-y-12">
                <Reveal>
                    <SectionHeading
                        eyebrow={t("performance.eyebrow")}
                        title={t("performance.title")}
                        description={t("performance.description")}
                    />
                </Reveal>
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="grid items-stretch gap-6 sm:grid-cols-3">
                        {metrics.map((metric, index) => (
                            <Reveal
                                key={metric.label}
                                delay={index * 0.1}
                                className="h-full"
                            >
                                <div className="h-3/4 rounded-3xl border border-ink-100 bg-white/90 p-6 shadow-soft dark:border-ink-700 dark:bg-ink-800/70">
                                    <p className="text-2xl font-semibold text-ink-900 dark:text-ink-50">
                                        {metric.value}
                                    </p>
                                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
                                        {metric.label}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal>
                        <div className="rounded-3xl border border-ink-100 bg-white/90 p-8 shadow-soft dark:border-ink-700 dark:bg-ink-800/70">
                            <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-50">
                                {t("performance.benefitsTitle")}
                            </h3>
                            <ul className="mt-4 space-y-3 text-sm text-ink-700 dark:text-ink-300">
                                {benefits.map((benefit) => (
                                    <li key={benefit} className="flex gap-3">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-gold-500 dark:bg-gold-300" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </Section>
    );
};

export default Performance;
