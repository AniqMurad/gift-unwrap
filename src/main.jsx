import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel";

ReactGA.initialize("G-YDHLW30Z3B");

// Initialize Facebook Pixel
const options = {
  autoConfig: true,
  debug: false,
};
ReactPixel.init('2002144737088659', options);
ReactPixel.pageView();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
