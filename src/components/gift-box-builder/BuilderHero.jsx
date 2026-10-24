import { Fragment } from "react";
import LandingHeader from "../LandingHeader";
import goodies from "../../assets/gift-box-builder/choose-goodies.png";
import box from "../../assets/gift-box-builder/pick-a-box.png";
import card from "../../assets/gift-box-builder/add-a-card.png";
import activeBox from "../../assets/gift-box-builder/step2-active-box.png";
import activeCard from "../../assets/gift-box-builder/step3-active-card.png";
import lineTwoOne from "../../assets/gift-box-builder/step2-connector-one.svg";
import lineTwoTwo from "../../assets/gift-box-builder/step2-connector-two.svg";
import lineThreeOne from "../../assets/gift-box-builder/step3-connector-one.svg";
import lineThreeTwo from "../../assets/gift-box-builder/step3-connector-two.svg";

export default function BuilderHero({ step, onStepChange }) {
  const labels = ["Choose Goodies", "Pick a Box", "Add a Card"];
  const icons = [goodies, step === 2 ? activeBox : box, step === 3 ? activeCard : card];
  const lines = step === 2 ? [lineTwoOne, lineTwoTwo] : [lineThreeOne, lineThreeTwo];
  return (
    <section className="gu-builder-hero">
      <LandingHeader variant="builder" />
      <div className="gu-builder-hero-copy">
        <h1>Build a Gift Box<br />That Feels Like Them</h1>
        <p>You know their little favourites. Pick the gifts, choose a box, and add the words only you could write. We’ll bring it all together with care.</p>
      </div>
      <ol className={`gu-builder-steps gu-builder-revised-steps gu-builder-revised-steps--${step}`} aria-label="Build a gift box progress">
        {labels.map((label, index) => {
          const number = index + 1;
          const content = <><span className="gu-builder-step-icon"><img src={icons[index]} alt="" /></span><span className="gu-builder-step-label"><b>{number}.</b> {label}</span></>;
          return <Fragment key={label}>
            {index > 0 && <li className="gu-builder-revised-connector" aria-hidden="true"><img src={lines[index - 1]} alt="" /></li>}
            <li className={step === number ? "is-current" : number < step ? "is-complete" : ""} aria-current={step === number ? "step" : undefined}>
              {number < step ? <button type="button" onClick={() => onStepChange(number)} aria-label={`Return to step ${number}, ${label}`}>{content}</button> : content}
            </li>
          </Fragment>;
        })}
      </ol>
    </section>
  );
}
