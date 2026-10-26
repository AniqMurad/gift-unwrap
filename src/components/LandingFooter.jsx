import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import footerPerson from "../assets/redesign/footer-falling-girl.png";
import dividerIcon from "../assets/redesign/footer/divider.svg";
import externalArrowIcon from "../assets/redesign/footer/external-arrow.svg";
import facebookIcon from "../assets/redesign/footer/facebook.svg";
import instagramIcon from "../assets/redesign/footer/instagram.svg";
import linkedinIcon from "../assets/redesign/footer/linkedin.svg";
import locationIcon from "../assets/redesign/footer/location.svg";
import mailIcon from "../assets/redesign/footer/mail.svg";
import phoneIcon from "../assets/redesign/footer/phone.svg";
import submitArrowIcon from "../assets/redesign/footer/submit-arrow.svg";
import "../styles/landing-footer.css";
import StickyFooter from "./ui/sticky-footer";

const footerGroups = [
  {
    heading: "Explore",
    links: [
      ["Shop Gifts", "/#featured-gifts"],
      ["Gifts for Her", "/giftforher"],
      ["Gifts for Him", "/giftforhim"],
      ["Sweet Treats", "/sweet-treats"],
      ["Floral Arrangements", "/floral-arrangements"],
      ["Greeting Cards", "/greeting-cards"],
      ["Corporate Gifts", "/giftforcompanies"],
      ["Build Your Own Gift Box", "/build-gift-box"],
    ],
  },
  {
    heading: "A little help",
    links: [
      ["Contact us", "/contact-us"],
      ["Gift guides", "/blog"],
    ],
  },
  {
    heading: "The details",
    links: [
      ["Shipping Policy", "/shipping-policy"],
      ["Privacy Policy", "/privacy-policy"],
      ["Refund & Return", "/refund-return-policy"],
      ["Terms & Conditions", "/terms-conditions"],
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/gift_unwrap?igsh=NjQyeG5kb2gydWho&utm_source=qr",
    icon: instagramIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/16PiPh8aS6/?mibextid=wwXIfr",
    icon: facebookIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    icon: linkedinIcon,
  },
];

export default function LandingFooter({ staticMode = false }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim();
    if (!normalizedEmail) return;

    // The existing storefront flow hands newsletter emails to the account
    // signup route; there is no dedicated subscription endpoint yet.
    navigate("/signup", { state: { prefillEmail: normalizedEmail } });
  };

  return (
    <StickyFooter className="gu-landing-footer" staticMode={staticMode}>
      <div className="gu-site-footer-art" aria-hidden="true">
        <img src={footerPerson} alt="" />
      </div>

      <div className="gu-site-footer-content">
        <div className="gu-site-footer-upper">
          <section className="gu-site-footer-about" aria-labelledby="gu-footer-about-title">
            <div>
              <h2 id="gu-footer-about-title">A Little About Gift Unwrap</h2>
              <p>Gift Unwrap helps you turn thoughtful gestures into happy memories. Discover curated hampers, build your own gift box, and send a little love to the people you cherish in Pakistan.</p>
            </div>
            <address>
              <a href="mailto:giftunwrap@gmail.com"><img src={mailIcon} alt="" aria-hidden="true" />giftunwrap@gmail.com</a>
              <a href="tel:+923268927354"><img src={phoneIcon} alt="" aria-hidden="true" />+92 326 8927354</a>
              <span><img src={locationIcon} alt="" aria-hidden="true" />Shop No. 226 PIB Colony near Jail Chowrangi, Karachi</span>
            </address>
          </section>

          <div className="gu-site-footer-navigation">
            {footerGroups.map((group) => (
              <nav aria-label={group.heading} key={group.heading}>
                <h2>{group.heading}</h2>
                <div>
                  {group.links.map(([label, href]) => <Link to={href} key={href}>{label}</Link>)}
                </div>
              </nav>
            ))}
          </div>
        </div>

        <div className="gu-site-footer-divider" aria-hidden="true">
          <img src={dividerIcon} alt="" />
        </div>

        <div className="gu-site-footer-lower">
          <form className="gu-site-footer-newsletter" onSubmit={handleNewsletterSubmit}>
            <label htmlFor="gu-site-footer-email">A little joy in your inbox</label>
            <p>Sign up for our newsletter and get 10% off your first purchase.</p>
            <div>
              <input
                id="gu-site-footer-email"
                type="email"
                autoComplete="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button type="submit" aria-label="Continue newsletter signup with this email">
                <img src={submitArrowIcon} alt="" aria-hidden="true" />
              </button>
            </div>
          </form>

          <div className="gu-site-footer-socials" aria-label="GiftUnwrap social media">
            {socialLinks.map((social) => (
              <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>
                <img className="gu-site-footer-social-icon" src={social.icon} alt="" aria-hidden="true" />
                <span>{social.label}</span>
                <img className="gu-site-footer-external-icon" src={externalArrowIcon} alt="" aria-hidden="true" />
              </a>
            ))}
          </div>

          <p className="gu-site-footer-copyright">©{new Date().getFullYear()} GiftUnwrap. All Rights Reserved.</p>
        </div>

        <div className="gu-site-footer-wordmark" aria-hidden="true">
          <svg viewBox="0 0 1720 240" preserveAspectRatio="none" focusable="false">
            <text x="0" y="215" fontSize="260" textLength="1720" lengthAdjust="spacingAndGlyphs">GIFTUNWRAP</text>
          </svg>
        </div>
      </div>
    </StickyFooter>
  );
}
