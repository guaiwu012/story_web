import { db } from "@/lib/db";

export async function canReadFullStory(userId: string | null, storyId: string, categoryId: string | null) {
  if (!userId) return false;
  const [result] = await db<{ allowed: boolean }[]>`SELECT EXISTS (SELECT 1 FROM entitlements e WHERE e.user_id=${userId} AND e.revoked_at IS NULL AND e.valid_from<=now() AND (e.valid_until IS NULL OR e.valid_until>now()) AND (e.scope='platform_full' OR (e.scope='story_full' AND e.story_id=${storyId}) OR (e.scope='category_full' AND e.category_id=${categoryId}))) AS allowed`;
  return result.allowed;
}
export function watermarkFor(email: string, userId: string) { const [name,domain=""] = email.split("@"); return `${name.slice(0,2)}***@${domain} · ${userId.slice(0,8)} · ${new Date().toISOString().slice(0,10)}`; }
