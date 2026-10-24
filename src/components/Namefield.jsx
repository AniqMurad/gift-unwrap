import StorefrontField from "./storefront/StorefrontField";

export default function Namefield(props) {
  return <StorefrontField label="Name" name="name" autoComplete="name" {...props} />;
}
