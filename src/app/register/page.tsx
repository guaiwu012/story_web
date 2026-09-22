import { AuthForm } from "@/components/auth-form";
export const metadata={title:"注册"};
export default function Register(){return <div className="auth-shell"><section className="auth-card"><h1>创建账号</h1><p>投稿必须注册。你的联系方式不会公开展示。</p><AuthForm mode="register"/></section></div>}
