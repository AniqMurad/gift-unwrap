import RecipientCollectionPage from "../components/RecipientCollectionPage";
import { recipientCollectionConfigs } from "../config/recipientCollections";

export default function GreetingCards() {
  return (
    <RecipientCollectionPage config={recipientCollectionConfigs.greetingCards} />
  );
}
