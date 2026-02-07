import { Suspense, lazy, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import Container from "../components/Container";

const HeroScene = lazy(() => import("../three/HeroScene"));

type Stat = {
    label: string;
    value: string;
};

const Hero = () => {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const stats = t("hero.stats", { returnObjects: true }) as Stat[];
    const [showScene, setShowScene] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(min-width: 640px)").matches;
    });

    useEffect(() => {
        if (typeof window === "undefined") return undefined;
        const media = window.matchMedia("(min-width: 640px)");
        const update = () => setShowScene(media.matches);

        update();
        if (media.addEventListener) {
            media.addEventListener("change", update);
            return () => media.removeEventListener("change", update);
        }

        media.addListener(update);
        return () => media.removeListener(update);
    }, []);

    return (
        <section
            id="hero"
            className="relative overflow-hidden bg-hero-gradient pb-8 pt-12 md:pb-16 md:pt-24 dark:bg-[radial-gradient(120%_120%_at_10%_10%,rgba(79,76,68,0.6)_0%,rgba(23,21,17,1)_70%)] sm:pt-28"
        >
            <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-8">
                    <div className="space-y-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean-600 dark:text-ocean-300">
                            {t("hero.eyebrow")}
                        </p>
                        <h1 className="font-display text-4xl leading-tight text-ink-900 sm:text-5xl lg:text-6xl dark:text-ink-50">
                            {t("hero.title")}
                        </h1>
                        <p className="max-w-xl text-base leading-relaxed text-ink-700 sm:text-lg dark:text-ink-300">
                            {t("hero.subtitle")}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                        <a
                            href="#contact"
                            className="w-full rounded-full bg-ink-900 px-6 py-3 text-center text-sm font-semibold text-white shadow-soft transition hover:bg-ink-700 sm:w-auto dark:bg-ink-50 dark:text-ink-900 dark:hover:bg-ink-100"
                        >
                            {t("hero.ctaPrimary")}
                        </a>
                        <a
                            href="#process"
                            className="w-full rounded-full border border-ink-300 px-6 py-3 text-center text-sm font-semibold text-ink-800 transition hover:border-ink-500 sm:w-auto dark:border-ink-600 dark:text-ink-100 dark:hover:border-ink-400"
                        >
                            {t("hero.ctaSecondary")}
                        </a>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-3">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-ink-100 bg-white/80 p-4 shadow-soft dark:border-ink-700 dark:bg-ink-800/70"
                            >
                                <p className="text-lg font-semibold text-ink-900 dark:text-ink-50">
                                    {stat.value}
                                </p>
                                <p className="text-xs uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                {showScene ? (
                    <motion.div
                        initial={
                            reduceMotion
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 40 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative h-[360px] w-full overflow-hidden bg-transparent sm:h-[420px]">
                            <Suspense
                                fallback={<div className="h-full w-full" />}
                            >
                                <HeroScene />
                            </Suspense>
                        </div>
                        <div className="pointer-events-none absolute -bottom-8 -left-8 hidden h-24 w-24 rounded-full bg-ocean-200/60 blur-2xl lg:block" />
                        <div className="pointer-events-none absolute -top-10 right-2 hidden h-32 w-32 rounded-full bg-gold-200/70 blur-3xl lg:block" />
                    </motion.div>
                ) : null}
            </Container>
        </section>
    );
};

export default Hero;
