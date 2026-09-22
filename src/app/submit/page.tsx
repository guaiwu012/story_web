import { requireUser } from "@/lib/auth";
import { SubmissionForm } from "@/components/submission-form";
export const metadata={title:"投稿"};
export default async function Submit(){await requireUser();return <div className="container page"><div className="page-head"><div><span className="eyebrow">原创短篇征稿</span><h1 className="title">写到一半，让人想知道结局。</h1><p className="subtitle">首版只接收纯文本。请提交完整稿件；审核通过后，编辑会通过你填写的联系方式联系你。</p></div></div><div className="form-card"><SubmissionForm/></div></div>}
