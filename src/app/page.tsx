import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-12 sm:py-16">
      <ProfileHeader profile={profile} />

      <ul className="mt-8 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} />
          </li>
        ))}
      </ul>

      <footer className="mt-auto pt-12 text-center text-xs text-zinc-400">링크나무 🌳</footer>
    </main>
  );
}
