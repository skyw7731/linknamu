"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "@/components/LinkCard";

type ClickCount = { id: string; count: number };

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 데이터를 받기 전에는 모두 0회로 시작합니다.
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(links.map((link) => [link.id, 0])),
  );

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<ClickCount[]>) : Promise.reject(res.status)))
      .then((data) => {
        setCounts((prev) => {
          const next = { ...prev };
          for (const { id, count } of data) next[id] = count;
          return next;
        });
      })
      .catch(() => {
        // 불러오기에 실패하면 0회 표시를 그대로 둡니다.
      });
    return () => controller.abort();
  }, []);

  // 누르는 즉시 화면의 숫자를 1 올리고, 서버 기록은 LinkCard가 보냅니다.
  const handleClick = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="mt-10 flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} count={counts[link.id] ?? 0} onClick={handleClick} />
        </li>
      ))}
    </ul>
  );
}
