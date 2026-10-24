import StorefrontField from "./storefront/StorefrontField";

export default function UsernameField(props) {
  return <StorefrontField label="Username or email address" name="email" autoComplete="username" password={false} {...props} />;
}
