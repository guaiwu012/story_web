import type { Metadata } from "next";
import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { logout } from "@/app/actions";
import { AdminModeSwitch } from "@/components/admin-navigation";
import "./globals.css";

export const metadata:Metadata={title:{default:"未完｜有意思、有温度的文章收藏",template:"%s｜未完"},description:"一个非盈利的文章收藏站，收集有意思、有温度、值得慢慢读完的文字。"};
export const dynamic="force-dynamic";
export default async function RootLayout({children}:{children:React.ReactNode}){const user=await currentUser();return <html lang="zh-CN"><body>
  <header className="site-header"><div className="container header-inner"><Link className="brand" href="/"><span className="brand-mark">未</span><span>未完</span></Link><nav className="nav" aria-label="主导航"><Link href="/">文章</Link><Link href="/submit">推荐一篇</Link><Link className="claim-link keep" href="/claim"><span className="claim-label-long">认领文章</span><span className="claim-label-short">认领</span></Link>{user?.role==="admin"&&<AdminModeSwitch/>}{user?<><span className="account-name">{user.display_name}</span><form action={logout}><button className="link-button">退出</button></form></>:<Link className="quiet-link keep" href="/login">登录</Link>}</nav></div></header>
  <main>{children}</main><footer className="site-footer"><div className="container footer-inner"><span>© 2026 未完 · 非盈利文章收藏</span><span>著作权归原作者 · 如有异议，可联系认领、修订或撤下</span></div></footer>
  </body></html>}
