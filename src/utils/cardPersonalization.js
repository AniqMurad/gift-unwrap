export function getStandaloneCardMessageSummary(item) {
  const personalization = item?.personalization;

  if (!personalization?.messageMode || personalization.card) return "";
  if (personalization.messageMode === "blank") return "Card message · Leave blank";

  const recipient = String(personalization.to || "").trim();
  const sender = String(personalization.from || "").trim();
  const names = [recipient && `To ${recipient}`, sender && `from ${sender}`].filter(Boolean).join(", ");

  return names ? `Card message · ${names}` : "Card message included";
}
