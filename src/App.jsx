import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import Home from "./pages/Home";
import SearchOutput from "./pages/SearchOutput";
import WishList from "./pages/WishList";
import Blog from "./pages/Blog";
import CustomerFeedback from "./pages/CustomerFeedback";
import ContactUs from "./pages/ContactUs";
import BlogOpen from "./pages/BlogOpen";
import Error from "./pages/Error";
import ComingSoon from "./pages/ComingSoon";
import FAQs from "./pages/FAQs";
import Giftsforher from "./pages/Giftsforher";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import OrderTracking from "./pages/OrderTracking";
import MyAccount from "./pages/MyAccount";
import Checkout from "./pages/Checkout";
import { ShoppingCart } from "./pages/ShoppingCart";
import ProductDetail from "./components/ProductDetail";
import Giftsforhim from "./pages/Giftsforhim";
import Giftsforbabies from "./pages/Giftsforbabies";
import Giftsforeveryone from "./pages/Giftsforeveryone";
import Forcompanies from "./pages/Forcompanies";
import Giftsforwedding from "./pages/Giftsforwedding";
import Giftforreligions from "./pages/Giftforreligions";
import BirthdayGifts from "./pages/BirthdayGifts";

function App() {
  return (
    <Router>
      <WishlistProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-output" element={<SearchOutput />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/customer-feedback" element={<CustomerFeedback />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blog/:id" element={<BlogOpen />} />
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
          {/* <Route path="/product/:productId" element={<ProductDetail />} /> */}
          <Route path="/product/:category/:productId" element={<ProductDetail />} />

          <Route path="/Giftforbabies" element={<Giftsforbabies />} />
          <Route path="/giftforeveryone" element={<Giftsforeveryone />} />
          <Route path="/giftforcompanies" element={<Forcompanies />} />
          <Route path="/giftforwedding" element={<Giftsforwedding />} />
          <Route path="/Giftforreligions" element={<Giftforreligions />} />
          <Route path="/Giftforbirthday" element={<BirthdayGifts />} />
        </Routes>
      </WishlistProvider>
    </Router>
  );
}

export default App;
