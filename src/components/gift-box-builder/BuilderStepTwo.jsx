import BuilderCatalogueStep from "./BuilderCatalogueStep";

export default function BuilderStepTwo({ boxes, ...props }) {
  return <BuilderCatalogueStep {...props} step={2} catalogue={boxes} />;
}
