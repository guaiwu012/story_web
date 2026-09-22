import { AuthForm } from "@/components/auth-form";
export const metadata={title:"登录"};
export default function Login(){return <div className="auth-shell"><section className="auth-card"><h1>欢迎回来</h1><p>登录后阅读已授权作品或提交你的故事。</p><AuthForm mode="login"/></section></div>}
