"use client";
import {useActionState} from "react";
import {createStory,type ActionState} from "@/app/actions";
export function StoryForm(){const[state,action,pending]=useActionState<ActionState,FormData>(createStory,{});return <form action={action} className="form">
  <div className="form-row"><div className="field"><label htmlFor="title">标题</label><input className="input" id="title" name="title" required/></div><div className="field"><label htmlFor="authorName">作者与来源</label><input className="input" id="authorName" name="authorName" required placeholder="例如：日光射线（小红书）"/><small>按原文准确署名，并标注来源平台。</small></div></div>
  <div className="field"><label htmlFor="slug">文章网址标识</label><input className="input" id="slug" name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="resist-the-urge-to-stand"/><small>只使用小写字母、数字和连字符。</small></div>
  <div className="field"><label htmlFor="summary">编辑按语 / 简介</label><textarea className="textarea" id="summary" name="summary" required minLength={10} placeholder="为什么想把这篇文章留在这里？"/></div>
  <div className="form-row"><div className="field"><label htmlFor="categoryName">类别名称</label><input className="input" id="categoryName" name="categoryName" required placeholder="生活随笔"/></div><div className="field"><label htmlFor="categorySlug">类别网址标识</label><input className="input" id="categorySlug" name="categorySlug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="life-essay"/></div></div>
  <div className="field"><label htmlFor="content">完整正文</label><textarea className="textarea long" id="content" name="content" required minLength={100}/><small>请核对段落、标点和作者署名。发布后所有人都可以免费阅读全文。</small></div>
  {state.error&&<p className="notice" role="alert">{state.error}</p>}{state.success&&<p className="notice success" role="status">{state.success}</p>}
  <button className="button" disabled={pending}>{pending?"保存中…":"保存为草稿"}</button>
  </form>}
