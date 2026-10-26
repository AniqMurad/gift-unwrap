import photo1 from "../assets/redesign/cta-photo-1.jpg";
import photo2 from "../assets/redesign/cta-photo-2.jpg";
import photo3 from "../assets/redesign/cta-photo-3.jpg";
import photo4 from "../assets/redesign/cta-photo-4.jpg";
import CartoonButton from "./ui/cartoon-button";

const LandingCta = () => {
  return (
    <section className="gu-closing-cta" aria-labelledby="closing-cta-title">
      <div className="gu-photo-stack gu-photo-stack--left" aria-hidden="true"><img src={photo1} alt="" /><img src={photo2} alt="" /></div>
      <div className="gu-closing-copy">
        <h2 id="closing-cta-title">Let Them Unwrap a Little Happiness</h2>
        <p>Choose their favourite things, add a message only you could write, and give them a reason to smile. From birthdays and big milestones to a simple “thinking of you,” Gift Unwrap helps you make every gesture feel personal. Whether you’re close by or miles away, send a little love they can hold in their hands.</p>
        <div><CartoonButton label="Shop Gifts" color="#c8b2eb" to="/#featured-gifts" /><CartoonButton label="Build Your Own Gift Box" to="/build-gift-box" /></div>
      </div>
      <div className="gu-photo-stack gu-photo-stack--right" aria-hidden="true"><img src={photo3} alt="" /><img src={photo4} alt="" /></div>
    </section>
  );
};

export default LandingCta;
