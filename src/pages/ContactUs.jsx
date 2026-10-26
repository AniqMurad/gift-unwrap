import { useEffect, useState } from "react";
import NotificationBar from "../components/NotificationBar";
import LandingFooter from "../components/LandingFooter";
import { StorefrontHeader as Navbar } from "../components/storefront/StorefrontPage";
import mailIcon from "../assets/redesign/contact/mail.png";
import headphonesIcon from "../assets/redesign/contact/headphones.png";
import locationIcon from "../assets/redesign/contact/location.png";
import arrowRightIcon from "../assets/redesign/contact/arrow-right.svg";

const CONTACT_METHODS = [
  {
    title: "Message Us",
    value: "giftunwrap@gmail.com",
    href: "mailto:giftunwrap@gmail.com",
    icon: mailIcon,
  },
  {
    title: "Call Us",
    value: "+92 326 8927354",
    href: "tel:+923268927354",
    icon: headphonesIcon,
  },
  {
    title: "Office Location",
    value: "Rehmani Garden, Garden West, Karachi",
    icon: locationIcon,
  },
];

const INITIAL_FORM_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  content: "",
};

function ContactField({ label, name, type = "text", value, onChange, disabled, autoComplete }) {
  return (
    <label className="gu-contact-field">
      <span className="sr-only">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder=" "
        required
        disabled={disabled}
      />
      <span className="gu-contact-placeholder" aria-hidden="true">
        {label} <strong>*</strong>
      </span>
    </label>
  );
}

export default function ContactUs() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "success",
    message: "",
  });

  useEffect(() => {
    if (!notification.show) return undefined;
    const timer = window.setTimeout(() => {
      setNotification((current) => ({ ...current, show: false }));
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [notification.show]);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (notification.show) {
      setNotification((current) => ({ ...current, show: false }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessageSent(false);
    setNotification((current) => ({ ...current, show: false }));

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const phoneLine = `Phone: +92 ${formData.phone.trim()}`;

    try {
      const response = await fetch("https://giftunwrapbackend.vercel.app/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: formData.email,
          content: `${phoneLine}\n\n${formData.content}`,
        }),
      });

      if (response.ok) {
        setFormData(INITIAL_FORM_DATA);
        setMessageSent(true);
        showNotification("success", "Your message has been sent successfully!");
      } else {
        const errorData = await response.json();
        showNotification(
          "error",
          errorData.message || "Failed to send message. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      showNotification("error", "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gu-contact-page">
      {notification.show && (
        <NotificationBar type={notification.type} message={notification.message} />
      )}

      <Navbar showUtilities={false} />

      <main className="gu-contact-main">
        <section className="gu-contact-hero" aria-labelledby="gu-contact-title">
          <div className="gu-contact-container">
            <header className="gu-contact-heading">
              <h1 id="gu-contact-title">Get in Touch</h1>
              <p>Have questions? We’re here to help. Reach out and let’s connect.</p>
            </header>

            <div className="gu-contact-methods">
              {CONTACT_METHODS.map((method) => (
                <article className="gu-contact-method" key={method.title}>
                  <img src={method.icon} alt="" aria-hidden="true" />
                  <div>
                    <h2>{method.title}</h2>
                    {method.href ? (
                      <a href={method.href}>{method.value}</a>
                    ) : (
                      <p>{method.value}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gu-contact-form-section" aria-labelledby="gu-contact-form-title">
          <div className="gu-contact-form-layout">
            <div className="gu-contact-form-copy">
              <h2 id="gu-contact-form-title">Reach us out<br />for any query</h2>
              <p>We’d love to hear from you. Fill out the form, and our team will get back to you soon.</p>
            </div>

            <form className="gu-contact-form" onSubmit={handleSubmit}>
              <div className="gu-contact-name-row">
                <ContactField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} disabled={loading} autoComplete="given-name" />
                <ContactField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} disabled={loading} autoComplete="family-name" />
              </div>

              <ContactField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} disabled={loading} autoComplete="email" />

              <label className="gu-contact-phone-field">
                <span className="sr-only">Phone Number</span>
                <span className="gu-contact-phone-prefix" aria-hidden="true">🇵🇰 +92</span>
                <span className="gu-contact-phone-divider" aria-hidden="true" />
                <span className="gu-contact-phone-input">
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel-national" inputMode="tel" placeholder=" " required disabled={loading} />
                  <span className="gu-contact-placeholder" aria-hidden="true">Phone Number <strong>*</strong></span>
                </span>
              </label>

              <label className="gu-contact-field gu-contact-message-field">
                <span className="sr-only">Write a Message</span>
                <textarea name="content" value={formData.content} onChange={handleChange} placeholder=" " required disabled={loading} />
                <span className="gu-contact-placeholder" aria-hidden="true">Write a Message <strong>*</strong></span>
              </label>

              <button type="submit" className="gu-contact-submit" disabled={loading}>
                <span>{loading ? "Sending..." : "Submit Message"}</span>
                <img src={arrowRightIcon} alt="" aria-hidden="true" />
              </button>

              <p className="sr-only" role="status" aria-live="polite">
                {messageSent ? "Your message has been sent." : ""}
              </p>
            </form>
          </div>
        </section>
      </main>

      <LandingFooter staticMode />
    </div>
  );
}
