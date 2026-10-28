import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StorefrontFooter as Footer, StorefrontHeader as Navbar } from "../components/storefront/StorefrontPage";
import { useCart } from "../context/CartContext";
import {
  FREE_SHIPPING_THRESHOLD,
  getCartItemCardPrice,
  getCartItemLinePrice,
  getCartItemUnitPrice,
} from "../utils/cartPricing";
import minusIcon from "../assets/redesign/cart/minus.svg";
import plusIcon from "../assets/redesign/cart/plus.svg";
import removeIcon from "../assets/redesign/cart/remove-outline.svg";

const formatPkr = (amount) => `${Math.floor(Number(amount) || 0).toLocaleString("en-PK")} PKR`;

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalCartAmount } = useCart();
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState("");

  const subtotal = getTotalCartAmount();
  const freeShippingThreshold = FREE_SHIPPING_THRESHOLD;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 350;
  const discountAmount = 0;
  const totalOrderAmount = subtotal - discountAmount + shippingCost;
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(item.id, item.category, newQuantity, item.cartKey);
    } else {
      removeFromCart(item.id, item.category, item.cartKey);
    }
  };

  return (
    <div className="gu-cart-page">
      <Navbar showUtilities={false} />

      <main className="gu-cart-shell">
        <header className="gu-cart-intro">
          <h1>Shopping Cart</h1>
          <p>Have questions? We’re here to help. Reach out and let’s connect.</p>
        </header>

        <div className="gu-cart-layout">
          <section className="gu-cart-products" aria-label="Items in your cart">
            <div className="gu-cart-shipping-progress">
              <p>
                {amountNeededForFreeShipping > 0 ? (
                  <>Buy <strong>{formatPkr(amountNeededForFreeShipping)}</strong> more to get <strong>Freeshipping</strong></>
                ) : (
                  <><strong>Free shipping</strong> unlocked for this order</>
                )}
              </p>
              <div
                className="gu-cart-progress-track"
                role="progressbar"
                aria-label="Progress toward free shipping"
                aria-valuemin="0"
                aria-valuemax={freeShippingThreshold}
                aria-valuenow={Math.min(subtotal, freeShippingThreshold)}
              >
                <span className="gu-cart-progress-fill" style={{ width: `${shippingProgress}%` }} />
                <span className="gu-cart-progress-dot" style={{ left: `${shippingProgress}%` }} />
              </div>
            </div>

            <div className="gu-cart-table-heading" aria-hidden="true">
              <span>Products</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total Price</span>
              <span />
            </div>

            {cartItems.length === 0 ? (
              <div className="gu-cart-empty">
                <h2>Your cart is empty.</h2>
                <p>Explore the gifts and find something they’ll love.</p>
                <button type="button" onClick={() => navigate("/")}>Explore gifts</button>
              </div>
            ) : (
              <ul className="gu-cart-list">
                {cartItems.map((item) => {
                  const itemImage = item.image || item.images?.[0];
                  const itemKey = item.cartKey || `${item.category}-${item.id}`;
                  const cardPrice = getCartItemCardPrice(item);
                  const giftBoxItemCount = item.giftBox?.items.reduce(
                    (total, giftItem) => total + Number(giftItem.quantity || 0),
                    0,
                  ) || 0;

                  return (
                    <li className="gu-cart-item" key={itemKey}>
                      {itemImage ? (
                        <img className="gu-cart-item-image" src={itemImage} alt={item.name} loading="lazy" />
                      ) : (
                        <div className="gu-cart-item-image gu-cart-item-image--empty">Gift Unwrap</div>
                      )}

                      <div className="gu-cart-item-details">
                        <div className="gu-cart-item-copy">
                          <h2>{item.name}</h2>
                          {item.personalization?.card && (
                            <p>
                              Card: {item.personalization.card.name}
                              {` · ${formatPkr(cardPrice)}`}
                              {item.personalization.messageMode === "write" && ` · To ${item.personalization.to}, from ${item.personalization.from}`}
                            </p>
                          )}
                          {item.isGiftBoxBundle && item.giftBox && (
                            <p>
                              {giftBoxItemCount} {giftBoxItemCount === 1 ? "goodie" : "goodies"}
                              {item.giftBox.selectedBox?.size ? ` · ${item.giftBox.selectedBox.size} box` : ""}
                              {item.giftBox.selectedCard?.name ? ` · Card: ${item.giftBox.selectedCard.name}` : " · No card"}
                            </p>
                          )}
                        </div>

                        <span className="gu-cart-unit-price">{formatPkr(getCartItemUnitPrice(item))}</span>

                        {item.isGiftBoxBundle ? (
                          <div className="gu-cart-quantity gu-cart-quantity--fixed" aria-label={`Quantity for ${item.name}`}>
                            <span aria-live="polite">1</span>
                          </div>
                        ) : (
                          <div className="gu-cart-quantity" aria-label={`Quantity for ${item.name}`}>
                            <button type="button" aria-label={`Decrease quantity of ${item.name}`} onClick={() => handleQuantityChange(item, item.quantity - 1)}>
                              <img src={minusIcon} alt="" aria-hidden="true" />
                            </button>
                            <span aria-live="polite">{item.quantity}</span>
                            <button type="button" aria-label={`Increase quantity of ${item.name}`} onClick={() => handleQuantityChange(item, item.quantity + 1)}>
                              <img src={plusIcon} alt="" aria-hidden="true" />
                            </button>
                          </div>
                        )}

                        <span className="gu-cart-line-price">{formatPkr(getCartItemLinePrice(item))}</span>

                        <button className="gu-cart-remove" type="button" aria-label={`Remove ${item.name}`} onClick={() => removeFromCart(item.id, item.category, item.cartKey)}>
                          <img src={removeIcon} alt="" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            <form className="gu-cart-discount" onSubmit={(event) => event.preventDefault()}>
              <label className="sr-only" htmlFor="cart-discount">Voucher discount code</label>
              <input id="cart-discount" type="text" value={discountCode} onChange={(event) => setDiscountCode(event.target.value)} placeholder="Add voucher discount" autoComplete="off" />
              <button type="submit" disabled={!discountCode.trim()}>Apply Code</button>
            </form>
          </section>

          <aside className="gu-cart-summary" aria-label="Order summary">
            <h2>Order Summary</h2>

            <dl className="gu-cart-summary-list">
              <div><dt>Subtotal</dt><dd>{formatPkr(subtotal)}</dd></div>
              <div><dt>Discounts</dt><dd>{formatPkr(discountAmount)}</dd></div>
              <div className="gu-cart-shipping-row">
                <dt>Shipping</dt>
                <dd>
                  <span className={shippingCost === 0 ? "is-selected" : ""}><i aria-hidden="true" /> Free Shipping: <b>{formatPkr(0)}</b></span>
                  <span className={shippingCost > 0 ? "is-selected" : ""}><i aria-hidden="true" /> Flat Rate: <b>{formatPkr(350)}</b></span>
                </dd>
              </div>
              <div className="gu-cart-summary-total"><dt>Total</dt><dd>{formatPkr(totalOrderAmount)}</dd></div>
            </dl>

            <div className="gu-cart-summary-actions">
              <button className="gu-cart-checkout-button" type="button" disabled={cartItems.length === 0} onClick={() => navigate("/checkout")}>Process To Checkout</button>
              <button className="gu-cart-continue-button" type="button" onClick={() => navigate("/")}>Or Continue Purchasing</button>
            </div>
          </aside>
        </div>
      </main>

      <Footer staticMode />
    </div>
  );
};

export default ShoppingCart;
