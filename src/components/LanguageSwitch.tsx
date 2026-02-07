import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const options = [
  { value: "en", label: "English", short: "EN", flag: "🇺🇸" },
  { value: "es", label: "Español", short: "ES", flag: "🇪🇸" },
  { value: "de", label: "Deutsch", short: "DE", flag: "🇩🇪" },
  { value: "tr", label: "Türkçe", short: "TR", flag: "🇹🇷" },
];

type LanguageSwitchProps = {
  className?: string;
};

const LanguageSwitch = ({ className }: LanguageSwitchProps) => {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? "en";
  const currentOption = options.find((option) => option.value === current);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className={clsx("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-700 shadow-sm transition hover:border-ink-400 focus:outline-none dark:border-ink-700 dark:bg-ink-900/70 dark:text-ink-200 dark:hover:border-ink-500"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-sm">{currentOption?.flag}</span>
        <span>{currentOption?.short}</span>
      </button>
      <div
        className={clsx(
          "absolute right-0 z-20 mt-2 w-40 rounded-2xl border border-ink-100 bg-white/95 p-2 shadow-soft transition dark:border-ink-700 dark:bg-ink-900/95",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        role="listbox"
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="option"
            aria-selected={option.value === current}
            className={clsx(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.18em] text-ink-700 transition hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800/60",
              option.value === current &&
                "bg-ink-50 text-ink-900 dark:bg-ink-800/80 dark:text-ink-50"
            )}
            onClick={() => {
              void i18n.changeLanguage(option.value);
              setOpen(false);
            }}
          >
            <span className="text-sm">{option.flag}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitch;
