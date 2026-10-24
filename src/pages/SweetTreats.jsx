import RecipientCollectionPage from "../components/RecipientCollectionPage";
import { recipientCollectionConfigs } from "../config/recipientCollections";

export default function SweetTreats() {
  return <RecipientCollectionPage config={recipientCollectionConfigs.sweetTreats} />;
}
