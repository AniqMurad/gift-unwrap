import { Link } from "react-router-dom";

interface GreetingCardRecord {
  _id?: string;
  id: number | string;
  name: string;
  design?: string;
  image?: string;
  color?: string;
  description?: string;
  inStock?: boolean;
}

interface GreetingCardCollectionItemProps {
  card: GreetingCardRecord;
  eager?: boolean;
}

export default function GreetingCardCollectionItem({
  card,
  eager = false,
}: GreetingCardCollectionItemProps) {
  const isUnavailable = card.inStock === false;

  return (
    <article className="gu-collection-product gu-greeting-card">
      <Link
        aria-label={`${card.name}. Choose this card in the gift-box builder.`}
        className="gu-collection-product-link gu-greeting-card-link"
        to="/build-gift-box"
      >
        <div className="gu-collection-product-media gu-greeting-card-media">
          {card.image ? (
            <img
              alt={card.name}
              decoding="async"
              loading={eager ? "eager" : "lazy"}
              src={card.image}
            />
          ) : (
            <span className="gu-greeting-card-placeholder" aria-hidden="true">
              Greeting card
            </span>
          )}
          {isUnavailable && <span className="gu-collection-sold-out">Unavailable</span>}
        </div>
        <div className="gu-collection-product-copy gu-greeting-card-copy">
          <h2>{card.name}</h2>
          {card.design && <p>{card.design}</p>}
          <strong>{isUnavailable ? "Currently unavailable" : "Choose with a gift box"}</strong>
        </div>
      </Link>
    </article>
  );
}
