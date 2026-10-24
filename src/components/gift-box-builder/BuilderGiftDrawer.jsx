import { useId, useRef, useState } from "react";
import { Content as DialogContent } from "@radix-ui/react-dialog";
import { Dialog, DialogClose, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "../ui/dialog";
import { formatPrice, getProductPrice, getStockLimit, isUnavailable } from "./builder-utils";
import { getBuilderDrawerSummary } from "./builder-drawer-summary";
import { getBuilderCardPrice } from "./builder-card-state";
import boxIllustration from "../../assets/gift-box-builder/drawer-red-box.svg";
import closeIcon from "../../assets/gift-box-builder/drawer-close.svg";
import minusIcon from "../../assets/gift-box-builder/drawer-minus.svg";
import plusIcon from "../../assets/gift-box-builder/drawer-plus.svg";
import removeIcon from "../../assets/gift-box-builder/drawer-remove.svg";
import "../../styles/builder-gift-drawer.css";

export function BuilderDrawerTrigger({ count, ref }) {
  return (
    <DialogTrigger ref={ref} className="gu-box-drawer-trigger" aria-label={`Open your gift box, ${count} gift ${count === 1 ? "item" : "items"}`}>
      <span className="gu-box-drawer-count" aria-hidden="true">{count}</span>
      <span className="gu-box-drawer-label" aria-hidden="true">Items<br />In Your<br />Gift Box</span>
    </DialogTrigger>
  );
}

function ItemThumbnail({ item }) {
  const variant = item.colorVariants?.find((entry) => entry.color === item.selectedColor);
  const source = variant?.image || item.image || item.images?.[0];
  return source ? <img className="gu-box-drawer-thumbnail" src={source} alt={item.name} /> : <span className="gu-box-drawer-thumbnail" aria-hidden="true" />;
}

export default function BuilderGiftDrawer({ items, selectedBox, selectedCard, cardDetails, onEditCard, onRemoveCard, onQuantityChange, onRemove, onNext, nextLabel = "Continue to Next Step", canContinue, validationMessage, open: controlledOpen, onOpenChange }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  const triggerRef = useRef(null);
  const editAfterClose = useRef(false);
  const titleRef = useRef(null);
  const quantityHelpId = useId();
  const summary = getBuilderDrawerSummary(items, selectedBox, selectedCard);
  const allowed = canContinue ?? summary.canContinue;
  const continueToNext = () => {
    if (!allowed) return;
    setOpen(false);
    onNext();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <BuilderDrawerTrigger ref={triggerRef} count={summary.itemCount} />
      <DialogPortal>
        <DialogOverlay className="gu-box-drawer-backdrop" />
        <DialogContent className="gu-box-drawer" onOpenAutoFocus={(event) => { event.preventDefault(); titleRef.current?.focus(); }}
          onCloseAutoFocus={event => { if (editAfterClose.current) { event.preventDefault(); editAfterClose.current = false; onEditCard?.(selectedCard, triggerRef.current); } }}>
          <header className="gu-box-drawer-header">
            <div className="gu-box-drawer-heading-row">
              <DialogTitle ref={titleRef} tabIndex={-1} className="gu-box-drawer-title">In Your Box</DialogTitle>
              <img className="gu-box-drawer-illustration" src={boxIllustration} alt="" />
            </div>
            <DialogClose className="gu-box-drawer-close" aria-label="Close gift box summary"><img src={closeIcon} alt="" /></DialogClose>
            <DialogDescription className="gu-box-drawer-status" aria-live="polite">
              {summary.itemCount} Gift {summary.itemCount === 1 ? "Item" : "Items"} • {selectedBox ? "Box Selected" : "Box not selected"}
              {selectedCard ? " • Card Selected" : ""}
            </DialogDescription>
          </header>

          <section className="gu-box-drawer-price" aria-label="Gift box price summary">
            <div className="gu-box-drawer-total"><h3>Total Price:</h3><strong>{formatPrice(summary.total)}</strong></div>
            <dl className="gu-box-drawer-breakdown">
              <div><dt>Gift Items</dt><dd>{formatPrice(summary.giftsSubtotal)}</dd></div>
              <div><dt>{selectedBox ? `Box (${selectedBox.name})` : "Box not selected"}</dt><dd>{formatPrice(summary.boxCost)}</dd></div>
              {selectedCard && <div><dt>Card ({selectedCard.name})</dt><dd>{formatPrice(getBuilderCardPrice(selectedCard))}</dd></div>}
            </dl>
            <label className="gu-box-drawer-box-quantity">
              <span>Qty of Boxes</span>
              <input type="text" value={summary.boxQuantity} readOnly aria-describedby={quantityHelpId} />
            </label>
            <span className="sr-only" id={quantityHelpId}>One completed gift box per build. Box quantity cannot be changed.</span>
          </section>

          <section className="gu-box-drawer-items" aria-label="Your selected items">
            <h3>Your Items:</h3>
            <section className="gu-box-drawer-item-section" aria-label="Gift items">
              <h4>Gift Items</h4>
              {items.length ? items.map((item) => (
                <article className="gu-box-drawer-item" key={item.cartKey}>
                  <ItemThumbnail item={item} />
                  <div className="gu-box-drawer-item-copy">
                    <h5>{item.name}</h5>
                    {item.selectedColor && <p>{item.selectedColor}</p>}
                    <p>{formatPrice(getProductPrice(item) * item.quantity)}</p>
                    <div className="gu-box-drawer-actions">
                      <div className="gu-box-drawer-quantity" role="group" aria-label={`Quantity of ${item.name}`}>
                        <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => onQuantityChange(item.cartKey, item.quantity - 1)}><img src={minusIcon} alt="" /></button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button type="button" aria-label={`Increase ${item.name} quantity`} disabled={isUnavailable(item, item.selectedColor) || item.quantity >= getStockLimit(item, item.selectedColor)} onClick={() => onQuantityChange(item.cartKey, item.quantity + 1)}><img src={plusIcon} alt="" /></button>
                      </div>
                      <button className="gu-box-drawer-remove" type="button" aria-label={`Remove ${item.name}${item.selectedColor ? ` (${item.selectedColor})` : ""}`} onClick={() => onRemove(item.cartKey)}><img src={removeIcon} alt="" /></button>
                    </div>
                  </div>
                </article>
              )) : <p className="gu-box-drawer-empty">Add a goodie to get started.</p>}
            </section>
            <section className="gu-box-drawer-item-section" aria-label="Selected gift box">
              <h4>Gift Box</h4>
              {selectedBox ? (
                <article className="gu-box-drawer-item gu-box-drawer-packaging">
                  <ItemThumbnail item={selectedBox} />
                  <div className="gu-box-drawer-item-copy">
                    <h5>{selectedBox.name}</h5>
                    {(selectedBox.size || selectedBox.selectedColor) && <p>{[selectedBox.size, selectedBox.selectedColor].filter(Boolean).join(" • ")}</p>}
                    <p className="gu-box-drawer-box-price">{formatPrice(summary.boxCost)}</p>
                  </div>
                </article>
              ) : <p className="gu-box-drawer-empty">Choose your box in step 2.</p>}
              {summary.boxConflict && <p className="gu-box-drawer-warning">Your saved box is too small for the current selection. Choose a suitable box in step 2.</p>}
            </section>
            {selectedCard && <section className="gu-box-drawer-item-section" aria-label="Selected greeting card">
              <h4>Greeting Card</h4>
              <article className="gu-box-drawer-item">
                <ItemThumbnail item={selectedCard} />
                <div className="gu-box-drawer-item-copy"><h5>{selectedCard.name}</h5><p>{formatPrice(getBuilderCardPrice(selectedCard))}</p><p>{cardDetails?.blank ? "Leave card blank" : "Personalized card"}</p>
                  {onEditCard && <button className="gu-box-drawer-edit-card" type="button" onClick={() => { editAfterClose.current = true; setOpen(false); }}>Edit message</button>}
                  {onRemoveCard && <button className="gu-box-drawer-edit-card" type="button" onClick={onRemoveCard}>Remove card</button>}
                </div>
              </article>
              {cardDetails && !cardDetails.blank && <p className="gu-box-drawer-card-message">To: {cardDetails.to}<br />From: {cardDetails.from}<br />{cardDetails.message}</p>}
            </section>}
            {!allowed && <p className="gu-box-drawer-warning">{validationMessage || (items.length ? "Remove unavailable goodies to continue." : "Choose at least one goodie to continue.")}</p>}
            <button className="gu-box-drawer-continue" type="button" disabled={!allowed} onClick={continueToNext}>{nextLabel}</button>
          </section>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
