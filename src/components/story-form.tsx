"use client";
import {useActionState} from "react";
import {createStory,type ActionState} from "@/app/actions";
export function StoryForm(){const[state,action,pending]=useActionState<ActionState,FormData>(createStory,{});return <form action={action} className="form">
  <div className="form-row"><div className="field"><label>标题</label><input className="input" name="title" required/></div><div className="field"><label>作者署名</label><input className="input" name="authorName" required/></div></div>
  <div className="form-row"><div className="field"><label>作品网址标识</label><input className="input" name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="story-name"/></div><div className="field"><label>全文价格（分）</label><input className="input" name="priceCents" type="number" min="0" defaultValue="190" required/></div></div>
  <div className="field"><label>简介</label><textarea className="textarea" name="summary" required minLength={10}/></div>
  <div className="form-row"><div className="field"><label>类别名称</label><input className="input" name="categoryName" required placeholder="悬疑"/></div><div className="field"><label>类别网址标识</label><input className="input" name="categorySlug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="mystery"/></div></div>
  <div className="field"><label>免费正文</label><textarea className="textarea long" name="freeContent" required minLength={100}/><small>付费墙之前的真实正文。</small></div>
  <div className="field"><label>付费正文</label><textarea className="textarea long" name="paidContent" required minLength={100}/><small>只会在服务端权限通过后返回。</small></div>
  {state.error&&<p className="notice" role="alert">{state.error}</p>}{state.success&&<p className="notice success" role="status">{state.success}</p>}
  <button className="button" disabled={pending}>{pending?"保存中…":"创建作品草稿"}</button>
  </form>}
