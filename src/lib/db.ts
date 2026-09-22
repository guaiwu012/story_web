import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is not configured");

export const db = postgres(databaseUrl, { max: 5, prepare: false });

export type User = { id: string; email: string; display_name: string; role: "reader" | "admin" };
