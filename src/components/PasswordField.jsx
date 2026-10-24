import StorefrontField from "./storefront/StorefrontField";

export default function PasswordField(props) {
  return <StorefrontField label="Password" name="password" autoComplete="current-password" password={true} {...props} />;
}
