import { JournalEntry, JournalStorage } from "../models/Journal";

export default class LocalJournalStorage extends JournalStorage {
  async save(data: JournalEntry): Promise<void> {
    console.log("Saving locally:", data);
    // Implement local file or memory storage logic here
  }
}
