import TopBar from "@/components/layout/TopBar";
import BottomNav from "@/components/layout/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full" style={{ background: "var(--color-bg)" }}>
      <TopBar />
      <main
        className="flex-1 overflow-y-auto"
        style={{
          paddingTop: "var(--topbar-h)",
          paddingBottom: "var(--bottomnav-h)",
        }}
      >
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
