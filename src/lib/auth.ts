import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { db, type User } from "@/lib/db";

const COOKIE = "story_session";
function secret() { const value = process.env.AUTH_SECRET; if (!value || value.length < 32) throw new Error("AUTH_SECRET must be at least 32 characters"); return new TextEncoder().encode(value); }

export async function createSession(userId: string) {
  const token = await new SignJWT({ sub: userId }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("30d").sign(secret());
  (await cookies()).set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 2592000 });
}
export async function clearSession() { (await cookies()).delete(COOKIE); }
export async function currentUser(): Promise<User | null> {
  try { const token = (await cookies()).get(COOKIE)?.value; if (!token) return null; const { payload } = await jwtVerify(token, secret()); if (!payload.sub) return null; const [user] = await db<User[]>`SELECT id,email,display_name,role FROM users WHERE id=${payload.sub}`; return user ?? null; } catch { return null; }
}
export async function requireUser() { const user = await currentUser(); if (!user) redirect("/login"); return user; }
export async function requireAdmin() { const user = await requireUser(); if (user.role !== "admin") redirect("/"); return user; }
