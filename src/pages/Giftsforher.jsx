import RecipientCollectionPage from "../components/RecipientCollectionPage";
import { recipientCollectionConfigs } from "../config/recipientCollections";

export default function Giftsforher() {
  return <RecipientCollectionPage config={recipientCollectionConfigs.her} />;
}
