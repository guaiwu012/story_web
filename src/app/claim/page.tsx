import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "认领文章",
  description: "原作者联系站长，确认、修订或撤下已收录文章。",
};

export default function ClaimPage() {
  return <div className="container page claim-page">
    <section className="claim-card" aria-labelledby="claim-title">
      <span className="eyebrow">原作者联系</span>
      <h1 id="claim-title">认领文章</h1>
      <p>如果你是文章作者，请扫码添加我的微信。你可以确认署名与出处、补充信息、提出修订，或要求撤下文章。</p>
      <div className="claim-qr">
        <Image
          src="/images/claim-wechat.jpg"
          alt="用于联系管理员认领文章的微信二维码"
          width={594}
          height={621}
          priority
        />
      </div>
      <small>添加时请备注文章标题。手机访问可长按二维码识别。</small>
    </section>
  </div>;
}
