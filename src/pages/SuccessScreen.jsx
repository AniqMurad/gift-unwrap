import { Link, useLocation } from "react-router-dom";
import {
  StorefrontFooter,
  StorefrontHeader as Navbar,
} from "../components/storefront/StorefrontPage";
import checkIcon from "../assets/redesign/thank-you/check.svg";
import helpIcon from "../assets/redesign/thank-you/help.svg";
import mapImage from "../assets/redesign/thank-you/map.png";

const emptySummary = {
  cartItems: [],
  subtotal: 0,
  shippingCost: 0,
  discountAmount: 0,
  totalOrderAmount: 0,
};

const formatPkr = (value) =>
  `${Number(value || 0).toLocaleString("en-PK")} PKR`;

const getItemKey = (item, index) =>
  item.cartKey || item._id || item.id || `${item.name || "gift"}-${index}`;

export default function SuccessScreen() {
  const location = useLocation();
  const state = location.state || {};
  const summary = { ...emptySummary, ...(state.orderSummary || {}) };
  const items = Array.isArray(summary.cartItems) ? summary.cartItems : [];
  const customerName = state.customerName?.trim();
  const shippingInfo = state.shippingInfo || {};
  const orderNumber = state.orderId || "—";
  const address = [
    shippingInfo.street,
    shippingInfo.city,
    shippingInfo.state,
    shippingInfo.postalCode,
    shippingInfo.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="gu-success-page">
      <Navbar showUtilities={false} />

      <main className="gu-success-shell">
        <div className="gu-success-layout">
          <section className="gu-success-confirmation" aria-labelledby="success-title">
            <div className="gu-success-intro-group">
              <div className="gu-success-heading">
                <img src={checkIcon} alt="" aria-hidden="true" />
                <div>
                  <p>Order #{orderNumber}</p>
                  <h1 id="success-title">
                    Thank You{customerName ? ` ${customerName}` : ""}!
                  </h1>
                </div>
              </div>

              <div className="gu-success-update-card">
                <strong>Order Updates</strong>
                <span>
                  You will receive order and delivery updates via email or
                  Whatsapp.
                </span>
              </div>
            </div>

            <div className="gu-success-delivery-group">
              <img
                className="gu-success-map"
                src={mapImage}
                alt="Map of the Karachi delivery area"
              />

              <dl className="gu-success-contact-details">
                <div>
                  <dt>Contact</dt>
                  <dd>{shippingInfo.email || "giftunwrap@gmail.com"}</dd>
                </div>
                <div>
                  <dt>Address</dt>
                  <dd>{address || "Your delivery address will appear here."}</dd>
                </div>
              </dl>
            </div>

            <div className="gu-success-help">
              <img src={helpIcon} alt="" aria-hidden="true" />
              <p>
                Need Help? <Link to="/contact-us">Contact us</Link>
              </p>
            </div>
          </section>

          <div className="gu-success-divider" aria-hidden="true" />

          <aside className="gu-success-summary" aria-labelledby="success-summary-title">
            <h2 id="success-summary-title">Shopping Cart</h2>

            <div className="gu-success-products">
              {items.length ? (
                items.map((item, index) => {
                  const quantity = Math.max(1, Number(item.quantity) || 1);
                  return (
                    <article className="gu-success-product" key={getItemKey(item, index)}>
                      <div className="gu-success-product-media">
                        {item.image ? (
                          <img src={item.image} alt="" />
                        ) : (
                          <span>Gift Unwrap</span>
                        )}
                      </div>
                      <div className="gu-success-product-copy">
                        <h3>{item.name || "Gift item"}</h3>
                        <p>Quantity {String(quantity).padStart(2, "0")}</p>
                        {(item.selectedSize || item.selectedColor) && (
                          <p>{[item.selectedSize && `Size: ${item.selectedSize}`, item.selectedColor && `Color: ${item.selectedColor}`].filter(Boolean).join(' · ')}</p>
                        )}
                      </div>
                      <strong>{formatPkr(Number(item.price || 0) * quantity)}</strong>
                    </article>
                  );
                })
              ) : (
                <p className="gu-success-empty-order">No items in this order.</p>
              )}
            </div>

            <dl className="gu-success-totals">
              <div>
                <dt>Shipping</dt>
                <dd>
                  {Number(summary.shippingCost || 0) === 0
                    ? "Free"
                    : formatPkr(summary.shippingCost)}
                </dd>
              </div>
              <div>
                <dt>Discounts</dt>
                <dd>{formatPkr(summary.discountAmount)}</dd>
              </div>
              <div className="gu-success-total-row">
                <dt>Subtotal</dt>
                <dd>{formatPkr(summary.totalOrderAmount || summary.subtotal)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </main>

      <StorefrontFooter staticMode />
    </div>
  );
}
