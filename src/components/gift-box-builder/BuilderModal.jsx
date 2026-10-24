import { useRef } from "react";
import { Content } from "@radix-ui/react-dialog";
import { Dialog, DialogClose, DialogOverlay, DialogPortal } from "../ui/dialog";
import closeIcon from "../../assets/gift-box-builder/modal-close.svg";
import "../../styles/builder-modals.css";

// Composes the existing dialog primitives without changing shared defaults.
export default function BuilderModal({ children, onClose, returnFocus, className, labelledBy }) {
  const contentRef = useRef(null);
  return <Dialog open onOpenChange={open => { if (!open) onClose(); }}>
    <DialogPortal>
      <DialogOverlay className="gu-builder-modal-backdrop" />
      <Content ref={contentRef} className={`gu-builder-modal ${className}`} aria-labelledby={labelledBy} aria-describedby={undefined}
        onOpenAutoFocus={event => { event.preventDefault(); contentRef.current?.focus(); }}
        onCloseAutoFocus={event => { event.preventDefault(); if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true }); }}>
        {children}
        <DialogClose className="gu-builder-modal-close" aria-label="Close dialog"><img src={closeIcon} alt="" /></DialogClose>
      </Content>
    </DialogPortal>
  </Dialog>;
}
