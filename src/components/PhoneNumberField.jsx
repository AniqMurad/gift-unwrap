import StorefrontField from "./storefront/StorefrontField";

export default function PhoneNumberField(props) {
  return <StorefrontField label="Phone Number" name="phoneNumber" autoComplete="tel" {...props} />;
}
