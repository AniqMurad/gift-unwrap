import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <Router>
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
        <Route path="/search-output" element={<SearchOutput />} />
      </Routes>
    </Router>
  );
}

export default App;