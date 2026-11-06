import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import BlossomBackdrop from "@/components/BlossomBackdrop";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <>
      <BlossomBackdrop />
      {/* 장식 원(z-0) 위에 콘텐츠가 오도록 z-10 */}
      <main className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-16 pb-10 sm:max-w-[440px] sm:pt-24">
        <ProfileHeader profile={profile} />

        <LinkList links={links} />

        <footer className="mt-auto pt-16 text-center text-xs tracking-wide text-muted/70">
          링크나무 🌳
        </footer>
      </main>
    </>
  );
}
