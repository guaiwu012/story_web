"use client";
import { useActionState } from "react";
import { submitStory, type ActionState } from "@/app/actions";
export function SubmissionForm(){const[state,action,pending]=useActionState<ActionState,FormData>(submitStory,{});return <form action={action} className="form">
  <div className="form-row"><div className="field"><label htmlFor="title">文章标题</label><input className="input" id="title" name="title" required minLength={2} maxLength={120}/></div><div className="field"><label htmlFor="category">大致类别</label><input className="input" id="category" name="category" required maxLength={40} placeholder="生活、人物、随笔……"/></div></div>
  <div className="field"><label htmlFor="synopsis">推荐理由</label><textarea className="textarea" id="synopsis" name="synopsis" required minLength={10} maxLength={500} placeholder="它为什么打动你？"/></div>
  <div className="field"><label htmlFor="contact">作者、原始出处或联系方式</label><input className="input" id="contact" name="contact" required maxLength={120} placeholder="作者名、发布平台、原文链接或你的联系方式"/><small>用于核对来源或联系推荐人，不会公开你的私人联系方式。</small></div>
  <div className="field"><label htmlFor="body">文章正文</label><textarea className="textarea long" id="body" name="body" required minLength={100} maxLength={80000} placeholder="首版支持粘贴纯文本；请尽量保持原文段落。"/></div>
  {state.error&&<p className="notice" role="alert">{state.error}</p>}{state.success&&<p className="notice success" role="status">{state.success}</p>}
  <button className="button" disabled={pending}>{pending?"提交中…":"提交推荐"}</button>
  </form>}
