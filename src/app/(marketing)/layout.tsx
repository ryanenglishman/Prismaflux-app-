import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mkt-layout">
      <Header />
      <main className="mkt-main">{children}</main>
      <Footer />
    </div>
  );
}
