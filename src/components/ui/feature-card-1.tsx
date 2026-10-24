import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface FeatureCardProps extends HTMLAttributes<HTMLLIElement> {
  imageSrc: string;
  imageAlt?: string;
  imageWidth: number;
  imageHeight: number;
  imageOffsetX?: number;
  number: number;
  title: string;
}

export function FeatureCard({
  className,
  imageSrc,
  imageAlt = "",
  imageWidth,
  imageHeight,
  imageOffsetX = 0,
  number,
  title,
  style,
  ...props
}: FeatureCardProps) {
  const customProperties = {
    "--gu-feature-image-width": `${imageWidth}px`,
    "--gu-feature-image-height": `${imageHeight}px`,
    "--gu-feature-image-offset-x": `${imageOffsetX}px`,
    ...style,
  } as CSSProperties;

  return (
    <li className={cn("gu-step-card gu-feature-card", className)} style={customProperties} tabIndex={0} {...props}>
      <span className="gu-step-number" aria-hidden="true">{number}</span>
      <span className="gu-feature-card-art" aria-hidden="true"><img src={imageSrc} alt={imageAlt} /></span>
      <span className="gu-feature-card-title">{title}</span>
    </li>
  );
}

export default FeatureCard;
