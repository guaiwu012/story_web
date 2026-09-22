import type { Metadata } from "next";
import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { logout } from "@/app/actions";
import { AdminModeSwitch } from "@/components/admin-navigation";
import "./globals.css";

export const metadata:Metadata={title:{default:"未完｜原创短篇",template:"%s｜未完"},description:"经过编辑筛选、值得看到结局的原创短篇故事。"};
export const dynamic="force-dynamic";
export default async function RootLayout({children}:{children:React.ReactNode}){const user=await currentUser();return <html lang="zh-CN"><body>
  <header className="site-header"><div className="container header-inner"><Link className="brand" href="/"><span className="brand-mark">未</span>未完</Link><nav className="nav" aria-label="主导航"><Link href="/">精选</Link><Link href="/submit">投稿</Link>{user?.role==="admin"&&<AdminModeSwitch/>}{user?<><span className="account-name">{user.display_name}</span><form action={logout}><button className="link-button">退出</button></form></>:<Link className="button keep" href="/login">登录</Link>}</nav></div></header>
  <main>{children}</main><footer className="site-footer"><div className="container footer-inner"><span>© 2026 未完 · 原创短篇故事</span><span>作者保留著作权 · 平台按约定获得阅读展示授权</span></div></footer>
  </body></html>}
