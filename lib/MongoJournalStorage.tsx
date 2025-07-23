"use server";
import { JournalEntry } from "../models/Journal";
import client from "./mongodb";

export async function saveJournalEntry(data: JournalEntry): Promise<void> {
  await client.connect();
  const clnt = client;
  const db = clnt.db("movie_journal");
  const collection = db.collection("journal");

  const filter = { userId: data.userId, imdbID: data.imdbID };

  const update = {
    $set: {
      htmlDescription: data.htmlDescription,
    },
  };

  const options = { upsert: true };

  await collection.updateOne(filter, update, options);
}

export async function getJournalEntry(
  userId: string,
  imdbID: string
): Promise<JournalEntry | null> {
  await client.connect();
  const clnt = client;
  const db = clnt.db("movie_journal");
  const collection = db.collection("journal");

  const filter = { userId, imdbID };
  const result = await collection.findOne(filter);

  if (!result) {
    return null;
  }

  return {
    userId: result.userId,
    imdbID: result.imdbID,
    htmlDescription: result.htmlDescription,
  };
}
