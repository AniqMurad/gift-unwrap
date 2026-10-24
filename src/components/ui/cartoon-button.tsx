import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { Link } from "react-router-dom";

export interface CartoonButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "color"> {
  label: string;
  color?: string;
  hasHighlight?: boolean;
  to?: string;
}

export function CartoonButton({
  label,
  color = "#fdbe66",
  hasHighlight = true,
  disabled = false,
  onClick,
  className = "",
  to,
  style,
  type = "button",
  ...buttonProps
}: CartoonButtonProps) {
  const classes = [
    "cartoon-button",
    hasHighlight ? "cartoon-button--highlight" : "",
    color.toLowerCase() === "#ff2b3a" ? "cartoon-button--light" : "",
    disabled ? "is-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const buttonStyle = {
    ...style,
    "--cartoon-button-color": color,
  } as CSSProperties;

  if (to && !disabled) {
    if (/^https?:\/\//i.test(to)) {
      return (
        <a
          className={classes}
          href={to}
          rel="noreferrer"
          style={buttonStyle}
          target="_blank"
        >
          <span>{label}</span>
        </a>
      );
    }

    return (
      <Link className={classes} style={buttonStyle} to={to}>
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button
      {...buttonProps}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      style={buttonStyle}
      type={type}
    >
      <span>{label}</span>
    </button>
  );
}

export default CartoonButton;
