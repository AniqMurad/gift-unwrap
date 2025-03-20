import React from "react";
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

function App() {
  return (
    <>
      <Home />
      <SearchOutput />
      <WishList />
      <Blog />
      <CustomerFeedback />
      <ContactUs />
      <BlogOpen />
      <Error />
      <ComingSoon />
      <FAQs />
    </>
  );
}

export default App;
