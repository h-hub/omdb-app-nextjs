import { JournalEntry, JournalStorage } from "../models/Journal";

export class RedisJournalStorage implements JournalStorage {
  private key = "journalEntries";

  async saveEntry(entry: JournalEntry): Promise<void> {
    const existing = localStorage.getItem(this.key);
    const entries: Record<string, JournalEntry> = existing
      ? JSON.parse(existing)
      : {};
    entries[entry.imdbID] = entry;
    localStorage.setItem(this.key, JSON.stringify(entries));
  }

  async getEntry(imdbID: string): Promise<JournalEntry | null> {
    const existing = localStorage.getItem(this.key);
    if (!existing) return null;
    const entries: Record<string, JournalEntry> = JSON.parse(existing);
    return entries[imdbID] || null;
  }
}
