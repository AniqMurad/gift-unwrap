import { useMigrationDialog } from "./migration-context";

export default function StorefrontDialog({ children, onClose, label, className, style }) {
  const { ref } = useMigrationDialog(true, onClose);
  return <div ref={ref} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} className={className} style={style}>{children}</div>;
}
