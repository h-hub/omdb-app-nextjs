"use server";
import { getJournalEntry } from "../../../lib/MongoJournalStorage";
import { JournalEntry } from "../../../models/Journal";

export const fetchJournalEntry = async (userId: string, imdbID: string): Promise<JournalEntry | null> => {
  return await getJournalEntry(userId, imdbID);
};
