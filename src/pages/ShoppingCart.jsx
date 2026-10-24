import { StorefrontFooter as Footer } from "../components/storefront/StorefrontPage";
import { StorefrontHeader as Navbar } from "../components/storefront/StorefrontPage";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "@/components/icons";
import { StorefrontTitle as SearchPageNavbar } from "../components/storefront/StorefrontPage";
import DeliveryMarquee from "@/components/DeliveryMarquee";

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalCartAmount } =
    useCart();
  const navigate = useNavigate();

  const subtotal = getTotalCartAmount();
  const freeShippingThreshold = 10000;
  const amountNeededForFreeShipping = Math.max(
    0,
    freeShippingThreshold - subtotal
  );
  const shippingCost =
    subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 350;
  const totalOrderAmount = subtotal + shippingCost;

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(item.id, item.category, newQuantity, item.cartKey);
    } else {
      removeFromCart(item.id, item.category, item.cartKey);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <DeliveryMarquee />
      <SearchPageNavbar title="Shopping Cart" titleHome="Home Page" />
      <main className="gu-migration-section gu-migration-content gu-migration-cart-layout">
        <section aria-label="Items in your cart">
          {subtotal > 0 && amountNeededForFreeShipping > 0 && (
            <div className="gu-migration-cart-shipping">
              <p>Buy <strong>PKR {amountNeededForFreeShipping.toFixed(2)}</strong> more to get free shipping.</p>
              <progress value={subtotal} max={freeShippingThreshold} aria-label="Progress toward free shipping" />
            </div>
          )}
          {cartItems.length === 0 ? (
            <div className="gu-migration-state">
              <h2>Your box of possibilities is empty.</h2>
              <p>Your shopping cart is empty. Explore the gifts and find something they’ll love.</p>
              <button className="gu-migration-button gu-migration-button--secondary" onClick={handleContinueShopping}>Explore gifts</button>
            </div>
          ) : (
            <ul className="gu-migration-cart-list">
              {cartItems.map((item) => (
                <li className="gu-migration-cart-item" key={item.cartKey || `${item.category}-${item.id}`}>
                  {(item.image || item.images?.[0]) ? <img src={item.image || item.images[0]} alt={item.name} loading="lazy" /> : <div className="gu-migration-cart-image-empty">Gift Unwrap</div>}
                  <div className="gu-migration-cart-description">
                    <h2>{item.name}</h2>
                    <p>PKR {Math.floor(item.price)} each</p>
                    {item.personalization?.card && <div><p>Card: {item.personalization.card.name}</p>{item.personalization.messageMode === "write" && <p>To {item.personalization.to}, from {item.personalization.from}</p>}</div>}
                  </div>
                  <div className="gu-migration-cart-quantity" aria-label={`Quantity for ${item.name}`}>
                    <button type="button" disabled={item.quantity <= 1} aria-label={`Decrease quantity of ${item.name}`} onClick={() => handleQuantityChange(item, item.quantity - 1)}>−</button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button type="button" aria-label={`Increase quantity of ${item.name}`} onClick={() => handleQuantityChange(item, item.quantity + 1)}>+</button>
                  </div>
                  <strong className="gu-migration-cart-price">PKR {Math.floor(item.price * item.quantity)}</strong>
                  <button className="gu-migration-cart-remove" type="button" aria-label={`Remove ${item.name}`} onClick={() => removeFromCart(item.id, item.category, item.cartKey)}><CloseIcon className="h-5 w-5" /></button>
                </li>
              ))}
            </ul>
          )}
        </section>
        <aside className="gu-migration-cart-summary">
          <h2>Order Summary</h2>
          <dl>
            <div><dt>Subtotal</dt><dd>PKR {Math.floor(subtotal)}</dd></div>
            <div><dt>Shipping</dt><dd>{shippingCost === 0 ? "Free" : `PKR ${Math.floor(shippingCost)}`}</dd></div>
            <div className="gu-migration-cart-total"><dt>Total</dt><dd>PKR {Math.floor(totalOrderAmount)}</dd></div>
          </dl>
          <button className="gu-migration-button" disabled={cartItems.length === 0} onClick={handleCheckout}>Proceed to checkout</button>
          <button className="gu-migration-cart-continue" onClick={handleContinueShopping}>Continue shopping</button>
        </aside>
      </main>
      <Footer />
    </div>
  );
};
export default ShoppingCart;
