import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const StorefrontDataContext = createContext(null);

export function StorefrontDataProvider({ value, children }) {
  const location = useLocation();
  const matches = value?.url === `${location.pathname}${location.search}`;
  const [departed, setDeparted] = useState(false);
  useEffect(() => { if (!matches) setDeparted(true); }, [matches]);
  return <StorefrontDataContext.Provider value={departed ? null : value}>{children}</StorefrontDataContext.Provider>;
}

// A snapshot belongs to one document URL. SPA navigation must load fresh data.
export function useStorefrontData() {
  const snapshot = useContext(StorefrontDataContext);
  const location = useLocation();
  return snapshot?.url === `${location.pathname}${location.search}` ? snapshot : null;
}
