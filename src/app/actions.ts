"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { clearSession, createSession, requireAdmin, requireUser } from "@/lib/auth";

export type ActionState = { error?: string; success?: string };
const credentials = z.object({ email: z.string().email("请输入有效邮箱"), password: z.string().min(8,"密码至少 8 位") });

export async function register(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = credentials.extend({ displayName:z.string().min(2,"昵称至少 2 个字").max(40) }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error:parsed.error.issues[0].message };
  const email=parsed.data.email.toLowerCase(); const [exists]=await db`SELECT id FROM users WHERE email=${email}`; if(exists) return {error:"该邮箱已注册"};
  const hash=await bcrypt.hash(parsed.data.password,12); const [user]=await db`INSERT INTO users(email,display_name,password_hash) VALUES(${email},${parsed.data.displayName},${hash}) RETURNING id`; await createSession(user.id); redirect("/");
}
export async function login(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed=credentials.safeParse(Object.fromEntries(formData)); if(!parsed.success) return {error:parsed.error.issues[0].message};
  const [user]=await db`SELECT id,password_hash FROM users WHERE email=${parsed.data.email.toLowerCase()}`; if(!user||!(await bcrypt.compare(parsed.data.password,user.password_hash))) return {error:"邮箱或密码不正确"}; await createSession(user.id); redirect("/");
}
export async function logout(){await clearSession();redirect("/");}

const submissionSchema=z.object({title:z.string().min(2).max(120),synopsis:z.string().min(10).max(500),category:z.string().min(1).max(40),contact:z.string().min(3).max(120),body:z.string().min(100,"正文至少 100 字").max(80000)});
export async function submitStory(_:ActionState,formData:FormData):Promise<ActionState>{const user=await requireUser();const parsed=submissionSchema.safeParse(Object.fromEntries(formData));if(!parsed.success)return{error:parsed.error.issues[0].message};const d=parsed.data;const[row]=await db`INSERT INTO submissions(user_id,title,synopsis,category_name,contact,body) VALUES(${user.id},${d.title},${d.synopsis},${d.category},${d.contact},${d.body}) RETURNING id`;await db`INSERT INTO audit_logs(actor_id,action,entity_type,entity_id) VALUES(${user.id},'recommendation.created','submission',${row.id})`;return{success:`推荐已收到，编号 ${row.id.slice(0,8)}。我会认真读完并核对作者与出处。`};}
export async function reviewSubmission(formData:FormData){const admin=await requireAdmin();const id=z.string().uuid().parse(formData.get("id"));const status=z.enum(["reviewing","revision_requested","rejected","accepted"]).parse(formData.get("status"));const note=String(formData.get("note")||"").slice(0,1000);await db`UPDATE submissions SET status=${status},reviewer_id=${admin.id},review_note=${note},updated_at=now() WHERE id=${id}`;await db`INSERT INTO audit_logs(actor_id,action,entity_type,entity_id,metadata) VALUES(${admin.id},'submission.reviewed','submission',${id},${db.json({status})})`;revalidatePath("/admin/submissions");}

const storySchema=z.object({title:z.string().min(2).max(120),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,"网址标识只能使用小写字母、数字和连字符"),summary:z.string().min(10).max(500),authorName:z.string().min(1).max(120),categoryName:z.string().min(1).max(40),categorySlug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),content:z.string().min(100)});
export async function createStory(_:ActionState,formData:FormData):Promise<ActionState>{const admin=await requireAdmin();const parsed=storySchema.safeParse(Object.fromEntries(formData));if(!parsed.success)return{error:parsed.error.issues[0].message};const d=parsed.data;try{const[category]=await db`INSERT INTO categories(name,slug) VALUES(${d.categoryName},${d.categorySlug}) ON CONFLICT(slug) DO UPDATE SET name=EXCLUDED.name RETURNING id`;const[row]=await db`INSERT INTO stories(title,slug,summary,author_name,category_id,free_content,paid_content,price_cents,created_by) VALUES(${d.title},${d.slug},${d.summary},${d.authorName},${category.id},${d.content},${""},${0},${admin.id}) RETURNING id`;await db`INSERT INTO audit_logs(actor_id,action,entity_type,entity_id) VALUES(${admin.id},'article.created','story',${row.id})`;revalidatePath("/admin/stories");return{success:"文章草稿已保存，核对无误后可在列表中发布"};}catch{return{error:"保存失败，请检查网址标识是否已存在"};}}
export async function setStoryStatus(formData:FormData){const admin=await requireAdmin();const id=z.string().uuid().parse(formData.get("id"));const status=z.enum(["published","unpublished"]).parse(formData.get("status"));await db`UPDATE stories SET status=${status},published_at=CASE WHEN ${status}='published' THEN COALESCE(published_at,now()) ELSE published_at END,updated_at=now() WHERE id=${id}`;await db`INSERT INTO audit_logs(actor_id,action,entity_type,entity_id,metadata) VALUES(${admin.id},'story.status_changed','story',${id},${db.json({status})})`;revalidatePath("/admin/stories");revalidatePath("/");}
