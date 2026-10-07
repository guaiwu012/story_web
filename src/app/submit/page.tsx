import { requireUser } from "@/lib/auth";
import { SubmissionForm } from "@/components/submission-form";
export const metadata={title:"推荐一篇文章"};
export default async function Submit(){await requireUser();return <div className="container page narrow-page"><div className="page-head"><div><span className="eyebrow">推荐收录</span><h1 className="title">把你舍不得忘记的文章，递给我。</h1><p className="subtitle">可以推荐自己的文字，也可以推荐你读过的好文章。请尽量写明作者和原始出处；本站非盈利，收录前会人工阅读与核对。</p></div></div><div className="form-card"><SubmissionForm/></div></div>}
