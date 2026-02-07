import clsx from "clsx";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) => {
  const isCenter = align === "center";
  return (
    <div className={clsx(isCenter ? "text-center" : "text-left")}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ocean-600 dark:text-ocean-300">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 font-display text-3xl text-ink-900 sm:text-4xl dark:text-ink-50">
        {title}
      </h2>
      {description ? (
        <p
          className={clsx(
            "mt-4 text-base leading-relaxed text-ink-700 dark:text-ink-300",
            isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default SectionHeading;
