import type { ReactNode } from "react";
import clsx from "clsx";

type ContainerProps = {
    children: ReactNode;
    className?: string;
};

const Container = ({ children, className }: ContainerProps) => (
    <div className={clsx("mx-auto w-full max-w-7xl px-6", className)}>
        {children}
    </div>
);

export default Container;
