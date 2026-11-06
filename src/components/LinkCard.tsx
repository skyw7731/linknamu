"use client";

import type { LinkItem } from "@/data/profile";

function recordClick(id: string) {
  const body = JSON.stringify({ id });
  // 페이지를 떠나도 전송되도록 sendBeacon을 우선 사용합니다.
  if (navigator.sendBeacon?.("/api/clicks", new Blob([body], { type: "application/json" }))) {
    return;
  }
  fetch("/api/clicks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export default function LinkCard({ link }: { link: LinkItem }) {
  // mailto: 링크는 새 탭으로 열면 빈 탭이 남으므로 현재 탭에서 메일 앱을 엽니다.
  const isWebLink = /^https?:\/\//.test(link.url);
  return (
    <a
      href={link.url}
      target={isWebLink ? "_blank" : undefined}
      rel={isWebLink ? "noopener noreferrer" : undefined}
      onClick={() => recordClick(link.id)}
      className="liquid-glass block w-full rounded-full px-6 py-[18px] text-center text-[15px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring-accent"
    >
      {link.title}
    </a>
  );
}
