import StorefrontField from "./storefront/StorefrontField";

export default function NewPasswordField(props) {
  return <StorefrontField label="New Password" name="newPassword" autoComplete="new-password" password={true} {...props} />;
}
