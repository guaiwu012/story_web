"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminSections = [
  { href: "/admin/memberships", label: "阅读权限" },
  { href: "/admin/submissions", label: "投稿审核" },
  { href: "/admin/stories", label: "作品管理" },
];

export function AdminModeSwitch() {
  const pathname = usePathname();
  const inAdmin = pathname.startsWith("/admin");

  return <nav className="mode-switch" aria-label="界面模式">
    <Link href="/" aria-current={!inAdmin ? "page" : undefined}>
      <span className="mode-label-long">阅读模式</span><span className="mode-label-short">阅读</span>
    </Link>
    <Link href="/admin/memberships" aria-current={inAdmin ? "page" : undefined}>
      <span className="mode-label-long">管理后台</span><span className="mode-label-short">管理</span>
    </Link>
  </nav>;
}

export function AdminSectionNav() {
  const pathname = usePathname();

  return <nav className="side-links" aria-label="管理功能">
    {adminSections.map(({ href, label }) => <Link
      key={href}
      href={href}
      aria-current={pathname.startsWith(href) ? "page" : undefined}
    >{label}</Link>)}
  </nav>;
}
