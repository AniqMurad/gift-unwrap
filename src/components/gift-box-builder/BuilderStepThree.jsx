import BuilderCatalogueStep from "./BuilderCatalogueStep";

export default function BuilderStepThree({ cards, ...props }) {
  return <BuilderCatalogueStep {...props} step={3} catalogue={cards} />;
}
