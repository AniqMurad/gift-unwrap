import { Link } from 'react-router-dom';
import { StorefrontHeader, StorefrontFooter, StorefrontTitle } from '../components/storefront/StorefrontPage';

export default function OrderTracking() {
  return <>
    <StorefrontHeader />
    <StorefrontTitle title="Order Tracking" titleHome="Home Page" />
    <main className="gu-migration-section gu-migration-content gu-migration-columns gu-migration-auth">
      <div>
        <h2>Looking for your order?</h2>
        <p className="my-6">Your Order ID is on your receipt and in your confirmation email. Contact us with this ID for help tracking your delivery.</p>
        <p className="mb-8">Online tracking by Order ID is not available on this page yet.</p>
        <Link className="gu-migration-button" to="/contact-us">Contact us</Link>
      </div>
      <div>
        <h2>Already have an account?</h2>
        <p className="my-6">Sign in to see your order history and the latest order status.</p>
        <Link className="gu-migration-button gu-migration-button--secondary" to="/myAccount" state={{ activeTab: 'orders' }}>View my orders</Link>
      </div>
    </main>
    <StorefrontFooter />
  </>;
}
