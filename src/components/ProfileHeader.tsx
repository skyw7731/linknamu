import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 테두리 없이 겹친 그림자만으로 사진이 떠 있는 느낌 */}
      <Image
        src={profile.avatar}
        alt={`${profile.name} 프로필 사진`}
        width={128}
        height={128}
        priority
        className="size-28 rounded-full object-cover shadow-avatar sm:size-32"
      />
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-muted">{profile.bio}</p>
    </header>
  );
}
