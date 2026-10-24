import RecipientCollectionPage from "../components/RecipientCollectionPage";
import { recipientCollectionConfigs } from "../config/recipientCollections";

export default function BirthdayGifts() {
  return <RecipientCollectionPage config={recipientCollectionConfigs.birthday} />;
}
