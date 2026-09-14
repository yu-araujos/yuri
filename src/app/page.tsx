import Sidebar from "@/components/Sidebar";
import ProfileCard from "@/components/ProfileCard";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-bg text-fg">
      <Sidebar />

      <section className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl">
        {/* ─── Bento Grid (Estilo Pinterest / Masonry) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Card Principal: Perfil / MOD.00 (ocupa 7 ou 8 colunas) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <ProfileCard />
          </div>

          {/* Próximos cards do Bento serão adicionados aqui */}
        </div>
      </section>
    </main>
  );
}

