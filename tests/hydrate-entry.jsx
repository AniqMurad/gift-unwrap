import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/App";

export function hydrateStorefront(root, initialData, { onRecoverableError } = {}) {
  return ReactDOM.hydrateRoot(
    root,
    <React.StrictMode><App initialData={initialData} /></React.StrictMode>,
    { onRecoverableError },
  );
}
