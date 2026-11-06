// 프로필과 링크 목록을 여기서 수정하세요.

export type LinkItem = {
  /** 클릭 수 집계에 쓰이는 고유 ID (변경하면 기존 집계와 분리됩니다) */
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 기준 경로 또는 외부 이미지 URL */
  avatar: string;
};

export const profile: Profile = {
  name: "김개발",
  bio: "풀스택 개발자 ; 요즘에는 AI 개발에 관심이 많아요",
  avatar: "/profile.jpg",
};

export const links: LinkItem[] = [
  { id: "github", title: "💻 깃허브", url: "https://github.com/skyw7731" },
  { id: "blog", title: "📝 블로그", url: "https://blog.naver.com/skyw7731" },
  { id: "email", title: "📬 이메일", url: "mailto:skyw7732@gmail.com" },
];

export function isKnownLinkId(id: unknown): id is string {
  return typeof id === "string" && links.some((link) => link.id === id);
}
