export interface JournalEntry {
  userId?: string;
  imdbID: string;
  htmlDescription: string;
}

export abstract class JournalStorage {
  abstract save(data: JournalEntry): Promise<void>;
}
