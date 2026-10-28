import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FREE_SHIPPING_THRESHOLD, getCartItemCardPrice, getCartItemLinePrice } from "../utils/cartPricing";
import { StorefrontFooter as Footer, StorefrontHeader as Navbar, StorefrontLoading as Loader } from "../components/storefront/StorefrontPage";
import NotificationBar from "@/components/NotificationBar";
import { countryNames } from "../data/countries";

const pakistanStates = [
  "Balochistan",
  "Gilgit-Baltistan",
  "Islamabad Capital Territory",
  "Khyber Pakhtunkhwa",
  "Punjab",
  "Sindh",
];

const formatPkr = (value) => `${Math.max(0, Math.floor(Number(value) || 0)).toLocaleString("en-PK")} PKR`;

function CountryCombobox({ disabled, error, onChange, value }) {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const normalizedQuery = value.trim().toLocaleLowerCase();
  const filteredCountries = useMemo(() => {
    if (!normalizedQuery) return countryNames;
    return countryNames
      .filter((country) => country.toLocaleLowerCase().includes(normalizedQuery))
      .sort((first, second) => {
        const firstStartsWith = first.toLocaleLowerCase().startsWith(normalizedQuery);
        const secondStartsWith = second.toLocaleLowerCase().startsWith(normalizedQuery);
        return Number(secondStartsWith) - Number(firstStartsWith) || first.localeCompare(second);
      });
  }, [normalizedQuery]);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  const selectCountry = (country) => {
    onChange(country);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => Math.min(current + 1, filteredCountries.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter" && isOpen && activeIndex >= 0) {
      event.preventDefault();
      selectCountry(filteredCountries[activeIndex]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className={`gu-checkout-country${isOpen ? " is-open" : ""}`} ref={containerRef}>
      <label htmlFor="checkout-country" className="sr-only">Country or Region</label>
      <input
        id="checkout-country"
        name="country"
        type="search"
        role="combobox"
        aria-autocomplete="list"
        aria-controls="checkout-country-options"
        aria-expanded={isOpen}
        aria-activedescendant={activeIndex >= 0 ? `checkout-country-option-${activeIndex}` : undefined}
        aria-invalid={Boolean(error)}
        autoComplete="country-name"
        disabled={disabled}
        placeholder="Choose Country/Region"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
          setIsOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      />
      {isOpen && !disabled && (
        <ul id="checkout-country-options" className="gu-checkout-country-options" role="listbox">
          {filteredCountries.length > 0 ? filteredCountries.map((country, index) => (
            <li
              id={`checkout-country-option-${index}`}
              className={index === activeIndex ? "is-active" : ""}
              key={country}
              role="option"
              aria-selected={country === value}
            >
              <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => selectCountry(country)}>{country}</button>
            </li>
          )) : <li className="gu-checkout-country-empty">No countries found</li>}
        </ul>
      )}
      {error && <small>{error}</small>}
    </div>
  );
}

const Checkout = () => {
  const { cartItems, getTotalCartAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [saveCardDetails, setSaveCardDetails] = useState(false);
  const [showDiscountApplied, setShowDiscountApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ show: false, type: "success", message: "" });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Pakistan",
    city: "",
    street: "",
    state: "",
    postalCode: "",
    additionalInfo: "",
  });

  useEffect(() => {
    if (!notification.show) return undefined;
    const timer = setTimeout(() => setNotification((previous) => ({ ...previous, show: false })), 3000);
    return () => clearTimeout(timer);
  }, [notification.show]);

  const showNotification = (type, message) => setNotification({ show: true, type, message });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: null }));
    if (notification.show) setNotification((previous) => ({ ...previous, show: false }));
  };

  const handleCountryChange = (country) => {
    setFormData((previous) => ({ ...previous, country }));
    if (errors.country) setErrors((previous) => ({ ...previous, country: null }));
  };

  const subtotal = getTotalCartAmount();
  const freeShippingThreshold = FREE_SHIPPING_THRESHOLD;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 350;
  const discountAmount = 0;
  const totalOrderAmount = subtotal + shippingCost - discountAmount;

  useEffect(() => {
    setShowDiscountApplied(subtotal >= 500);
  }, [subtotal]);

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setNotification((previous) => ({ ...previous, show: false }));

    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (!formData.phone || !/^\d{11,15}$/.test(formData.phone)) newErrors.phone = "Phone number must be 11 to 15 digits.";
    if (!countryNames.includes(formData.country)) newErrors.country = "Please choose a country or region.";
    if (!formData.street) newErrors.street = "Street address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.postalCode || Number.isNaN(Number(formData.postalCode))) newErrors.postalCode = "Postal code must be a number.";
    if (paymentMethod === "creditCard") {
      if (!cardName) newErrors.cardName = "Account name is required.";
      if (!cardNumber) newErrors.cardNumber = "Account number is required.";
      if (!expiry) newErrors.expiry = "Transfer date is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    if (cartItems.length === 0) {
      showNotification("error", "Your cart is empty. Please add items before placing an order.");
      setIsLoading(false);
      return;
    }
    const giftBoxBundles = cartItems.filter((item) => item.isGiftBoxBundle && item.giftBox);
    const regularCartItems = cartItems.filter((item) => !item.isGiftBoxBundle);
    if (giftBoxBundles.length > 1 || (giftBoxBundles.length && regularCartItems.length)) {
      showNotification("error", "Please check out one custom gift box separately from other cart items.");
      setIsLoading(false);
      return;
    }
    const giftBoxBundle = giftBoxBundles[0] || null;
    const orderData = {
      userId: localStorage.getItem("userId"),
      shippingInfo: formData,
      paymentMethod,
      cardDetails: paymentMethod === "creditCard"
        ? { cardName, cardNumber, expiry, cvv: "bank-transfer", saveCardDetails }
        : null,
      orderItems: giftBoxBundle
        ? giftBoxBundle.giftBox.items
        : cartItems.map((item) => ({
            category: item.category,
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image || item.images?.[0],
            personalization: item.personalization || undefined,
          })),
      ...(giftBoxBundle ? {
        giftBoxOrder: true,
        selectedBox: giftBoxBundle.giftBox.selectedBox,
        selectedCard: giftBoxBundle.giftBox.selectedCard,
        cardMessage: giftBoxBundle.giftBox.cardMessage,
      } : {}),
    };

    try {
      const response = await fetch("https://giftunwrapbackend.vercel.app/api/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (!response.ok) {
        showNotification("error", `Failed to place order: ${data.message || "Server error"}`);
        setIsLoading(false);
        return;
      }

      const orderSummaryData = {
        cartItems: cartItems.map((item) => ({
          category: item.category,
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image || item.images?.[0],
          personalization: item.personalization || undefined,
        })),
        subtotal,
        shippingCost,
        discountAmount,
        totalOrderAmount,
        showDiscountApplied,
      };
      const shippingDetails = {
        email: formData.email,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
      };

      showNotification("success", `Order placed successfully! Order ID: ${data._id}. Redirecting...`);
      setTimeout(() => {
        clearCart();
        navigate("/order-confirmation", {
          state: {
            orderId: data._id,
            orderSummary: orderSummaryData,
            customerName: formData.firstName,
            shippingInfo: shippingDetails,
          },
        });
      }, 2000);
    } catch {
      showNotification("error", "An error occurred while submitting your order. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="gu-checkout-page">
      {isLoading && <Loader />}
      {notification.show && <NotificationBar type={notification.type} message={notification.message} />}
      <Navbar showUtilities={false} />

      <main className="gu-checkout-shell">
        <header className="gu-checkout-intro">
          <h1>Check Out</h1>
          <p>Have questions? We’re here to help. Reach out and let’s connect.</p>
        </header>

        <form className="gu-checkout-layout" onSubmit={handleSubmitOrder}>
          <div className="gu-checkout-details">
            <section className="gu-checkout-information" aria-labelledby="checkout-information-heading">
              <p className="gu-checkout-login">Already have an account? <Link to="/login">Login here</Link></p>
              <h2 id="checkout-information-heading">Information</h2>
              <div className="gu-checkout-fields">
                <div className="gu-checkout-field-row">
                  <label><span className="sr-only">First Name</span><input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name*" required disabled={isLoading} /></label>
                  <label><span className="sr-only">Last Name</span><input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name*" required disabled={isLoading} /></label>
                </div>
                <div className="gu-checkout-field-row">
                  <label><span className="sr-only">Email Address</span><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address*" aria-invalid={Boolean(errors.email)} required disabled={isLoading} />{errors.email && <small>{errors.email}</small>}</label>
                  <label><span className="sr-only">Whatsapp or Phone Number</span><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Whatsapp/Phone Number*" aria-invalid={Boolean(errors.phone)} required disabled={isLoading} />{errors.phone && <small>{errors.phone}</small>}</label>
                </div>
                <CountryCombobox disabled={isLoading} error={errors.country} onChange={handleCountryChange} value={formData.country} />
                <div className="gu-checkout-field-row">
                  <label><span className="sr-only">Town or City</span><input name="city" value={formData.city} onChange={handleChange} placeholder="Town/City*" aria-invalid={Boolean(errors.city)} required disabled={isLoading} />{errors.city && <small>{errors.city}</small>}</label>
                  <label><span className="sr-only">Street address</span><input name="street" value={formData.street} onChange={handleChange} placeholder="Street,..." aria-invalid={Boolean(errors.street)} required disabled={isLoading} />{errors.street && <small>{errors.street}</small>}</label>
                </div>
                <div className="gu-checkout-field-row">
                  <label className="gu-checkout-select"><span className="sr-only">State</span><select name="state" value={formData.state} onChange={handleChange} aria-invalid={Boolean(errors.state)} required disabled={isLoading}><option value="">Choose State</option>{pakistanStates.map((state) => <option key={state} value={state}>{state}</option>)}</select>{errors.state && <small>{errors.state}</small>}</label>
                  <label><span className="sr-only">Postal Code</span><input inputMode="numeric" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code*" aria-invalid={Boolean(errors.postalCode)} required disabled={isLoading} />{errors.postalCode && <small>{errors.postalCode}</small>}</label>
                </div>
                <label className="gu-checkout-note"><span className="sr-only">Order note</span><textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} placeholder="Write note..." disabled={isLoading} /></label>
              </div>
            </section>

            <section className="gu-checkout-payment" aria-labelledby="checkout-payment-heading">
              <h2 id="checkout-payment-heading">Choose payment Option:</h2>
              <div className="gu-checkout-payment-options">
                <div className={`gu-checkout-transfer${paymentMethod === "creditCard" ? " is-selected" : ""}`}>
                  <label className="gu-checkout-radio-heading">
                    <input type="radio" name="paymentMethod" value="creditCard" checked={paymentMethod === "creditCard"} onChange={() => setPaymentMethod("creditCard")} disabled={isLoading} />
                    <span>Online Money Transfer</span>
                  </label>
                  {paymentMethod === "creditCard" && (
                    <>
                      <p>Make your payment directly into our bank account. Your order will not be shipped until the funds have cleared in our account.</p>
                      <p className="gu-checkout-bank-details"><strong>Account Name:</strong> Hamid Ali<br /><strong>Account Number:</strong> 06027901681003</p>
                      <div className="gu-checkout-transfer-fields">
                        <label><span className="sr-only">Your Account Name</span><input value={cardName} onChange={(event) => { setCardName(event.target.value); setErrors((previous) => ({ ...previous, cardName: null })); }} placeholder="Your Account Name*" aria-invalid={Boolean(errors.cardName)} disabled={isLoading} />{errors.cardName && <small>{errors.cardName}</small>}</label>
                        <label><span className="sr-only">Your Account Number</span><input value={cardNumber} onChange={(event) => { setCardNumber(event.target.value); setErrors((previous) => ({ ...previous, cardNumber: null })); }} placeholder="Your Account Number*" aria-invalid={Boolean(errors.cardNumber)} disabled={isLoading} />{errors.cardNumber && <small>{errors.cardNumber}</small>}</label>
                        <label><span className="sr-only">Transfer date</span><input value={expiry} onChange={(event) => { setExpiry(event.target.value); setErrors((previous) => ({ ...previous, expiry: null })); }} placeholder="dd/mm/yy*" aria-invalid={Boolean(errors.expiry)} disabled={isLoading} />{errors.expiry && <small>{errors.expiry}</small>}</label>
                      </div>
                      <label className="gu-checkout-save-details"><input type="checkbox" checked={saveCardDetails} onChange={(event) => setSaveCardDetails(event.target.checked)} disabled={isLoading} /><span>Save Account Details</span></label>
                    </>
                  )}
                </div>
                <label className={`gu-checkout-cod${paymentMethod === "cod" ? " is-selected" : ""}`}>
                  <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} disabled={isLoading} />
                  <span>Cash On Delivery</span>
                </label>
              </div>
            </section>

            <button className="gu-checkout-pay" type="submit" disabled={cartItems.length === 0 || isLoading}>
              {isLoading ? "Processing..." : "Pay Now"}
            </button>
          </div>

          <div className="gu-checkout-divider" aria-hidden="true" />

          <aside className="gu-checkout-summary" aria-labelledby="checkout-cart-heading">
            {showDiscountApplied && <p className="gu-checkout-discount-pill">Discount Code Has Been Applied!</p>}
            <div className="gu-checkout-cart">
              <h2 id="checkout-cart-heading">Shopping Cart</h2>
              {cartItems.length > 0 ? (
                <div className="gu-checkout-products">
                  {cartItems.map((item) => (
                    <article className="gu-checkout-product" key={item.cartKey || `${item.category}-${item.id}`}>
                      <img src={item.image || item.images?.[0]} alt={item.name} loading="lazy" decoding="async" />
                      <div className="gu-checkout-product-copy"><h3>{item.name}</h3><p>Quantity: {String(item.quantity).padStart(2, "0")}</p>{item.personalization?.card && <p>Card: {item.personalization.card.name} · {formatPkr(getCartItemCardPrice(item))}</p>}</div>
                      <strong>{formatPkr(getCartItemLinePrice(item))}</strong>
                    </article>
                  ))}
                </div>
              ) : <p className="gu-checkout-empty">No items in this order.</p>}

              <div className="gu-checkout-discount">
                <div><span>{showDiscountApplied ? "ONI6810" : "Discount code"}</span><button type="button" disabled>{showDiscountApplied ? "Applied" : "Apply"}</button></div>
                <p>Discount code is only used for orders with a total value of products over 500PKR</p>
              </div>

              <div className="gu-checkout-totals">
                <div><span>Shipping</span><span>{shippingCost === 0 ? "Free" : formatPkr(shippingCost)}</span></div>
                <div><span>Discounts</span><span>{formatPkr(discountAmount)}</span></div>
                <div className="gu-checkout-total"><strong>Subtotal</strong><strong>{formatPkr(totalOrderAmount)}</strong></div>
              </div>
            </div>
          </aside>
        </form>
      </main>
      <Footer staticMode />
    </div>
  );
};

export default Checkout;
