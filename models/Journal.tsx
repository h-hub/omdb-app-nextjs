export interface JournalEntry {
  userId?: string;
  imdbID: string;
  htmlDescription: string;
  createdAt: Date;
}

export interface JournalStorage {
  saveEntry(entry: JournalEntry): Promise<void>;
  getEntry(imdbID: string): Promise<JournalEntry | null>;
}
