import { useTranslation } from "react-i18next";
import Container from "../components/Container";
import Section from "../components/Section";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";

type Step = {
    title: string;
    description: string;
};

const Process = () => {
    const { t } = useTranslation();
    const steps = t("process.steps", { returnObjects: true }) as Step[];

    return (
        <Section id="process">
            <Container className="space-y-12">
                <Reveal>
                    <SectionHeading
                        eyebrow={t("process.eyebrow")}
                        title={t("process.title")}
                        description={t("process.description")}
                    />
                </Reveal>
                <div className="grid gap-6 lg:grid-cols-2">
                    {steps.map((step, index) => (
                        <Reveal key={step.title} delay={index * 0.1}>
                            <div className="flex items-start gap-6 rounded-3xl border border-ink-100 bg-white/80 p-6 shadow-soft dark:border-ink-700 dark:bg-ink-800/70">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-sm font-semibold text-white dark:bg-ink-50 dark:text-ink-900">
                                    {String(index + 1).padStart(2, "0")}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-50">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal>
                    <div className="flex flex-col gap-4 rounded-3xl border border-ink-100 bg-white/70 p-6 shadow-soft dark:border-ink-700 dark:bg-ink-800/70 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-ink-700 dark:text-ink-300 sm:max-w-xl">
                                {t("process.callout1")}
                            </p>
                            <p className="text-sm text-ink-700 dark:text-ink-300 sm:max-w-xl">
                                {t("process.callout2")}
                            </p>
                        </div>
                        <a
                            href="#contact"
                            className="rounded-full bg-ocean-600 px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-ocean-500 dark:bg-ocean-400 dark:text-ink-900 dark:hover:bg-ocean-300 mr-8"
                        >
                            {t("process.cta")}
                        </a>
                    </div>
                </Reveal>
            </Container>
        </Section>
    );
};

export default Process;
