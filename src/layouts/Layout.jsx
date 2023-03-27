import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="mb-5 h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
