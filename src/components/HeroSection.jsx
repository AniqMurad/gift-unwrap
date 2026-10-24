import heroArtwork from "../assets/redesign/hero-gift-box.png";
import heroVideo from "../assets/redesign/hero-composition.webm";
import CartoonButton from "./ui/cartoon-button";

const HeroSection = () => {
  return (
    <section className="gu-hero" aria-labelledby="gu-hero-heading">
      <div className="gu-hero-media" aria-hidden="true">
        <video
          className="gu-hero-video"
          autoPlay
          loop
          muted
          playsInline
          poster={heroArtwork}
          preload="metadata"
        >
          <source src={heroVideo} type="video/webm" />
        </video>
        <img className="gu-hero-poster" src={heroArtwork} alt="" fetchPriority="high" />
      </div>
      <div className="gu-hero-content">
        <h1 id="gu-hero-heading">
          Send Gifts to Your
          <br />
          Loved Ones in Pakistan
        </h1>
        <p>
          A birthday surprise. A little thank-you. Something that says, “I care
          for you.” Choose a ready-made hamper or build a gift box around their
          favourite things and your budget, whether you’re nearby or celebrating
          from afar.
        </p>
        <div className="gu-hero-actions">
          <CartoonButton label="Shop Gifts" color="#ff2b3a" to="/giftforeveryone" />
          <CartoonButton label="Build Your Own Gift Box" to="/build-gift-box" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
