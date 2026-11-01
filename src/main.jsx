import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/inter";
import "./index.css";
import App from "./App";
import AnalyticsTracker from "./components/AnalyticsTracker";
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

const snapshotElement = document.getElementById("__STOREFRONT_DATA__");
const initialData = snapshotElement ? JSON.parse(snapshotElement.textContent) : null;
const app = <React.StrictMode><App initialData={initialData} analytics={<AnalyticsTracker />} /></React.StrictMode>;
const root = document.getElementById("root");
if (initialData) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
