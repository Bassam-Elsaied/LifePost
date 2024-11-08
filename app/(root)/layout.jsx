import NavBar from "@/components/NavBar";

export default function Layout({ children }) {
  return (
    <main className="font-work-sans">
      <NavBar />
      {children}
    </main>
  );
}
