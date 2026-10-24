import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Used exclusively by the migrated customer-account forms.
export default function StorefrontField({ label, name, value, onChange, error, disabled, password = false, autoComplete }) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  return <div className="gu-migration-field mb-4">
    <label htmlFor={id}>{label}</label>
    <div className={password ? "gu-migration-password" : undefined}>
      <input id={id} type={password && !visible ? "password" : "text"} inputMode={autoComplete === "tel" ? "tel" : undefined} name={name} value={value} onChange={onChange} disabled={disabled} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? id + "-error" : undefined} className="w-full" />
      {password && <button type="button" disabled={disabled} aria-label={visible ? "Hide " + label.toLowerCase() : "Show " + label.toLowerCase()} aria-pressed={visible} onClick={() => setVisible(!visible)}>{visible ? <EyeOff size={20} /> : <Eye size={20} />}</button>}
    </div>
    {error && <p id={id + "-error"} role="alert" className="text-red-600 text-sm mt-2">{error}</p>}
  </div>;
}
