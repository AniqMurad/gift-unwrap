export interface RecipientFaqItem {
  id: string;
  question: string;
  answer: string;
  href?: string;
  linkLabel?: string;
}

export interface RecipientCollectionConfig {
  key: "him" | "her" | "birthday" | "personalized" | "greetingCards" | "floral" | "sweetTreats";
  collectionId: string;
  dataSource?: "products" | "greetingCards";
  directPurchaseOnly?: boolean;
  sourceCollectionIds?: string[];
  productScope?: "birthday" | "personalized" | "floral" | "sweetTreats";
  profileFilteringSupported?: boolean;
  fixedOccasion?: {
    value: string;
    label: string;
  };
  featuredSortLabel?: string;
  sortingSupported?: boolean;
  alwaysShowPagination?: boolean;
  faqDefaultOpenId?: string;
  route: string;
  navigationLabel: string;
  heading: string;
  headingAmpersandSans?: boolean;
  introduction: string;
  seoTitle: string;
  seoDescription: string;
  builder?: {
    heading: string;
    paragraph: string;
    steps: [string, string, string, string];
    cta: string;
    route: string;
  };
  emptyState?: {
    heading: string;
    message: string;
    cta?: string;
    route?: string;
  };
  faqHeading: string;
  faqIntroduction: string;
  faqItems: RecipientFaqItem[];
  profileLabels: Record<string, string>;
  occasionLabels: Record<string, string>;
}

const sharedAnswers = {
  buildBox:
    "Yes. Choose your box, pick the gifts, and add your message. For delivery outside Karachi, select items eligible for nationwide shipping.",
  personalization:
    "Contact us on WhatsApp before ordering to discuss the available options for your chosen gift. Personalization requires additional preparation time.",
  nationwide:
    "Yes, selected gifts are available for delivery across Pakistan. Flowers and edible items cannot ship nationwide.",
  sameDay:
    "Yes. Eligible flowers and non-customized gifts listed on our website are available for same-day Karachi delivery when ordered before 2 PM Pakistan time.",
  abroad:
    "Gift Unwrap is designed for gifting to recipients in Pakistan, including customers ordering from abroad. Check delivery eligibility for your chosen items and contact us if you need help with payment options before ordering.",
  returns:
    "Our return/refund policy has a 14-day window. Please read the full policy for conditions.",
  choosingPending:
    "This answer is awaiting approved content from Gift Unwrap.",
};

export const recipientCollectionConfigs: Record<
  RecipientCollectionConfig["key"],
  RecipientCollectionConfig
> = {
  him: {
    key: "him",
    collectionId: "giftsForHim",
    route: "/giftforhim",
    navigationLabel: "Gifts for Him",
    heading: "Gifts for Men in Pakistan",
    introduction:
      "For his birthday, a milestone, or a little thank-you. Explore gifts for the men who matter to you, or build a box around his favourite things. Add a personal message and make it something he’ll love to unwrap.",
    seoTitle: "Gifts for Him in Pakistan | Gift Unwrap",
    seoDescription:
      "Shop gifts for him in Pakistan. Explore gift boxes and hampers for birthdays, anniversaries and meaningful surprises for the men who matter to you.",
    builder: {
      heading: "His Favourite Things, All in One Box",
      paragraph:
        "You know his little favourites. Choose the gifts, add your message, and build a box that shows you’ve been paying attention. Make it personal, with choices that work for your budget.",
      steps: [
        "Choose Your Box",
        "Pick His Gifts",
        "Add Your Message",
        "Send It To Your Loved Ones",
      ],
      cta: "Build His Gift Box",
      route: "/build-gift-box",
    },
    faqHeading: "A Little Help Choosing His Gift",
    faqIntroduction: "A few useful details before you send something his way.",
    faqDefaultOpenId: "build-his-box",
    faqItems: [
      {
        id: "choose-his-gift",
        question: "How do I choose a gift for him?",
        answer:
          "Start with what he enjoys, something he uses often, or a little detail you’ve noticed. Browse by occasion and budget, or build a gift box with items chosen especially for him.",
      },
      {
        id: "build-his-box",
        question: "Can I build my own gift box for him?",
        answer:
          "Yes. Choose your box, pick the gifts, and add your message. For delivery outside Karachi, select items eligible for nationwide shipping.",
      },
      {
        id: "personalize-his-gift",
        question: "Can I personalize his gift?",
        answer:
          "Contact us on WhatsApp before ordering to discuss the personalization options available for your chosen gift. Personalized items require additional preparation time.",
      },
      {
        id: "deliver-men-pakistan",
        question: "Do you deliver gifts for men across Pakistan?",
        answer:
          "Selected gifts are available for delivery across Pakistan. Flowers and edible items cannot ship nationwide. Check delivery eligibility for the items you choose and your recipient’s location.",
      },
      {
        id: "same-day-karachi-him",
        question: "Can I get same-day gift delivery in Karachi?",
        answer:
          "Yes. Eligible flowers and non-customized gifts listed on our website are available for same-day Karachi delivery when ordered before 2 PM Pakistan time.",
      },
      {
        id: "send-him-from-abroad",
        question: "Can I send him a gift while I’m abroad?",
        answer:
          "You can choose gifts for recipients in Pakistan. Check delivery eligibility and contact us before ordering if you need help with payment options or personalization.",
      },
      {
        id: "returns-him",
        question: "What is your return and refund policy?",
        answer:
          "Our return/refund policy has a 14-day window. Please read the full policy for eligibility, conditions, and exclusions.",
      },
    ],
    profileLabels: {
      father: "Father",
      brother: "Brother",
      boyfriend: "Boyfriend",
      son: "Son",
      husband: "Husband",
      friend: "Friend",
    },
    occasionLabels: {},
  },
  her: {
    key: "her",
    collectionId: "giftsForHer",
    route: "/giftforher",
    navigationLabel: "Gifts for Her",
    heading: "Gifts for Her in Pakistan",
    introduction:
      "For her birthday, a milestone, or a little thank-you. Explore gifts for the women who matter to you, or build a box around her favourite things. Add a personal message and make it something she’ll love to unwrap.",
    seoTitle: "Gifts for Her in Pakistan | Gift Unwrap",
    seoDescription:
      "Shop gifts for her in Pakistan. Explore gift boxes and hampers for birthdays, anniversaries and thoughtful surprises chosen with her in mind.",
    builder: {
      heading: "Make It Feel Like\nYou Chose It for Them",
      paragraph:
        "You know the little things they love. Choose their favourites, add your words, and create a gift box that feels personally chosen.",
      steps: [
        "Pick Her Gifts",
        "Choose Your Box",
        "Add Your Message",
        "Send It To Your Loved Ones",
      ],
      cta: "Build Your Own Gift Box",
      route: "/build-gift-box",
    },
    faqHeading: "A Little Help Choosing Her Gift",
    faqIntroduction: "A few useful details before you send something her way.",
    faqDefaultOpenId: "build-her-box",
    faqItems: [
      {
        id: "choose-her-gift",
        question: "How do I choose a gift for her?",
        answer: sharedAnswers.choosingPending,
      },
      {
        id: "build-her-box",
        question: "Can I build my own gift box for her?",
        answer: sharedAnswers.buildBox,
      },
      {
        id: "personalize-her-gift",
        question: "Can I personalize her gift?",
        answer: sharedAnswers.personalization,
      },
      {
        id: "deliver-women-pakistan",
        question: "Do you deliver gifts for women across Pakistan?",
        answer: sharedAnswers.nationwide,
      },
      {
        id: "same-day-karachi-her",
        question: "Can I get same-day gift delivery in Karachi?",
        answer: sharedAnswers.sameDay,
      },
      {
        id: "send-her-from-abroad",
        question: "Can I send her a gift while I’m abroad?",
        answer: sharedAnswers.abroad,
      },
      {
        id: "returns-her",
        question: "What is your return and refund policy?",
        answer: sharedAnswers.returns,
        href: "/refund-return-policy",
        linkLabel: "Read the return and refund policy",
      },
    ],
    profileLabels: {
      mum: "Mother",
      sister: "Sister",
      girlfriend: "Girlfriend",
      daughter: "Daughter",
      wife: "Wife",
      friend: "Friend",
    },
    occasionLabels: {},
  },
  birthday: {
    key: "birthday",
    collectionId: "birthday",
    sourceCollectionIds: [
      "giftsForHim",
      "giftsForHer",
      "giftsForCompany",
      "giftsForBabies",
      "FlowersChocolates",
      "giftsForEveryone",
    ],
    productScope: "birthday",
    fixedOccasion: {
      value: "birthday",
      label: "Birthday",
    },
    featuredSortLabel: "Best Selling",
    alwaysShowPagination: true,
    route: "/Giftforbirthday",
    navigationLabel: "Birthday Gifts",
    heading: "Birthday Gifts in Pakistan",
    introduction:
      "Their favourite things. A message only you could write. A little birthday happiness, wrapped up together. Explore thoughtful birthday gifts or build a box that feels just like them.",
    seoTitle: "Birthday Gifts in Pakistan | Gift Unwrap",
    seoDescription:
      "Explore birthday gifts in Pakistan for friends and family. Choose a thoughtful hamper or build a gift box around their favourite things and your budget.",
    builder: {
      heading: "Their Favourite Things,\nOne Happy Birthday Box",
      paragraph:
        "You know what makes them smile. Pick a box, fill it with their favourites, and add a personal message. Make their birthday feel a little more like them.",
      steps: [
        "Choose Your Box",
        "Pick Their Gifts",
        "Add Your Message",
        "Send Some Birthday Happiness",
      ],
      cta: "Build Their Birthday Box",
      route: "/build-gift-box",
    },
    faqHeading: "A Little Help With Their Birthday Gift",
    faqIntroduction: "A few useful details before you send their surprise.",
    faqItems: [
      {
        id: "thoughtful-birthday-gift",
        question: "What is a thoughtful birthday gift?",
        answer:
          "Start with something they enjoy, use often, or have mentioned wanting. A gift chosen around their interests, with a personal message, can make even a small gesture feel special.",
      },
      {
        id: "build-birthday-box",
        question: "Can I build my own birthday gift box?",
        answer:
          "Yes. Choose your box, pick the gifts, and add your message. If your recipient lives outside Karachi, select items eligible for nationwide shipping.",
      },
      {
        id: "personalize-birthday-gift",
        question: "Can I personalize a birthday gift?",
        answer:
          "Contact us on WhatsApp before ordering to discuss personalization options for your chosen gift. Customization requires additional preparation time.",
        href: "https://wa.me/923268927354",
        linkLabel: "Contact us on WhatsApp",
      },
      {
        id: "birthday-delivery-pakistan",
        question: "Do you deliver birthday gifts across Pakistan?",
        answer:
          "Selected gifts can be delivered across Pakistan, with an estimated delivery time of 4–5 business days depending on the destination. Flowers and edible items cannot ship nationwide. Customization takes additional time.",
      },
      {
        id: "same-day-birthday-karachi",
        question: "Can I get same-day birthday gift delivery in Karachi?",
        answer:
          "Yes. Eligible flowers and non-customized gifts listed on our website are available for same-day Karachi delivery when ordered before 2 PM Pakistan time.",
      },
      {
        id: "birthday-from-abroad",
        question: "Can I send a birthday gift to Pakistan from abroad?",
        answer:
          "You can choose a gift for someone in Pakistan and enter their delivery details when ordering. Check the product’s delivery eligibility and contact us if you need help with payment options or personalization.",
        href: "https://wa.me/923268927354",
        linkLabel: "Contact us on WhatsApp",
      },
      {
        id: "birthday-returns",
        question: "What is your return and refund policy?",
        answer:
          "Our return/refund policy has a 14-day window. Please read the full policy for eligibility, conditions, and exclusions.",
        href: "/refund-return-policy",
        linkLabel: "Read the return and refund policy",
      },
    ],
    profileLabels: {
      father: "Father",
      brother: "Brother",
      boyfriend: "Boyfriend",
      son: "Son",
      husband: "Husband",
      mum: "Mother",
      sister: "Sister",
      girlfriend: "Girlfriend",
      daughter: "Daughter",
      wife: "Wife",
      friend: "Friend",
      bouquets: "Bouquets",
      cakebouquets: "Cake Bouquets",
    },
    occasionLabels: {
      birthday: "Birthday",
    },
  },
  personalized: {
    key: "personalized",
    collectionId: "personalized",
    sourceCollectionIds: [
      "giftsForHim",
      "giftsForHer",
      "giftsForCompany",
      "giftsForBabies",
      "giftsForReligions",
      "FlowersChocolates",
      "giftsForEveryone",
    ],
    productScope: "personalized",
    featuredSortLabel: "Featured",
    alwaysShowPagination: true,
    route: "/personalized-gifts",
    navigationLabel: "Personalized Gifts",
    heading: "Personalized Gifts in Pakistan",
    introduction:
      "Their name. Your words. A little detail that means something to both of you. Explore gifts you can make more personal, and let’s create something that feels like it was chosen just for them.",
    seoTitle: "Personalized Gifts in Pakistan | Gift Unwrap",
    seoDescription:
      "Make your gift more personal with Gift Unwrap. Discuss available personalization options, pricing, preparation time and delivery before ordering.",
    builder: {
      heading: "A Little Detail.\nA Lot of Meaning.",
      paragraph:
        "An inside joke, a meaningful date, or words you’ve been meaning to say. Tell us what you have in mind, and we’ll help you explore what’s possible for your chosen gift.",
      steps: [
        "Choose Their Gift",
        "Share Your Idea",
        "Confirm the Details",
        "Arrange Their Surprise",
      ],
      cta: "Let’s Make It Personal",
      route:
        "https://wa.me/923268927354?text=Hi%20Gift%20Unwrap%2C%20I%E2%80%99d%20like%20to%20ask%20about%20personalizing%20a%20gift.",
    },
    emptyState: {
      heading: "Let’s find what can be made personal",
      message:
        "Personalization options depend on the gift. Contact us to confirm what’s possible, the price, preparation time, and delivery before ordering.",
      cta: "Ask About Personalization",
      route:
        "https://wa.me/923268927354?text=Hi%20Gift%20Unwrap%2C%20I%E2%80%99d%20like%20to%20ask%20which%20gifts%20can%20be%20personalized.",
    },
    faqHeading: "A Little Help Making It Personal",
    faqIntroduction: "The useful details before we bring your idea to life.",
    faqItems: [
      {
        id: "how-to-personalize",
        question: "How can I personalize a gift?",
        answer:
          "Choose a gift you like, then contact us on WhatsApp before ordering. Share the detail you’d like to add, such as a name, message, or colour preference. We’ll confirm what’s available for that product.",
      },
      {
        id: "every-gift-personalized",
        question: "Can every gift be personalized?",
        answer:
          "Personalization options vary by product. Message us with your chosen gift and your idea so we can confirm what’s possible before you order.",
      },
      {
        id: "order-personalized-gift",
        question: "How do I order a personalized gift?",
        answer:
          "Contact us on WhatsApp first to confirm your personalization request, price, preparation time, and delivery eligibility. We’ll then guide you through placing your order.",
      },
      {
        id: "personalized-preparation-time",
        question: "How long does a personalized gift take?",
        answer:
          "Personalized gifts need additional preparation time. The timing depends on the product and your request, so please confirm it with us before ordering, especially if you’re buying for a specific date.",
      },
      {
        id: "personalized-delivery-pakistan",
        question: "Do you deliver personalized gifts across Pakistan?",
        answer:
          "Selected gifts are eligible for delivery across Pakistan. Availability depends on the item and destination. Flowers and edible items cannot ship nationwide. Contact us to confirm delivery options for your chosen gift.",
      },
      {
        id: "same-day-personalized-karachi",
        question: "Can I get same-day delivery for a personalized gift in Karachi?",
        answer:
          "Our same-day Karachi delivery service applies to eligible non-customized gifts and flowers ordered before 2 PM Pakistan time. Personalized gifts require additional preparation, so please contact us to discuss timing.",
      },
      {
        id: "handwritten-note",
        question: "Can I include a handwritten note?",
        answer:
          "We can help you add a handwritten note to your gift. Share your message when arranging the order, and we’ll confirm the details with you.",
      },
      {
        id: "personalized-gift-from-abroad",
        question:
          "Can I order a personalized gift for someone in Pakistan while I’m abroad?",
        answer:
          "Yes. Contact us on WhatsApp to discuss your gift, personalization request, recipient’s location, and payment options before ordering.",
      },
    ],
    profileLabels: {
      father: "Father",
      brother: "Brother",
      boyfriend: "Boyfriend",
      son: "Son",
      husband: "Husband",
      mum: "Mother",
      sister: "Sister",
      girlfriend: "Girlfriend",
      daughter: "Daughter",
      wife: "Wife",
      friend: "Friend",
      bouquets: "Bouquets",
      cakebouquets: "Cake Bouquets",
    },
    occasionLabels: {},
  },
  greetingCards: {
    key: "greetingCards",
    collectionId: "greetingCards",
    directPurchaseOnly: true,
    profileFilteringSupported: false,
    featuredSortLabel: "Featured",
    alwaysShowPagination: true,
    route: "/greeting-cards",
    navigationLabel: "Greeting Cards",
    heading: "Greeting Cards in Pakistan",
    introduction:
      "For a big birthday, a heartfelt thank-you, or a little “hope you feel better.” Find a greeting card that sounds like you and says what they mean to you. Sometimes, a few thoughtful words are the part they’ll keep.",
    seoTitle: "Greeting Cards in Pakistan | Gift Unwrap",
    seoDescription:
      "Add a greeting card to your Gift Unwrap gift box. Explore available designs and share a personal message for birthdays, thank-yous and special moments.",
    builder: {
      heading: "A Thoughtful Gift.\nA Few Words From You.",
      paragraph:
        "Pair your card with a box of their favourite things. A little treat, something they’ll use, and a message that brings it all together. Make it a gift they’ll enjoy opening and a note they’ll want to keep.",
      steps: [
        "Choose Your Box",
        "Pick Their Gifts",
        "Add a Greeting Card",
        "Share Your Message",
      ],
      cta: "Build Their Gift Box",
      route: "/build-gift-box",
    },
    faqHeading: "A Little Help Finding the Words",
    faqIntroduction: "A few useful details before you choose their card.",
    faqItems: [
      {
        id: "greeting-card-occasions",
        question: "What occasions can I find greeting cards for?",
        answer:
          "Explore cards for birthdays, thank-yous, and get-well wishes. Browse the available designs to find something that suits your occasion and the person receiving it.",
      },
      {
        id: "what-to-write",
        question: "What should I write in a greeting card?",
        answer:
          "Start with something personal: a memory you share, something you appreciate about them, or a simple wish for their day. You don’t need perfect words. A few honest lines can mean a lot.",
      },
      {
        id: "handwritten-greeting-message",
        question: "Can I include a handwritten message?",
        answer:
          "We offer handwritten notes with gifts. Contact us to confirm how your message can be included with your chosen greeting card before ordering.",
      },
      {
        id: "card-with-gift-box",
        question: "Can I add a greeting card to a gift box?",
        answer:
          "Choose the card you’d like to pair with your gift. If you need help adding it to your box, contact us before ordering so we can confirm the available options.",
      },
      {
        id: "custom-card-design",
        question: "Can I personalize the card’s design or printed text?",
        answer:
          "Contact us on WhatsApp with your chosen card and request. We’ll confirm whether customization is available, along with any additional cost and preparation time.",
        href:
          "https://wa.me/923268927354?text=Hi%20Gift%20Unwrap%2C%20I%E2%80%99d%20like%20to%20ask%20about%20customizing%20a%20greeting%20card.",
        linkLabel: "Contact us on WhatsApp",
      },
      {
        id: "send-card-from-abroad",
        question:
          "Can I send a greeting card with a gift to someone in Pakistan while I’m abroad?",
        answer:
          "Yes. Choose a gift and card for your recipient in Pakistan. Check delivery eligibility and contact us before ordering if you need help including your message or arranging payment.",
      },
      {
        id: "greeting-card-delivery-time",
        question: "How long will delivery take?",
        answer:
          "Timing depends on the destination, the items in your order, and any customization. Selected gifts have an estimated delivery time of 4–5 business days across Pakistan. Contact us to confirm timing for your card and gift before ordering.",
      },
      {
        id: "greeting-card-returns",
        question: "What is your return and refund policy?",
        answer:
          "Our return/refund policy has a 14-day window. Please read the full policy for eligibility, conditions, and exclusions, including how it applies to customized items.",
        href: "/refund-return-policy",
        linkLabel: "Read the return and refund policy",
      },
    ],
    profileLabels: {},
    occasionLabels: {},
  },
  floral: {
    key: "floral",
    collectionId: "FlowersChocolates",
    productScope: "floral",
    profileFilteringSupported: false,
    featuredSortLabel: "Sorting unavailable",
    sortingSupported: false,
    alwaysShowPagination: true,
    route: "/floral-arrangements",
    navigationLabel: "Floral Arrangements",
    heading: "Flowers & Floral Arrangements in Karachi",
    headingAmpersandSans: true,
    introduction:
      "For the birthday you wouldn’t miss, the thank-you you’ve been meaning to send, or a little “thinking of you.” Choose flowers that bring your feelings to their doorstep and give them a reason to smile.",
    seoTitle: "Flowers & Bouquets in Karachi | Gift Unwrap",
    seoDescription:
      "Send flowers in Karachi for birthdays, anniversaries and thoughtful surprises. Explore bouquets and floral arrangements, and check delivery availability.",
    faqHeading: "A Little Help Sending Flowers",
    faqIntroduction: "A few useful details before you brighten their day.",
    faqItems: [
      {
        id: "floral-delivery-pakistan",
        question: "Do you deliver flowers across Pakistan?",
        answer:
          "Our flowers and floral arrangements are available for delivery in Karachi only. For recipients elsewhere in Pakistan, explore gifts marked as eligible for nationwide shipping.",
      },
      {
        id: "same-day-flowers-karachi",
        question: "Do you offer same-day flower delivery in Karachi?",
        answer:
          "Yes. Eligible flowers listed on our website are available for same-day Karachi delivery when ordered before 2 PM Pakistan time. Check eligibility for your chosen arrangement and delivery location before ordering.",
      },
      {
        id: "send-flowers-from-abroad",
        question: "Can I send flowers to Karachi while I’m abroad?",
        answer:
          "Yes. Choose an arrangement and enter your recipient’s Karachi delivery details when ordering. Contact us before placing your order if you need help with payment options or a special request.",
      },
      {
        id: "personal-message-flowers",
        question: "Can I include a personal message with the flowers?",
        answer:
          "Yes. We offer handwritten notes with gifts. Share your message when ordering, or contact us if you need help arranging it.",
      },
      {
        id: "specific-flowers-colours",
        question: "Can I request specific flowers or colours?",
        answer:
          "Contact us on WhatsApp before ordering with your preferences. We’ll confirm whether your request is available, along with any price difference or additional preparation time.",
        href: "https://wa.me/923268927354",
        linkLabel: "Contact us on WhatsApp",
      },
      {
        id: "flower-delivery-date-time",
        question: "Can I choose a specific delivery date or time?",
        answer:
          "Contact us before ordering to check availability for your preferred date. Please confirm any timing requirements with us before placing your order.",
        href: "https://wa.me/923268927354",
        linkLabel: "Contact us on WhatsApp",
      },
      {
        id: "floral-occasions",
        question: "What occasions are floral arrangements suitable for?",
        answer:
          "Flowers make thoughtful gifts for birthdays, anniversaries, thank-yous, and get-well wishes. You can also send an arrangement simply to let someone know you’re thinking of them.",
      },
    ],
    profileLabels: {},
    occasionLabels: {},
  },
  sweetTreats: {
    key: "sweetTreats",
    collectionId: "sweetTreats",
    sourceCollectionIds: [
      "giftsForHer",
      "giftsForHim",
      "giftsForCompany",
      "giftsForBabies",
      "giftsForReligions",
      "FlowersChocolates",
      "giftsForEveryone",
    ],
    productScope: "sweetTreats",
    profileFilteringSupported: false,
    featuredSortLabel: "Sorting unavailable",
    sortingSupported: false,
    alwaysShowPagination: true,
    route: "/sweet-treats",
    navigationLabel: "Sweet Treats",
    heading: "Sweet Treats Delivered in Karachi",
    introduction:
      "For the friend who never skips dessert, Ammi’s evening chai, or a birthday that calls for something sweet. Explore cakes, brownies, and cookies to share, surprise, and make an ordinary day feel a little more special.",
    seoTitle: "Chocolate Gifts & Sweet Hampers in Karachi | Gift Unwrap",
    seoDescription:
      "Explore chocolate gifts and sweet hampers in Karachi. Choose a thoughtful treat for birthdays, celebrations or a little surprise to brighten their day.",
    faqHeading: "A Little Help Choosing Something Sweet",
    faqIntroduction: "A few useful details before you send their treat.",
    faqItems: [
      {
        id: "available-sweet-treats",
        question: "What sweet treats can I order?",
        answer:
          "Explore the cakes, brownies, and cookies listed in our collection. Check each product page for its available flavours, size, quantity, and ordering details.",
      },
      {
        id: "sweet-treats-pakistan-delivery",
        question: "Do you deliver sweet treats across Pakistan?",
        answer:
          "Our edible gifts are available for Karachi delivery only. For recipients elsewhere in Pakistan, explore gifts marked as eligible for nationwide shipping.",
      },
      {
        id: "same-day-sweet-treats-karachi",
        question: "Can I get same-day delivery in Karachi?",
        answer:
          "Same-day delivery depends on the item’s availability and preparation requirements. Contact us before ordering to confirm whether your chosen treat and delivery location are eligible. Please don’t assume every cake or baked item is available the same day.",
        href: "https://wa.me/923268927354",
        linkLabel: "Contact us on WhatsApp",
      },
      {
        id: "send-sweet-treats-from-abroad",
        question: "Can I send sweet treats to Karachi while I’m abroad?",
        answer:
          "Yes. Choose a treat for your recipient in Karachi and enter their delivery details when ordering. Contact us before placing your order if you need help with payment options or a special request.",
      },
      {
        id: "sweet-treat-personal-message",
        question: "Can I add a personal message?",
        answer:
          "We offer handwritten notes with gifts. Share your message when ordering, or contact us to confirm how it can be included with your chosen treat.",
      },
      {
        id: "custom-cake-message-design",
        question: "Can I request a custom cake message or design?",
        answer:
          "Contact us on WhatsApp before ordering to discuss your request. We’ll confirm whether it’s available, along with the price and any additional preparation time.",
        href: "https://wa.me/923268927354",
        linkLabel: "Contact us on WhatsApp",
      },
      {
        id: "sweet-treat-ingredients-allergens",
        question: "How can I check ingredients or allergens?",
        answer:
          "Check the product information and contact us before ordering if your recipient has a food allergy or dietary requirement. Please confirm suitability for the specific item rather than assuming it is allergen-free.",
        href: "https://wa.me/923268927354",
        linkLabel: "Contact us on WhatsApp",
      },
      {
        id: "sweet-treat-special-date",
        question: "Can I arrange delivery for a birthday or special date?",
        answer:
          "Contact us before ordering to check availability and preparation time for your preferred date. Confirm any delivery timing requirements before completing your purchase.",
        href: "https://wa.me/923268927354",
        linkLabel: "Contact us on WhatsApp",
      },
    ],
    profileLabels: {},
    occasionLabels: {},
  },
};

