import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={profile.avatar}
        alt={`${profile.name} 프로필 사진`}
        width={160}
        height={160}
        priority
        className="size-36 rounded-full object-cover ring-4 ring-white shadow-md sm:size-40 dark:ring-zinc-800"
      />
      <h1 className="mt-5 text-xl font-bold sm:text-2xl">{profile.name}</h1>
      <p className="mt-1 text-sm text-zinc-600 sm:text-base dark:text-zinc-400">{profile.bio}</p>
    </header>
  );
}
