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

// TODO: 실제 프로필로 교체하세요. (현재는 보여주기용 더미 값)
export const profile: Profile = {
  name: "김기범",
  bio: "세계최강바이브코더",
  avatar: "/profile.svg",
};

export const links: LinkItem[] = [
  // TODO: 실제 주소로 교체하세요. (현재는 보여주기용 더미 값)
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com" },
  { id: "blog", title: "Blog", url: "https://velog.io" },
];

export function isKnownLinkId(id: unknown): id is string {
  return typeof id === "string" && links.some((link) => link.id === id);
}
