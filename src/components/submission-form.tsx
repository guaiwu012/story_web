"use client";
import { useActionState } from "react";
import { submitStory, type ActionState } from "@/app/actions";
export function SubmissionForm(){const[state,action,pending]=useActionState<ActionState,FormData>(submitStory,{});return <form action={action} className="form">
  <div className="form-row"><div className="field"><label htmlFor="title">标题</label><input className="input" id="title" name="title" required minLength={4} maxLength={120}/></div><div className="field"><label htmlFor="category">类型</label><input className="input" id="category" name="category" required maxLength={40} placeholder="悬疑、情感、都市……"/></div></div>
  <div className="field"><label htmlFor="synopsis">一句话简介</label><textarea className="textarea" id="synopsis" name="synopsis" required minLength={20} maxLength={500}/></div>
  <div className="field"><label htmlFor="contact">联系方式</label><input className="input" id="contact" name="contact" required maxLength={120}/><small>只用于稿件审核通过后由编辑联系，不收集收款信息。</small></div>
  <div className="field"><label htmlFor="body">完整正文</label><textarea className="textarea long" id="body" name="body" required minLength={1000} maxLength={80000} placeholder="仅支持粘贴纯文本，1,000～80,000 字。"/></div>
  {state.error&&<p className="notice" role="alert">{state.error}</p>}{state.success&&<p className="notice success" role="status">{state.success}</p>}
  <button className="button" disabled={pending}>{pending?"提交中…":"提交给编辑审核"}</button>
  </form>}
