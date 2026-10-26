import {
  StorefrontFooter,
  StorefrontHeader as Navbar,
} from "../components/storefront/StorefrontPage";

const policySections = [
  {
    title: "Data Collection and Security",
    body: "At GiftUnwrap, we take your trust as seriously as your celebrations. We only collect the information necessary to get your beautiful gifts to their destination and this includes your name, delivery address, email, and contact number. Rest assured, your payment details are processed through secure, encrypted gateways, and we never store your credit card information on our own servers. Our website uses standard security protocols to ensure that every interaction you have with our store is protected from unauthorized access.",
  },
  {
    title: "Data Usage and Sharing",
    body: "We use your data primarily to process orders, provide tracking updates, and, if you've opted in, share occasional gift inspiration or special offers. We do not sell or trade your personal details to outside parties. We only share information with trusted partners, such as our delivery couriers, who need those details to complete your order. We may also use anonymized data to understand shopping trends which helps us improve our gift selection and website performance for a better user experience.",
  },
  {
    title: "Your Rights and Control",
    body: "Your rights are important to us and we want you to feel in control of your data. If you ever want to know what information we have on file, or if you'd like us to delete your account and personal data, simply reach out to our team. We are committed to keeping your shopping experience safe and your personal information private. By using our site, you agree to the collection of this information as described, allowing us to provide the seamless service you expect from a premium gifting brand.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="gu-policy-page gu-policy-page--redesign gu-policy-page--privacy">
      <Navbar showUtilities={false} />

      <main className="gu-policy-shell">
        <article className="gu-policy-card" aria-labelledby="privacy-policy-title">
          <h1 id="privacy-policy-title">Privacy Policy</h1>

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
