import RecipientCollectionPage from "../components/RecipientCollectionPage";
import { recipientCollectionConfigs } from "../config/recipientCollections";

export default function PersonalizedGifts() {
  return (
    <RecipientCollectionPage config={recipientCollectionConfigs.personalized} />
  );
}
