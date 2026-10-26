import {
  StorefrontFooter,
  StorefrontHeader as Navbar,
} from "../components/storefront/StorefrontPage";

const policySections = [
  {
    title: "Order Agreement",
    body: "By using GiftUnwrap.com, you're joining a community dedicated to the art of giving and spreading love. These terms are here to ensure a smooth experience for everyone involved. When you place an order, you agree that all information provided is accurate and that you are authorized to use the payment method selected. We reserve the right to decline or cancel orders if we notice anything unusual or if there are issues with payment authorization, but we will always contact you first to clear things up before taking any action.",
  },
  {
    title: "Product Information & Intellectual Property",
    body: "We put a lot of heart into our product photos and descriptions. While we strive for perfect accuracy, minor variations in packaging or colors may occur due to screen settings or seasonal availability of certain items like specific flowers or treats. All content on this site, from our logo to our curated gift designs and blog posts, is the intellectual property of GiftUnwrap and cannot be used without our express permission. We take pride in our original work and appreciate your respect for our creative efforts.",
  },
  {
    title: "Website Maintenance & Updates",
    body: "Our goal is to keep the website running perfectly all day and night, but occasionally we may need to perform maintenance or updates to improve our service. GiftUnwrap is not liable for any minor delays or technical glitches during these times. By continuing to browse, you agree to follow these simple guidelines designed to keep our gifting community a positive and secure space. We may update these terms from time to time to reflect changes in our business or legal requirements, so we encourage you to check back periodically.",
  },
];

export default function TermsConditions() {
  return (
    <div className="gu-policy-page gu-policy-page--redesign gu-policy-page--terms">
      <Navbar showUtilities={false} />

      <main className="gu-policy-shell">
        <article className="gu-policy-card" aria-labelledby="terms-conditions-title">
          <h1 id="terms-conditions-title">Terms and Conditions</h1>

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
