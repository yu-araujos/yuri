import Sidebar from "@/components/Sidebar";
import ProfileCard from "@/components/ProfileCard";
import ContactsCard from "@/components/ContactsCard";
import Projects from "@/components/Projects";
import GithubStatsCard from "@/components/GithubStatsCard";

export default function Home() {
  return (
    <main className="flex h-screen overflow-hidden bg-bg text-fg">
      <Sidebar />

      <section className="flex-1 w-full p-6 md:p-8 lg:p-10 h-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start w-full h-full">
          <div className="flex flex-col gap-6 w-full h-full overflow-y-auto pr-2">
            <div className="flex flex-col xl:flex-row gap-6 w-full items-stretch shrink-0">
              <ProfileCard />
              <ContactsCard />
            </div>

            <GithubStatsCard />
          </div>

          <div className="w-full h-full min-h-0">
            <Projects />
          </div>
        </div>
      </section>
    </main>
  );
}
