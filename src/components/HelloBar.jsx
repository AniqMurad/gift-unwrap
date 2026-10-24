import { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowIcon from "../assets/redesign/hello-arrow.svg";
import closeIcon from "../assets/redesign/hello-close.svg";

const helloBarContent = {
  home: {
    icon: "⏱️",
    message: "Same-day Karachi delivery on eligible orders before 2 PM Pakistan time.",
    linkLabel: "Learn more",
  },
  navigation: {
    icon: "🚚",
    message: "Free shipping on orders 5000PKR above.",
    linkLabel: "See details",
  },
};

const HelloBar = ({ variant = "home" }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const content = helloBarContent[variant] || helloBarContent.home;

  if (!isVisible) return null;

  return (
    <aside className={`gu-hello-bar gu-hello-bar--${variant}`} aria-label="Delivery announcement">
      <div className="gu-hello-copy">
        <span aria-hidden="true">{content.icon}</span>
        <span>{content.message}</span>
        <button
          className="gu-hello-link"
          type="button"
          onClick={() => navigate("/shipping-policy")}
        >
          {content.linkLabel}
          <img src={arrowIcon} alt="" aria-hidden="true" />
        </button>
      </div>
      <button
        className="gu-hello-close"
        type="button"
        aria-label="Dismiss delivery announcement"
        onClick={() => setIsVisible(false)}
      >
        <img src={closeIcon} alt="" aria-hidden="true" />
      </button>
    </aside>
  );
};

export default HelloBar;
