import ContactsCard from "@/components/profile/ContactsCard";
import GithubStatsCard from "@/components/profile/GithubStatsCard";
import ProfileCard from "@/components/profile/ProfileCard";
import Projects from "@/components/projects/Projects";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col md:h-dvh md:flex-row md:overflow-hidden bg-bg text-fg">
      <Sidebar />

      <section className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto md:overflow-hidden">
        <div className="grid grid-cols-1 gap-6 lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.85fr)] lg:gap-8 xl:gap-10">
          <div className="flex flex-col gap-6 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
            <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-[1.4fr_1fr] lg:gap-5">
              <ProfileCard />
              <GithubStatsCard />
            </div>
            <ContactsCard />
          </div>

          <div className="lg:min-h-0 lg:overflow-hidden">
            <Projects />
          </div>
        </div>
      </section>
    </main>
  );
}
