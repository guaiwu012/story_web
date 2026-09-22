import { requireAdmin } from "@/lib/auth";
import { AdminSectionNav } from "@/components/admin-navigation";
export default async function AdminLayout({children}:{children:React.ReactNode}){await requireAdmin();return <div className="container page"><div className="admin-grid"><aside className="side-card"><h2>内容管理</h2><AdminSectionNav/></aside><section>{children}</section></div></div>}
