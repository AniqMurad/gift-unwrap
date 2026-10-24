import type { PropsWithChildren } from "react";

export interface ProductScrollRevealProps extends PropsWithChildren {
  index: number;
}

export default function ProductScrollReveal({
  children,
  index,
}: ProductScrollRevealProps) {
  return (
    <div
      className={`gu-collection-reveal ${index % 2 === 0 ? "is-left" : "is-right"}`}
    >
      {children}
    </div>
  );
}

