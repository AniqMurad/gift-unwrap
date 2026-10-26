import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { fetchBlogs, fetchProductCollections } from "../config/api";
import { generateSlug } from "../utils/slugify";
import stepChooseBox from "../assets/redesign/step-choose-box.png";
import stepPickGifts from "../assets/redesign/step-pick-gifts.png";
import stepAddMessage from "../assets/redesign/step-add-message.png";
import stepSend from "../assets/redesign/step-send-updated.png";
import categoryHampers from "../assets/redesign/category-hampers.png";
import categoryFlowers from "../assets/redesign/category-flowers.png";
import categoryCorporate from "../assets/redesign/category-corporate.png";
import categorySweets from "../assets/redesign/category-sweets.png";
import categoryCards from "../assets/redesign/category-cards.svg";
import guaranteeMedal from "../assets/redesign/guarantee-badge.png";
import testimonialPeg from "../assets/redesign/testimonial-vector-2.svg";
import testimonialAvatarRingLight from "../assets/redesign/testimonial-avatar-ring-light.svg";
import testimonialAvatarRingDark from "../assets/redesign/testimonial-avatar-ring-dark.svg";
import testimonialSajila from "../assets/redesign/testimonial-sajila.png";
import testimonialAreeba from "../assets/redesign/testimonial-areeba.png";
import testimonialMariyam from "../assets/redesign/testimonial-mariyam.png";
import testimonialAli from "../assets/redesign/testimonial-ali.png";
import testimonialHira from "../assets/redesign/testimonial-hira.png";
import { homepageTestimonials } from "./ReviewsData";
import CartoonButton from "./ui/cartoon-button";
import FeatureCard from "./ui/feature-card-1";
import FAQSection from "./ui/faq1";

const ArrowButton = ({ direction, onClick, label, disabled = false }) => (
  <button className={`gu-arrow-button gu-arrow-button--${direction}`} type="button" onClick={onClick} aria-label={label} disabled={disabled}>
    {direction === "left" ? <ChevronLeft aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
  </button>
);

const useRailControls = (rail, refreshKey) => {
  const [state, setState] = useState({ canPrevious: false, canNext: false });

  useEffect(() => {
    const element = rail.current;
    if (!element) return undefined;
    const update = () => setState({
      canPrevious: element.scrollLeft > 2,
      canNext: element.scrollLeft + element.clientWidth < element.scrollWidth - 2,
    });
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    Array.from(element.children).forEach((child) => observer.observe(child));
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [rail, refreshKey]);

  return state;
};

export const GiftBoxSteps = () => {
  const steps = [
    { title: "Pick Their Gifts", imageSrc: stepPickGifts, imageWidth: 154, imageHeight: 115 },
    { title: "Choose Your Box", imageSrc: stepChooseBox, imageWidth: 144, imageHeight: 101 },
    { title: "Add Your Message", imageSrc: stepAddMessage, imageWidth: 134, imageHeight: 111 },
    { title: "Send It To Your Loved Ones", imageSrc: stepSend, imageWidth: 196, imageHeight: 154, imageOffsetX: -16 },
  ];

  return (
    <section className="gu-section gu-steps-section" aria-labelledby="steps-title">
      <div className="gu-section-heading gu-section-heading--center">
        <h2 id="steps-title">Make It Feel Like<br />You Chose It for Them</h2>
        <p>You know the little things they love. Choose their favourites, add your words, and create a gift box that feels personally chosen.</p>
      </div>
      <ol className="gu-steps-grid">
        {steps.map((step, index) => <FeatureCard {...step} number={index + 1} key={step.title} />)}
      </ol>
      <CartoonButton label="Build Your Own Gift Box" color="#c8b2eb" to="/build-gift-box" />
    </section>
  );
};

const categories = [
  {
    title: "Curated Gift Hampers",
    description: "Thoughtfully paired gifts for birthdays, anniversaries, and the thank-yous you’ve been meaning to send.",
    link: "Shop Gift Hampers →",
    route: "/#featured-gifts",
    image: categoryHampers,
  },
  {
    title: "Flowers & Bouquets",
    description: "For a celebration, a little encouragement, or a simple “thinking of you.” Send flowers to brighten someone’s day in Karachi.",
    link: "Shop Bouquets →",
    route: "/floral-arrangements",
    image: categoryFlowers,
  },
  {
    title: "Corporate Gifts",
    description: "Celebrate milestones and thank clients or colleagues with gifts that make your appreciation feel personal.",
    link: "Shop Corporate Gifts →",
    route: "/giftforcompanies",
    image: categoryCorporate,
  },
  {
    title: "Sweet Treats",
    description: "Make their day a little sweeter with cakes, brownies, and cookies for celebrations or just-because surprises.",
    link: "Shop Sweets →",
    route: "/sweet-treats",
    image: categorySweets,
  },
  {
    title: "Greeting Cards",
    description: "For happy birthdays, heartfelt thank-yous, and get-well wishes—find a card that helps you say what matters.",
    link: "Shop Cards →",
    route: "/greeting-cards",
    image: categoryCards,
  },
];

export const GiftCategories = () => {
  const rail = useRef(null);
  const controls = useRailControls(rail, categories.length);
  const scroll = (direction) => {
    const element = rail.current;
    const card = element?.querySelector(".gu-category-card");
    if (!element || !card) return;
    const styles = getComputedStyle(element);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    element.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  return (
    <section className="gu-section gu-categories-section" aria-labelledby="categories-title">
      <div className="gu-section-heading gu-categories-heading">
        <h2 id="categories-title">A Thoughtful Gift Starts Here</h2>
        <p>You know the little things they love. Put them together in a gift box that feels like theirs, from the items inside to the note they’ll read first.</p>
      </div>
      <div className="gu-category-rail" ref={rail}>
        {categories.map((category) => (
          <Link className="gu-category-card" to={category.route} key={category.title}>
            <img src={category.image} alt="" aria-hidden="true" />
            <div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <span>{category.link}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="gu-carousel-controls gu-category-controls">
        <ArrowButton direction="left" onClick={() => scroll(-1)} label="Previous gift category" disabled={!controls.canPrevious} />
        <ArrowButton direction="right" onClick={() => scroll(1)} label="Next gift category" disabled={!controls.canNext} />
      </div>
    </section>
  );
};

export const GuaranteeStrip = () => (
  <aside className="gu-guarantee" aria-label="Gift Unwrap guarantee">
    <img src={guaranteeMedal} alt="" aria-hidden="true" />
    <p><strong>Always Perfect Guarantee.</strong> Made a mistake? We’ll replace it for free!</p>
    <Info size={17} aria-label="Guarantee information" />
  </aside>
);

const budgetValues = [500, 1000, 2000, 3000, 4000, 5000, 6000];

export const GiftFinder = () => {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState({ minimum: 500, maximum: budgetValues.at(-1) });
  const minimumIndex = budgetValues.indexOf(budget.minimum);
  const maximumIndex = budgetValues.indexOf(budget.maximum);
  const minimumPosition = (minimumIndex / (budgetValues.length - 1)) * 100;
  const maximumPosition = (maximumIndex / (budgetValues.length - 1)) * 100;
  const setMinimum = (index) => setBudget((current) => ({ ...current, minimum: budgetValues[Math.min(index, maximumIndex - 1)] }));
  const setMaximum = (index) => setBudget((current) => ({ ...current, maximum: budgetValues[Math.max(index, minimumIndex + 1)] }));
  const startSearch = () => {
    const params = new URLSearchParams({ minPrice: String(budget.minimum) });
    if (recipient) params.set("recipient", recipient);
    if (occasion) params.set("occasion", occasion);
    if (budget.maximum < budgetValues.at(-1)) {
      params.set("maxPrice", String(budget.maximum));
    }
    navigate(`/SearchOutput?${params.toString()}`);
  };

  return (
    <section className="gu-section gu-finder-section" aria-labelledby="finder-title">
      <div className="gu-section-heading gu-section-heading--center">
        <h2 id="finder-title">Find a Gift That Feels Like Them</h2>
        <p>Tell us who it’s for, what they’re celebrating, and your budget. We’ll help you explore the options.</p>
      </div>
      <div className="gu-finder-panel">
        <label>Who is it for?
          <span className="gu-select-wrap">
            <select value={recipient} onChange={(event) => setRecipient(event.target.value)}><option value="" disabled>Choose a recipient</option><option value="him">Him</option><option value="her">Her</option><option value="friend">Friend</option><option value="family">Family</option></select>
            <ChevronDown className="gu-select-chevron" aria-hidden="true" />
          </span>
        </label>
        <label>For which profile?
          <span className="gu-select-wrap">
            <select value={occasion} onChange={(event) => setOccasion(event.target.value)}><option value="" disabled>Choose an attribute</option><option value="birthday">Birthday</option><option value="anniversary">Anniversary</option><option value="congratulations">Congratulations</option><option value="just-because">Just because</option></select>
            <ChevronDown className="gu-select-chevron" aria-hidden="true" />
          </span>
        </label>
        <fieldset className="gu-budget-control" style={{ "--gu-budget-start": `${minimumPosition}%`, "--gu-budget-end": `${maximumPosition}%` }}>
          <legend>Set your budget</legend>
          <span className="gu-budget-labels"><span>500</span><span>1000</span><span>2000</span><span>3000</span><span>4000</span><span>5000</span><span>∞</span></span>
          <div className="gu-budget-slider">
            <span className="gu-budget-track" aria-hidden="true" />
            <span className="gu-budget-ticks" aria-hidden="true">{Array.from({ length: 5 }).map((_, index) => <i key={index} />)}</span>
            <input aria-label="Minimum budget" aria-valuemin="500" aria-valuemax="6000" aria-valuenow={budget.minimum} aria-valuetext={`${budget.minimum} PKR`} type="range" min="0" max={budgetValues.length - 1} step="1" value={minimumIndex} onChange={(event) => setMinimum(Number(event.target.value))} />
            <input aria-label="Maximum budget" aria-valuemin="500" aria-valuemax="6000" aria-valuenow={budget.maximum} aria-valuetext={budget.maximum === 6000 ? "No maximum" : `${budget.maximum} PKR`} type="range" min="0" max={budgetValues.length - 1} step="1" value={maximumIndex} onChange={(event) => setMaximum(Number(event.target.value))} />
          </div>
        </fieldset>
        <CartoonButton
          className="gu-finder-submit"
          label="Start The Search"
          color="#ff2b3a"
          onClick={startSearch}
          title="Find matching gifts"
        />
      </div>
    </section>
  );
};

const productTabs = ["GIFT BOX", "FLORAL ARRANGEMENTS", "SWEET TREATS", "GREETING CARDS"];

const ProductCard = ({ product, interactive = true, tabbable = interactive }) => {
  const navigate = useNavigate();
  const slug = generateSlug(product.name);
  const image = product.image || product.images?.[0];
  const productPath = `/product/${encodeURIComponent(product.category)}/${encodeURIComponent(slug)}`;
  const openProduct = interactive
    ? () => navigate(productPath, { state: { productData: product } })
    : undefined;

  return (
    <article className="gu-featured-card">
      <button className="gu-product-image" type="button" tabIndex={tabbable ? 0 : -1} onClick={openProduct}>
        {product.discountPercentage > 0 && <span className="gu-sale-chip">SALE</span>}
        <span className="gu-product-artwork"><img src={image} alt={product.name} loading="lazy" decoding="async" /></span>
      </button>
      <button className="gu-product-copy" type="button" tabIndex={tabbable ? 0 : -1} onClick={openProduct}>
        <h3>{product.name}</h3>
        <p><strong>{product.price} PKR</strong>{product.originalPrice && <del>{product.originalPrice} PKR</del>}</p>
      </button>
    </article>
  );
};

const ContinuousProductCarousel = ({ products }) => {
  const viewportRef = useRef(null);
  const firstGroupRef = useRef(null);
  const offsetRef = useRef(0);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const stepScrollTimeoutRef = useRef(0);
  const stepScrollingRef = useRef(false);
  const dragRef = useRef({ active: false, startX: 0, originOffset: 0, moved: false });
  const suppressClickRef = useRef(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstGroup = firstGroupRef.current;
    if (!viewport || !firstGroup) return undefined;

    const render = () => {
      const width = firstGroup.getBoundingClientRect().width;
      if (!width) return;
      offsetRef.current = ((offsetRef.current % width) + width) % width;
      viewport.style.setProperty("--gu-carousel-offset", `${-offsetRef.current}px`);
    };

    const observer = new ResizeObserver(render);
    observer.observe(firstGroup);
    render();

    const tick = (time) => {
      if (lastTimeRef.current && !focusWithin && !dragRef.current.active && !stepScrollingRef.current && !reducedMotion) {
        offsetRef.current += Math.min(time - lastTimeRef.current, 50) * 0.032;
        render();
      }
      lastTimeRef.current = time;
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
      window.clearTimeout(stepScrollTimeoutRef.current);
      stepScrollingRef.current = false;
      lastTimeRef.current = 0;
    };
  }, [focusWithin, products, reducedMotion]);

  const scrollByCard = (direction) => {
    const viewport = viewportRef.current;
    const firstGroup = firstGroupRef.current;
    const track = viewport?.querySelector(".gu-product-marquee-track");
    const card = firstGroup?.querySelector(".gu-featured-card");
    if (!viewport || !firstGroup || !track || !card || stepScrollingRef.current) return;

    const groupWidth = firstGroup.getBoundingClientRect().width;
    const styles = getComputedStyle(firstGroup);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const step = card.getBoundingClientRect().width + gap;

    stepScrollingRef.current = true;
    let visualStart = offsetRef.current;
    let visualTarget = visualStart + direction * step;

    if (visualTarget < 0) {
      visualStart += groupWidth;
      visualTarget += groupWidth;
      viewport.style.setProperty("--gu-carousel-offset", `${-visualStart}px`);
      track.getBoundingClientRect();
    }

    const normalizedTarget = ((visualTarget % groupWidth) + groupWidth) % groupWidth;
    offsetRef.current = normalizedTarget;

    if (reducedMotion) {
      viewport.style.setProperty("--gu-carousel-offset", `${-normalizedTarget}px`);
      stepScrollingRef.current = false;
      return;
    }

    viewport.classList.add("is-step-scrolling");
    viewport.style.setProperty("--gu-carousel-offset", `${-visualTarget}px`);
    stepScrollTimeoutRef.current = window.setTimeout(() => {
      viewport.classList.remove("is-step-scrolling");
      viewport.style.setProperty("--gu-carousel-offset", `${-normalizedTarget}px`);
      stepScrollingRef.current = false;
      lastTimeRef.current = performance.now();
    }, 280);
  };

  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      originOffset: offsetRef.current,
      moved: false,
    };
  };

  const onPointerMove = (event) => {
    if (!dragRef.current.active) return;
    const totalDelta = event.clientX - dragRef.current.startX;
    if (!dragRef.current.moved && Math.abs(totalDelta) < 10) return;
    if (!dragRef.current.moved) {
      dragRef.current.moved = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const width = firstGroupRef.current?.getBoundingClientRect().width || 1;
    offsetRef.current = dragRef.current.originOffset - totalDelta;
    offsetRef.current = ((offsetRef.current % width) + width) % width;
    event.currentTarget.style.setProperty("--gu-carousel-offset", `${-offsetRef.current}px`);
  };

  const finishDrag = (event) => {
    if (!dragRef.current.active) return;
    suppressClickRef.current = dragRef.current.moved;
    dragRef.current.active = false;
    if (dragRef.current.moved) setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onClickCapture = (event) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <div className="gu-product-marquee-shell">
      <div
        className={`gu-product-marquee${dragging ? " is-dragging" : ""}`}
        ref={viewportRef}
        aria-label="Featured gifts. Drag or swipe to browse."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onClickCapture={onClickCapture}
        onFocusCapture={() => setFocusWithin(true)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false); }}
      >
        <div className="gu-product-marquee-track">
          <div className="gu-product-marquee-group" ref={firstGroupRef}>
            {products.map((product, index) => <ProductCard product={product} key={`primary-${product.category}-${product.id}-${index}`} />)}
          </div>
          <div className="gu-product-marquee-group" aria-hidden="true">
            {products.map((product, index) => <ProductCard product={product} tabbable={false} key={`clone-${product.category}-${product.id}-${index}`} />)}
          </div>
        </div>
      </div>
      <div className="gu-product-marquee-controls" aria-label="Featured gift slider controls">
        <ArrowButton direction="left" onClick={() => scrollByCard(-1)} label="Show previous featured gift" disabled={products.length < 2} />
        <ArrowButton direction="right" onClick={() => scrollByCard(1)} label="Show next featured gift" disabled={products.length < 2} />
      </div>
    </div>
  );
};

export const FeaturedGifts = () => {
  const [activeTab, setActiveTab] = useState(productTabs[0]);
  const [gender, setGender] = useState("Male");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchProductCollections()
      .then(({ data }) => active && setGroups(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Failed to load homepage products:", error))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const products = useMemo(() => {
    const getGroup = (category) => groups.find((group) => group.category === category)?.products || [];
    let items = [];
    if (activeTab === "GIFT BOX") items = getGroup(gender === "Male" ? "giftsForHim" : "giftsForHer");
    if (activeTab === "FLORAL ARRANGEMENTS") items = getGroup("FlowersChocolates");
    if (activeTab === "SWEET TREATS") items = getGroup("FlowersChocolates").filter((item) => /cake|chocolate|sweet|brownie|cookie/i.test(`${item.name} ${item.keyGift || ""}`));
    if (activeTab === "GREETING CARDS") items = groups.flatMap((group) => (group.products || []).map((item) => ({ ...item, category: group.category }))).filter((item) => /card/i.test(`${item.name} ${item.keyGift || ""}`));
    const category = activeTab === "GIFT BOX" ? (gender === "Male" ? "giftsForHim" : "giftsForHer") : "FlowersChocolates";
    return items.map((item) => ({ ...item, category: item.category || category }));
  }, [activeTab, gender, groups]);

  const visibleProducts = products.length ? products : groups.flatMap((group) => (group.products || []).map((item) => ({ ...item, category: group.category }))).slice(0, 8);

  return (
    <section className="gu-section gu-featured-section" id="featured-gifts" aria-labelledby="featured-title">
      <div className="gu-section-heading gu-section-heading--center">
        <h2 id="featured-title">What Would Make Their Day?</h2>
        <p>Explore gifts for their favourite things, little celebrations, and moments worth remembering.</p>
      </div>
      <div className="gu-product-tabs" role="tablist" aria-label="Gift types">
        {productTabs.map((tab) => <button className={activeTab === tab ? "is-active" : ""} type="button" role="tab" aria-selected={activeTab === tab} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}
      </div>
      {activeTab === "GIFT BOX" && <div className="gu-gender-tabs"><button className={gender === "Male" ? "is-active" : ""} type="button" onClick={() => setGender("Male")}>Male</button><button className={gender === "Female" ? "is-active" : ""} type="button" onClick={() => setGender("Female")}>Female</button></div>}
      {loading
        ? <div className="gu-product-loading-rail">{Array.from({ length: 4 }).map((_, index) => <div className="gu-product-skeleton" key={index} />)}</div>
        : <ContinuousProductCarousel products={visibleProducts} />}
    </section>
  );
};

const TESTIMONIAL_CURVE = "M -260 18 C 220 104 650 106 960 106 C 1270 106 1700 104 2180 18";
const TESTIMONIAL_AVATARS = [testimonialSajila, testimonialAreeba, testimonialMariyam, testimonialAli, testimonialHira];

export const Testimonials = ({ variant = "default" }) => (
  <section className={`gu-section gu-testimonials gu-testimonials--${variant}`} aria-labelledby="testimonials-title">
    <div className="gu-section-heading gu-section-heading--center">
      <h2 id="testimonials-title">Their Gifts. Their Stories.</h2>
      <p>Read what customers have shared about choosing and sending gifts with Gift Unwrap.</p>
    </div>
    <div className="gu-testimonial-stage" tabIndex="0" aria-label="Customer testimonials. Focus or hover to pause the animation.">
      <div className="gu-testimonial-motion-plane">
        <svg className="gu-clothesline" viewBox="0 0 1920 130" preserveAspectRatio="none" aria-hidden="true"><path d={TESTIMONIAL_CURVE} /></svg>
        {homepageTestimonials.map((review, index) => (
          <div className="gu-testimonial-traveler" style={{ "--gu-testimonial-delay": `${index * (28 / homepageTestimonials.length)}s`, offsetPath: `path("${TESTIMONIAL_CURVE}")` }} key={review.id}>
            <article className={`gu-testimonial-card gu-testimonial-card--${["lilac", "white", "orange", "coral", "orange"][index]}`}>
              <img className="gu-testimonial-peg" src={testimonialPeg} alt="" aria-hidden="true" />
              <blockquote>
                {review.quoted !== false && <span className="gu-testimonial-quote">“</span>}
                {review.review}
                {review.quoted !== false && <span className="gu-testimonial-quote">”</span>}
              </blockquote>
              <div className="gu-testimonial-profile">
                <span className="gu-testimonial-avatar" aria-hidden="true">
                  <img className="gu-testimonial-avatar-ring" src={index === 1 ? testimonialAvatarRingDark : testimonialAvatarRingLight} alt="" />
                  <img className="gu-testimonial-avatar-photo" src={TESTIMONIAL_AVATARS[index]} alt="" />
                </span>
                <span>{review.name}</span>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const GiftGuides = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    fetchBlogs().then(({ data }) => active && setBlogs((Array.isArray(data) ? data : []).slice(0, 3))).catch((error) => console.error("Failed to load gift guides:", error)).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  return (
    <section className="gu-section gu-guides-section" aria-labelledby="guides-title">
      <div className="gu-guides-heading-row">
        <div className="gu-section-heading"><h2 id="guides-title">A Little Help Choosing Their Gift</h2><p>Gift ideas, card messages, and practical tips for making it feel personal.</p></div>
        <Link to="/blog">Explore Gift Guides →</Link>
      </div>
      <div className="gu-guide-grid">
        {loading ? Array.from({ length: 3 }).map((_, index) => <div className="gu-guide-skeleton" key={index} />) : blogs.map((blog) => (
          <Link className="gu-guide-card" key={blog.id} to={`/blog/${generateSlug(blog.title)}`}>
            <img src={blog.mainImage} alt={blog.title} loading="lazy" decoding="async" />
            <span>{blog.category}</span>
            <h3>{blog.title}</h3>
            <p>{blog.authorDate}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export const LandingFaqs = () => <FAQSection />;
