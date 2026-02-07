import type { ReactNode } from "react";
import clsx from "clsx";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

const Section = ({ id, className, children }: SectionProps) => (
  <section
    id={id}
    className={clsx(
      "scroll-mt-24 py-24 sm:py-28 lg:py-32",
      className
    )}
  >
    {children}
  </section>
);

export default Section;
