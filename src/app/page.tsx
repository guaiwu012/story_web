import Link from "next/link";
import { db } from "@/lib/db";
export default async function Home(){const stories=await db`SELECT s.id,s.title,s.slug,s.summary,s.author_name,s.price_cents,c.name category_name FROM stories s LEFT JOIN categories c ON c.id=s.category_id WHERE s.status='published' AND s.globally_withdrawn=false ORDER BY s.published_at DESC NULLS LAST`;return <>
  <section className="hero"><div className="container hero-grid"><div><span className="eyebrow">编辑精选 · 原创短篇</span><h1 className="title">好故事，应该让人<br/>舍不得停在一半。</h1><p className="subtitle">没有算法灌水，只有编辑认真选过的故事。</p></div><div className="hero-side">当前已发布<strong>{stories.length}</strong>所有内容均来自真实投稿或管理员上传</div></div></section>
  <section className="container page">{stories.length===0?<div className="empty"><strong>故事正在准备中</strong>管理员发布第一篇作品后，它会出现在这里。本站不会用示例文章填充空白。</div>:<div className="story-grid">{stories.map(s=><Link key={s.id} className="card" href={`/story/${s.slug}`}><div className="card-meta"><span>{s.category_name||"未分类"}</span><span>{s.price_cents?`¥${(s.price_cents/100).toFixed(2)}`:"免费"}</span></div><h2>{s.title}</h2><p>{s.summary}</p><div className="card-link">开始阅读 →</div></Link>)}</div>}</section>
  </>}
