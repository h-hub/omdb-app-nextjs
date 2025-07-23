import { saveJournalEntry } from "../../../lib/MongoJournalStorage";
import { JournalEntry } from "../../../models/Journal";

export const storeJournal = async (data: JournalEntry): Promise<void> => {
  await saveJournalEntry(data);
};
