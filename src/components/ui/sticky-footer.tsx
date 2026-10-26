import { useEffect, useRef, useState, type ReactNode } from "react";

export interface StickyFooterProps {
  children: ReactNode;
  className?: string;
  staticMode?: boolean;
}

export function StickyFooter({ children, className = "", staticMode = false }: StickyFooterProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    if (staticMode) return undefined;

    const slot = slotRef.current;
    if (!slot) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsRevealing(entry.isIntersecting),
      { rootMargin: "0px", threshold: 0.01 },
    );

    observer.observe(slot);
    return () => observer.disconnect();
  }, [staticMode]);

  if (staticMode) {
    return (
      <footer className={`sticky-footer gu-static-footer is-revealing ${className}`.trim()}>
        {children}
      </footer>
    );
  }

  return (
    <div ref={slotRef} className="sticky-footer-slot">
      <footer
        aria-hidden={!isRevealing}
        className={`sticky-footer ${isRevealing ? "is-revealing" : ""} ${className}`.trim()}
        inert={!isRevealing}
      >
        {children}
      </footer>
    </div>
  );
}

export default StickyFooter;
