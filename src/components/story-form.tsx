"use client";
import {useActionState} from "react";
import {createStory,type ActionState} from "@/app/actions";
export function StoryForm(){const[state,action,pending]=useActionState<ActionState,FormData>(createStory,{});return <form action={action} className="form">
  <p className="form-hint">只有正文必填。其余信息可以现在补充，也可以留到以后整理。</p>
  <div className="field"><label htmlFor="content">完整正文 <span aria-hidden="true">*</span></label><textarea className="textarea long" id="content" name="content" required/><small>发布前请尽量核对段落和标点。文章地址会由系统自动生成。</small></div>
  <div className="form-row"><div className="field"><label htmlFor="title">标题（选填）</label><input className="input" id="title" name="title" maxLength={120} placeholder="留空时显示“无题”"/></div><div className="field"><label htmlFor="authorName">作者与来源（选填）</label><input className="input" id="authorName" name="authorName" maxLength={120} placeholder="留空时显示“佚名 / 待认领”"/><small>知道原作者或原始平台时再填写。</small></div></div>
  <div className="field"><label htmlFor="summary">编辑按语 / 简介（选填）</label><textarea className="textarea" id="summary" name="summary" maxLength={500} placeholder="可以留空"/></div>
  <div className="field"><label htmlFor="categoryName">类别（选填）</label><input className="input" id="categoryName" name="categoryName" maxLength={40} placeholder="例如：生活随笔"/></div>
  {state.error&&<p className="notice" role="alert">{state.error}</p>}{state.success&&<p className="notice success" role="status">{state.success}</p>}
  <button className="button" disabled={pending}>{pending?"保存中…":"保存为草稿"}</button>
  </form>}
