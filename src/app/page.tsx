import Sidebar from "@/components/Sidebar";
import ProfileCard from "@/components/ProfileCard";
import ProjectsMasonry from "@/components/ProjectsMasonry";

export default function Home() {
  return (
    <main className="flex h-screen overflow-hidden bg-bg text-fg">
      <Sidebar />

      <section className="flex-1 w-full p-6 md:p-8 lg:p-10 h-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start w-full h-full">
          <div className="flex flex-col gap-6 w-full overflow-y-auto max-h-full pr-2">
            <ProfileCard />
          </div>

          <div className="w-full h-full min-h-0">
            <ProjectsMasonry />
          </div>
        </div>
      </section>
    </main>
  );
}
