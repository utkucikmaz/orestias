import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Container from "./Container";
import LanguageSwitch from "./LanguageSwitch";
import ThemeToggle from "./ThemeToggle";
import title from "../assets/title.png";

type NavItem = {
    label: string;
    href: string;
};

const Navbar = () => {
    const { t } = useTranslation();
    const items = useMemo(
        () => t("nav.items", { returnObjects: true }) as NavItem[],
        [t],
    );
    const [open, setOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        if (!open) return undefined;

        const handleOutside = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node | null;
            if (!target) return;
            if (headerRef.current && !headerRef.current.contains(target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutside);
        document.addEventListener("touchstart", handleOutside);

        return () => {
            document.removeEventListener("mousedown", handleOutside);
            document.removeEventListener("touchstart", handleOutside);
        };
    }, [open]);

    useEffect(() => {
        if (typeof window === "undefined") return undefined;
        const ids = items.map((item) => item.href);
        const sections = ids
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        if (!sections.length) return undefined;

        const hero = document.getElementById("hero");
        let rafId = 0;

        const updateActive = () => {
            const activationLine = window.innerHeight * 0.35;

            if (hero) {
                const heroBottom = hero.getBoundingClientRect().bottom;
                if (heroBottom > activationLine) {
                    setActiveId((prev) => (prev === "" ? prev : ""));
                    return;
                }
            }

            let nextId = "";
            let bestTop = -Infinity;

            for (const section of sections) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= activationLine && rect.top > bestTop) {
                    bestTop = rect.top;
                    nextId = section.id;
                }
            }

            setActiveId((prev) => (prev === nextId ? prev : nextId));
        };

        const onScroll = () => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updateActive);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        updateActive();

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [items]);

    return (
        <header
            ref={headerRef}
            className="sticky top-0 z-50 border-b border-ink-100 bg-white/70 backdrop-blur dark:border-ink-800 dark:bg-ink-900/80"
        >
            <Container className="flex items-center justify-between py-4 max-w-6xl">
                <a
                    href="#hero"
                    className="flex items-center gap-3 font-display text-xl text-ink-900 transition hover:text-ocean-600 dark:text-ink-50 dark:hover:text-gold-400"
                >
                    <img
                        src={title}
                        alt={`${t("nav.brand")} logo`}
                        className="h-8 w-full object-cover shadow-soft"
                        loading="eager"
                    />
                </a>
                <nav className="hidden items-center gap-6 lg:flex">
                    {items.map((item) => {
                        const isActive = activeId === item.href;
                        return (
                            <a
                                key={item.href}
                                href={`#${item.href}`}
                                className={clsx(
                                    "text-sm font-semibold transition hover:text-ocean-600 dark:hover:text-gold-400",
                                    isActive
                                        ? "text-ink-900 underline decoration-ocean-500 underline-offset-8 dark:text-ink-50"
                                        : "text-ink-700 dark:text-ink-200",
                                )}
                                aria-current={isActive ? "page" : undefined}
                                onClick={() => setActiveId(item.href)}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                </nav>
                <div className="hidden items-center gap-4 lg:flex">
                    <LanguageSwitch />
                    <ThemeToggle />
                    <a
                        href="#contact"
                        className="rounded-full bg-ink-900 px-4 py-1.5 text-[13px] font-semibold text-white shadow-soft transition hover:bg-ink-700 dark:bg-ink-50 dark:text-ink-900 dark:hover:bg-ink-100"
                    >
                        {t("nav.cta")}
                    </a>
                </div>
                <div className="ml-auto flex items-center gap-2 lg:hidden">
                    <LanguageSwitch className="[&>button>span:last-child]:hidden [&>button]:!px-2.5 [&>button]:!py-1.5" />
                    <div className="[&>button]:!px-2.5 [&>button]:!py-1.5">
                        <ThemeToggle />
                    </div>
                    <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition hover:border-ink-400 dark:border-ink-700 dark:text-ink-200 dark:hover:border-ink-500"
                        onClick={() => setOpen((prev) => !prev)}
                        aria-expanded={open}
                        aria-label={open ? t("nav.menuClose") : t("nav.menuOpen")}
                    >
                        {open ? (
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18" />
                                <path d="M6 6 18 18" />
                            </svg>
                        ) : (
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 6h18" />
                                <path d="M3 12h18" />
                                <path d="M3 18h18" />
                            </svg>
                        )}
                    </button>
                </div>
            </Container>
            <div
                className={clsx(
                    "lg:hidden",
                    open
                        ? "block border-t border-ink-100 bg-white/95 dark:border-ink-800 dark:bg-ink-900/95"
                        : "hidden",
                )}
            >
                <Container className="flex flex-col gap-4 py-6 max-w-6xl">
                    {items.map((item) => {
                        const isActive = activeId === item.href;
                        return (
                            <a
                                key={item.href}
                                href={`#${item.href}`}
                                className={clsx(
                                    "text-sm font-semibold",
                                    isActive
                                        ? "text-ink-900 dark:text-ink-50"
                                        : "text-ink-700 dark:text-ink-200",
                                )}
                                aria-current={isActive ? "page" : undefined}
                                onClick={() => {
                                    setActiveId(item.href);
                                    setOpen(false);
                                }}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                    <a
                        href="#contact"
                        className="mt-2 rounded-full bg-ink-900 px-4 py-1.5 text-[13px] font-semibold text-white shadow-soft dark:bg-ink-50 dark:text-ink-900"
                        onClick={() => setOpen(false)}
                    >
                        {t("nav.cta")}
                    </a>
                </Container>
            </div>
        </header>
    );
};

export default Navbar;
