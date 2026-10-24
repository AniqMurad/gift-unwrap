import StorefrontField from "./storefront/StorefrontField";

export default function ConfirmPasswordField(props) {
  return <StorefrontField label="Confirm Password" name="confirmPassword" autoComplete="new-password" password={true} {...props} />;
}
