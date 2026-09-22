import postgres from "postgres";

const email = process.argv[2]?.trim().toLowerCase();
if (!email) throw new Error("Usage: pnpm admin:promote user@example.com");
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
const sql = postgres(process.env.DATABASE_URL, { max: 1 });
const [user] = await sql`UPDATE users SET role = 'admin', updated_at = now() WHERE email = ${email} RETURNING id, email`;
await sql.end();
if (!user) throw new Error("User not found. Register the account first.");
console.log(`Promoted ${user.email} to admin.`);
