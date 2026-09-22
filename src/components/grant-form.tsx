"use client";
import { useActionState,useState } from "react";
import { grantEntitlement,type ActionState } from "@/app/actions";
type Option={id:string;label:string};
export function GrantForm({users,stories,categories}:{users:Option[];stories:Option[];categories:Option[]}){const[scope,setScope]=useState("story_full");const[state,action,pending]=useActionState<ActionState,FormData>(grantEntitlement,{});return <form action={action} className="form">
  <div className="field"><label>用户</label><select className="select" name="userId" required defaultValue=""><option value="" disabled>选择注册用户</option>{users.map(x=><option key={x.id} value={x.id}>{x.label}</option>)}</select></div>
  <div className="field"><label>授权范围</label><select className="select" name="scope" value={scope} onChange={e=>setScope(e.target.value)}><option value="story_full">指定作品全文</option><option value="category_full">指定类别全文</option><option value="platform_full">全站全文</option></select></div>
  {scope==="story_full"&&<div className="field"><label>作品 ID</label><select className="select" name="storyId" required defaultValue=""><option value="" disabled>选择作品</option>{stories.map(x=><option key={x.id} value={x.id}>{x.label}</option>)}</select></div>}
  {scope==="category_full"&&<div className="field"><label>类别</label><select className="select" name="categoryId" required defaultValue=""><option value="" disabled>选择类别</option>{categories.map(x=><option key={x.id} value={x.id}>{x.label}</option>)}</select></div>}
  <div className="form-row"><div className="field"><label>生效时间</label><input className="input" name="validFrom" type="datetime-local" required/></div><div className="field"><label>到期时间</label><input className="input" name="validUntil" type="datetime-local"/><small>留空表示长期有效</small></div></div>
  <div className="field"><label>授权备注</label><textarea className="textarea" name="note" required minLength={2} maxLength={300} placeholder="例如：冷启动邀请、内测赠阅。不要记录个人交易信息。"/></div>
  {state.error&&<p className="notice" role="alert">{state.error}</p>}{state.success&&<p className="notice success" role="status">{state.success}</p>}
  <button className="button" disabled={pending}>{pending?"保存中…":"授予阅读权限"}</button>
  </form>}
