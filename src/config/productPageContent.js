import { keyGiftSearchText } from "../utils/keyGifts";

export const defaultGiftPackaging = {
  intro: "Every box arrives hand-packed and ready to gift.",
  items: [
    {
      id: "keepsake-box",
      title: "Keepsake box",
      description: "A signature blue magnetic-close box, made to be kept long after.",
    },
    {
      id: "hand-wrapped",
      title: "Hand-wrapped",
      description: "Wrapped in tissue paper, nestled in crinkle fill, and finished with a hand-tied ribbon.",
    },
    {
      id: "ready-to-gift",
      title: "Ready to gift",
      description: "No receipts or pricing enclosed, and your note tucked inside — send it straight to them.",
    },
  ],
};

export const birthdayProductFaq = {
  heading: "Before You Send Their Birthday Surprise",
  introduction: "A few helpful details about choosing, personalizing, and sending your gift.",
  items: [
    {
      id: "birthday-contents",
      question: "What comes inside this birthday gift box?",
      answer: "The What’s Inside tab lists the items and quantities included in this gift. Please review the contents and photographs before ordering, and contact us if you need more information.",
    },
    {
      id: "birthday-message",
      question: "Can I add a birthday message?",
      answer: "Choose a greeting card and enter your message using the options on this page. Check your wording and the recipient’s name before adding the gift to your cart.",
    },
    {
      id: "birthday-personalization",
      question: "Can I change or personalize the contents?",
      answer: "Contact us on WhatsApp before ordering to discuss the options available for this gift box. Changes may affect the price and preparation time.",
    },
    {
      id: "birthday-delivery",
      question: "Can this gift box be delivered outside Karachi?",
      answer: "Delivery eligibility depends on the contents and destination. Flowers and edible items cannot ship nationwide. Check this gift’s delivery details before placing your order.",
    },
    {
      id: "birthday-same-day",
      question: "Is same-day delivery available in Karachi?",
      answer: "Same-day Karachi delivery is available on eligible flowers and non-customized gifts ordered before 2 PM Pakistan time. Please confirm that this particular gift box qualifies before ordering.",
    },
    {
      id: "birthday-refunds",
      question: "What is your return and refund policy?",
      answer: "Our return/refund policy has a 14-day window. Please read the full policy for eligibility, conditions, and exclusions.",
      link: {
        label: "Please read the full policy for eligibility, conditions, and exclusions.",
        to: "/refund-return-policy",
      },
    },
  ],
};

export const getProductFaqContent = (product, category) => {
  const searchable = [
    category,
    product?.name,
    product?.subcategory,
    keyGiftSearchText(product?.keyGift),
    product?.shortDescription,
    product?.longDescription,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchable.includes("birthday") ? birthdayProductFaq : null;
};
