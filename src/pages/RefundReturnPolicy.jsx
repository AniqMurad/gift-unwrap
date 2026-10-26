import {
  StorefrontFooter,
  StorefrontHeader as Navbar,
} from "../components/storefront/StorefrontPage";

const policySections = [
  {
    title: "Damaged or Incorrect Items",
    body: "We want you and your recipient to love every gift! If an item arrives damaged or isn't what you ordered, please let us know within 24-72 hours of delivery. To help us fix things quickly, just send a photo of the issue along with your order number to our support team. We will happily arrange a replacement or a full refund to your original payment method as soon as the claim is verified. Our priority is ensuring that the joy of gifting isn't dampened by a logistical error.",
  },
  {
    title: "Returns and Exchanges",
    body: "Because many of our gifts are curated or contain perishable items, we generally cannot accept returns for change of mind once a gift has been dispatched. For non perishable and non personalized items, you can request an exchange within 24–48 hours days of receipt, provided the item is unused and in its original, unopened packaging. We ask that you reach out to us first to obtain an authorization for the return so we can track the package and process your exchange as quickly as possible.",
  },
  {
    title: "Custom Items and Shipping Costs",
    body: "Please note that custom made hampers and personalized items like engraved mugs or custom frames are final sale unless they arrive defective. We believe in fairness and if we made a mistake, we will own it and make it right at no extra cost to you. If you are returning an item for an exchange based on a personal preference, the customer is responsible for the return shipping fees. We recommend using a trackable shipping service to ensure the items reach us safely.",
  },
];

export default function RefundReturnPolicy() {
  return (
    <div className="gu-policy-page gu-policy-page--redesign gu-policy-page--refunds">
      <Navbar showUtilities={false} />

      <main className="gu-policy-shell">
        <article className="gu-policy-card" aria-labelledby="refund-return-policy-title">
          <h1 id="refund-return-policy-title">Refund and Return Policy</h1>

          <div className="gu-policy-sections">
            {policySections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
        </article>
      </main>

      <StorefrontFooter staticMode />
    </div>
  );
}
