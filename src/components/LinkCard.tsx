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

type LinkCardProps = {
  link: LinkItem;
  count: number;
  onClick?: (id: string) => void;
};

const countFormatter = new Intl.NumberFormat("ko-KR");

export default function LinkCard({ link, count, onClick }: LinkCardProps) {
  // mailto: 링크는 새 탭으로 열면 빈 탭이 남으므로 현재 탭에서 메일 앱을 엽니다.
  const isWebLink = /^https?:\/\//.test(link.url);
  return (
    <a
      href={link.url}
      target={isWebLink ? "_blank" : undefined}
      rel={isWebLink ? "noopener noreferrer" : undefined}
      onClick={() => {
        recordClick(link.id);
        onClick?.(link.id);
      }}
      // 좌우 칸을 같은 비율(1fr)로 두어 제목은 정가운데, 클릭 수는 오른쪽 끝에 놓입니다.
      className="liquid-glass grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-full px-6 py-[18px] text-[15px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring-accent"
    >
      <span aria-hidden />
      <span className="text-center">{link.title}</span>
      <span className="justify-self-end text-xs font-medium tabular-nums text-muted">
        {countFormatter.format(count)}회
      </span>
    </a>
  );
}
