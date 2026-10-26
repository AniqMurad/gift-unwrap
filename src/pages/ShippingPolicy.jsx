import {
  StorefrontFooter,
  StorefrontHeader as Navbar,
} from "../components/storefront/StorefrontPage";

const policySections = [
  {
    title: "Processing  and Delivery Times",
    body: "We know you're excited to send your love, so we work quickly! Most orders are processed and ready for dispatch within 2-3 business days. Once your gift is on its way, you will receive a tracking number via email so you can follow its journey from our warehouse to your doorstep. Shipping times vary by location, but most domestic deliveries arrive within 5-7 business days. We always aim to beat these estimates whenever possible.",
  },
  {
    title: "Shipping Options and Address Verification",
    body: "We offer various shipping tiers, from standard delivery to express options for those last minute surprises that just cannot wait. Shipping costs are calculated at checkout based on the weight of the hamper and the delivery destination. Please double check your shipping address before confirming your order. GiftUnwrap cannot be held responsible for delays or non delivery caused by incorrect or incomplete addresses provided at checkout, though we will do our best to help you redirect a package if it is still in transit.",
  },
  {
    title: "External Factors and Support",
    body: "While we partner with the most reliable couriers, external factors like extreme weather or holiday rushes can sometimes cause delays beyond our control. If your package is marked as Delivered but has not arrived, please contact us immediately so we can work with the carrier to help you locate it. We are here to ensure your gift arrives safely and makes a great impression, and we will support you through every step of the delivery process.",
  },
];

export default function ShippingPolicy() {
  return (
    <div className="gu-policy-page gu-policy-page--redesign gu-policy-page--shipping">
      <Navbar showUtilities={false} />

      <main className="gu-policy-shell">
        <article className="gu-policy-card" aria-labelledby="shipping-policy-title">
          <h1 id="shipping-policy-title">Shipping Policy</h1>

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
