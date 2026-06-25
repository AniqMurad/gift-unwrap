import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

function AnalyticsTracker() {
  const location = useLocation();
  useEffect(() => {
    // Google Analytics
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    // Facebook Pixel
    ReactPixel.pageView();
  }, [location]);
  return null;
}
import { HelmetProvider } from 'react-helmet-async';
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from './context/CartContext';
import Loader from "./components/Loader";
import Home from "./pages/Home";
import ScrollToTop from './components/ScrollToTop';

const SearchOutput = lazy(() => import("./pages/SearchOutput"));
const WishList = lazy(() => import("./pages/WishList"));
const Blog = lazy(() => import("./pages/Blog"));
const CustomerFeedback = lazy(() => import("./pages/CustomerFeedback"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const BlogOpen = lazy(() => import("./pages/BlogOpen"));
const Error = lazy(() => import("./pages/Error"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Giftsforher = lazy(() => import("./pages/Giftsforher"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const OrderTracking = lazy(() => import("./pages/OrderTracking"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const Checkout = lazy(() => import("./pages/Checkout"));
const ShoppingCart = lazy(() => import("./pages/ShoppingCart"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const Giftsforhim = lazy(() => import("./pages/Giftsforhim"));
const Giftsforbabies = lazy(() => import("./pages/Giftsforbabies"));
const Giftsforeveryone = lazy(() => import("./pages/Giftsforeveryone"));
const Forcompanies = lazy(() => import("./pages/Forcompanies"));
const Giftsforwedding = lazy(() => import("./pages/Giftsforwedding"));
const Giftforreligions = lazy(() => import("./pages/Giftforreligions"));
const BirthdayGifts = lazy(() => import("./pages/BirthdayGifts"));
const SuccessScreen = lazy(() => import("./pages/SuccessScreen"));
const FlowerChocolate = lazy(() => import('./pages/FlowerChocolate'));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const RefundReturnPolicy = lazy(() => import("./pages/RefundReturnPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const BuildGiftBox = lazy(() => import("./pages/BuildGiftBox"));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AnalyticsTracker />
        <ScrollToTop />
        <WishlistProvider>
          <CartProvider>
            <Suspense fallback={<Loader />}>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/customer-feedback" element={<CustomerFeedback />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/blog/:slug" element={<BlogOpen />} />
              <Route path="/error" element={<Error />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/giftforher" element={<Giftsforher />} />
              <Route path="/giftforhim" element={<Giftsforhim />} />
              <Route path="/forgetPassword" element={<ForgetPassword />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/OrderTracking" element={<OrderTracking />} />
              <Route path="/myAccount" element={<MyAccount />} />
              <Route path="/product/:category/:productSlug" element={<ProductDetail />} />
              <Route path="/Giftforbabies" element={<Giftsforbabies />} />
              <Route path="/giftforeveryone" element={<Giftsforeveryone />} />
              <Route path="/giftforcompanies" element={<Forcompanies />} />
              <Route path="/giftforwedding" element={<Giftsforwedding />} />
              <Route path="/Giftforreligions" element={<Giftforreligions />} />
              <Route path="/Giftforbirthday" element={<BirthdayGifts />} />
              <Route path="/Checkout" element={<Checkout />} />
              <Route path="/ShoppingCart" element={<ShoppingCart />} />
              <Route path="/SearchOutput" element={<SearchOutput />} />
              <Route path="/order-confirmation" element={<SuccessScreen/>}></Route>
              <Route path="/flower-chocolate" element={<FlowerChocolate/>}></Route>
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/refund-return-policy" element={<RefundReturnPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/build-gift-box" element={<BuildGiftBox />} />
            </Routes>
            </Suspense>
        </CartProvider>
      </WishlistProvider>
    </Router>
    </HelmetProvider>
  );
}

export default App;
