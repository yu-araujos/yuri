import Sidebar from "@/components/Sidebar";
import ProfileCard from "@/components/ProfileCard";
import ContactsCard from "@/components/ContactsCard";
import Projects from "@/components/Projects";
import GithubStatsCard from "@/components/GithubStatsCard";

export default function Home() {
  return (
    <main className="flex h-dvh overflow-hidden bg-bg text-fg">
      <Sidebar />

      <section className="flex-1 min-w-0 p-6 md:p-8 lg:p-10 overflow-hidden">
        <div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.85fr)] gap-6 lg:gap-8 xl:gap-10">
          <div className="flex min-h-0 flex-col gap-6 overflow-y-auto pr-1">
            <div className="grid min-w-0 grid-cols-2 items-stretch gap-4 lg:gap-5">
              <ProfileCard />
              <ContactsCard />
            </div>
            <GithubStatsCard />
          </div>

          <div className="min-h-0 overflow-hidden">
            <Projects />
          </div>
        </div>
      </section>
    </main>
  );
}
