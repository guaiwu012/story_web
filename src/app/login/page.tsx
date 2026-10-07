import { AuthForm } from "@/components/auth-form";
export const metadata={title:"登录"};
export default function Login(){return <div className="auth-shell"><section className="auth-card"><h1>欢迎回来</h1><p>登录后可以推荐文章，也可以查看自己的提交记录。</p><AuthForm mode="login"/></section></div>}
