import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
export default async function AdminLayout({children}:{children:React.ReactNode}){await requireAdmin();return <div className="container page"><div className="admin-grid"><aside className="side-card"><h2>内容管理</h2><nav className="side-links"><Link href="/admin/memberships">阅读权限</Link><Link href="/admin/submissions">投稿审核</Link><Link href="/admin/stories">作品管理</Link></nav></aside><section>{children}</section></div></div>}
