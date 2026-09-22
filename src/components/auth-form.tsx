"use client";
import { useActionState } from "react";
import Link from "next/link";
import { login, register, type ActionState } from "@/app/actions";

export function AuthForm({mode}:{mode:"login"|"register"}){
  const action=mode==="login"?login:register;
  const[state,formAction,pending]=useActionState<ActionState,FormData>(action,{});
  return <form action={formAction} className="form">
    {mode==="register"&&<div className="field"><label htmlFor="displayName">昵称</label><input className="input" id="displayName" name="displayName" required minLength={2} autoComplete="nickname"/></div>}
    <div className="field"><label htmlFor="email">邮箱</label><input className="input" id="email" name="email" type="email" required autoComplete="email"/></div>
    <div className="field"><label htmlFor="password">密码</label><input className="input" id="password" name="password" type="password" required minLength={8} autoComplete={mode==="login"?"current-password":"new-password"}/><small>至少 8 位</small></div>
    {state.error&&<p className="notice" role="alert">{state.error}</p>}
    <button className="button" disabled={pending}>{pending?"请稍候…":mode==="login"?"登录":"创建账号"}</button>
    <p style={{textAlign:"center",color:"var(--muted)",margin:0}}>{mode==="login"?<>还没有账号？ <Link href="/register">注册</Link></>:<>已有账号？ <Link href="/login">登录</Link></>}</p>
  </form>
}
