import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "认领文章",
  description: "联系平台管理员认领已发布的文章。",
};

export default function ClaimPage() {
  return <div className="container page claim-page">
    <section className="claim-card" aria-labelledby="claim-title">
      <span className="eyebrow">作者服务</span>
      <h1 id="claim-title">认领文章</h1>
      <p>如果你是文章作者，请扫码添加管理员微信，并说明需要认领的文章。</p>
      <div className="claim-qr">
        <Image
          src="/images/claim-wechat.jpg"
          alt="用于联系管理员认领文章的微信二维码"
          width={594}
          height={621}
          priority
        />
      </div>
      <small>手机访问时，可长按二维码识别。</small>
    </section>
  </div>;
}
