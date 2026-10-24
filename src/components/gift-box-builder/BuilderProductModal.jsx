import { useId, useRef, useState } from "react";
import { Title } from "@radix-ui/react-dialog";
import BuilderModal from "./BuilderModal";
import { formatPrice, getProductPrice } from "./builder-utils";
import { getPendingQuantityLimit } from "./builder-card-state";

export default function BuilderProductModal({ product, items, initialColor, onAdd, onClose, returnFocus }) {
  const [color, setColor] = useState(initialColor || null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const submitted = useRef(false);
  const titleId = useId();
  const limit = getPendingQuantityLimit(product, items, color);
  const pendingQuantity = Math.min(quantity, Math.max(1, limit));
  const variant = product.colorVariants?.find(entry => entry.color === color);
  const image = variant?.image || product.image || product.images?.[0];
  const add = () => {
    if (submitted.current || limit < 1) return;
    submitted.current = true;
    setAdding(true);
    onAdd(product, pendingQuantity, color);
    onClose();
  };
  return <BuilderModal className="gu-builder-product-modal" onClose={onClose} returnFocus={returnFocus} labelledBy={titleId}>
    <div className="gu-builder-modal-photo">{image && <img src={image} alt={product.name} />}</div>
    <div className="gu-builder-modal-product-copy">
      <Title id={titleId} className="gu-builder-modal-product-title">{product.name}</Title>
      <p className="gu-builder-modal-price">{formatPrice(getProductPrice(product))}</p>
      <p className="gu-builder-modal-description">{product.description || "No additional description is available for this item."}</p>
      {product.category && <p className="gu-builder-modal-category"><b>Category:</b> <span>{product.category}</span></p>}
      {!!product.colorVariants?.length && <fieldset className="gu-builder-modal-variants">
        <legend>Color: {color || "Default"}</legend>
        <div>
          {[{ color: null, image: product.image, label: "Default" }, ...product.colorVariants].map(entry => <button type="button" key={entry.color || "default"} aria-pressed={color === entry.color} aria-label={`Choose ${entry.label || entry.color}`} onClick={() => { setColor(entry.color); setQuantity(1); }}>
            {entry.image && <img src={entry.image} alt="" />}<span>{entry.label || entry.color}</span>
          </button>)}
        </div>
      </fieldset>}
      <div className="gu-builder-modal-quantity-row">
        <span>Quantity:</span>
        <div className="gu-builder-modal-quantity" role="group" aria-label="Quantity to add">
          <button type="button" disabled={pendingQuantity <= 1} onClick={() => setQuantity(pendingQuantity - 1)} aria-label="Decrease quantity">−</button>
          <output aria-live="polite">{pendingQuantity}</output>
          <button type="button" disabled={pendingQuantity >= limit} onClick={() => setQuantity(pendingQuantity + 1)} aria-label="Increase quantity">+</button>
        </div>
      </div>
      {limit < 1 && <p className="gu-builder-modal-error" role="status">This item is unavailable or you’ve already added the maximum quantity.</p>}
      <div className="gu-builder-modal-product-actions">
        <button type="button" className="gu-builder-modal-primary" disabled={limit < 1 || adding} onClick={add}>{adding ? "Adding…" : "Add to Gift Box"}</button>
        <button type="button" className="gu-builder-modal-secondary" onClick={onClose}>Continue Shopping</button>
      </div>
    </div>
  </BuilderModal>;
}
