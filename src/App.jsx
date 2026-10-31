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
import { CartProvider } from './context/CartContext';
import Loader from "./components/Loader";
import Home from "./pages/Home";
import ScrollToTop from './components/ScrollToTop';
import HelloBar from './components/HelloBar';
import StorefrontPage from './components/storefront/StorefrontPage';
import RouteSeo from './components/RouteSeo';

const navigationAnnouncementRoutes = new Set([
  "/giftforher",
  "/giftforhim",
  "/giftforbirthday",
  "/personalized-gifts",
  "/giftforcompanies",
  "/greeting-cards",
  "/floral-arrangements",
  "/sweet-treats",
  "/build-gift-box",
  "/checkout",
  "/shoppingcart",
]);

function NavigationAnnouncement() {
  const { pathname } = useLocation();
  const normalizedPath = pathname.toLowerCase();
  const hasNavigationAnnouncement = navigationAnnouncementRoutes.has(normalizedPath)
    || normalizedPath.startsWith("/product/");

  return hasNavigationAnnouncement ? <HelloBar variant="navigation" /> : null;
}

const SearchOutput = lazy(() => import("./pages/SearchOutput"));
const Blog = lazy(() => import("./pages/Blog"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const BlogOpen = lazy(() => import("./pages/BlogOpen"));
const Error = lazy(() => import("./pages/Error"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const Giftsforher = lazy(() => import("./pages/Giftsforher"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const Checkout = lazy(() => import("./pages/Checkout"));
const ShoppingCart = lazy(() => import("./pages/ShoppingCart"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const Giftsforhim = lazy(() => import("./pages/Giftsforhim"));
const Forcompanies = lazy(() => import("./pages/Forcompanies"));
const Giftsforwedding = lazy(() => import("./pages/Giftsforwedding"));
const BirthdayGifts = lazy(() => import("./pages/BirthdayGifts"));
const PersonalizedGifts = lazy(() => import("./pages/PersonalizedGifts"));
const GreetingCards = lazy(() => import("./pages/GreetingCards"));
const FloralArrangements = lazy(() => import("./pages/FloralArrangements"));
const SweetTreats = lazy(() => import("./pages/SweetTreats"));
const SuccessScreen = lazy(() => import("./pages/SuccessScreen"));
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
        <RouteSeo />
        <CartProvider>
            <NavigationAnnouncement />
            <Suspense fallback={<Loader />}>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact-us" element={<StorefrontPage kind="contact"><ContactUs /></StorefrontPage>} />
              <Route path="/blog/:slug" element={<StorefrontPage kind="article"><BlogOpen /></StorefrontPage>} />
              <Route path="/error" element={<StorefrontPage kind="error"><Error /></StorefrontPage>} />
              <Route path="/coming-soon" element={<StorefrontPage kind="coming"><ComingSoon /></StorefrontPage>} />
              <Route path="/giftforher" element={<Giftsforher />} />
              <Route path="/giftforhim" element={<Giftsforhim />} />
              <Route path="/forgetPassword" element={<StorefrontPage kind="auth"><ForgetPassword /></StorefrontPage>} />
              <Route path="/login" element={<StorefrontPage kind="auth"><Login /></StorefrontPage>} />
              <Route path="/signup" element={<StorefrontPage kind="auth"><Signup /></StorefrontPage>} />
              <Route path="/myAccount" element={<StorefrontPage kind="account"><MyAccount /></StorefrontPage>} />
              <Route path="/product/:category/:productSlug" element={<ProductDetail />} />
              <Route path="/giftforcompanies" element={<StorefrontPage kind="catalog"><Forcompanies /></StorefrontPage>} />
              <Route path="/giftforwedding" element={<StorefrontPage kind="catalog"><Giftsforwedding /></StorefrontPage>} />
              <Route path="/Giftforbirthday" element={<BirthdayGifts />} />
              <Route path="/personalized-gifts" element={<PersonalizedGifts />} />
              <Route path="/greeting-cards" element={<GreetingCards />} />
              <Route path="/floral-arrangements" element={<FloralArrangements />} />
              <Route path="/sweet-treats" element={<SweetTreats />} />
              <Route path="/Checkout" element={<StorefrontPage kind="checkout"><Checkout /></StorefrontPage>} />
              <Route path="/ShoppingCart" element={<StorefrontPage kind="cart"><ShoppingCart /></StorefrontPage>} />
              <Route path="/SearchOutput" element={<StorefrontPage kind="search"><SearchOutput /></StorefrontPage>} />
              <Route path="/order-confirmation" element={<StorefrontPage kind="success"><SuccessScreen/></StorefrontPage>}></Route>
              <Route path="/shipping-policy" element={<StorefrontPage kind="policy"><ShippingPolicy /></StorefrontPage>} />
              <Route path="/privacy-policy" element={<StorefrontPage kind="policy"><PrivacyPolicy /></StorefrontPage>} />
              <Route path="/refund-return-policy" element={<StorefrontPage kind="policy"><RefundReturnPolicy /></StorefrontPage>} />
              <Route path="/terms-conditions" element={<StorefrontPage kind="policy"><TermsConditions /></StorefrontPage>} />
              <Route path="/build-gift-box" element={<BuildGiftBox />} />
              <Route path="*" element={<StorefrontPage kind="error"><Error /></StorefrontPage>} />
            </Routes>
            </Suspense>
        </CartProvider>
    </Router>
    </HelmetProvider>
  );
}

export default App;

/* pushing for live 2*/
