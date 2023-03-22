import { Outlet, Link } from "react-router-dom";

export default function BasicLayout() {
  return (
    <>
      <nav>
        <Link to="dashboard">Dashboard</Link>
        <Link to="tagging">Tagging</Link>
        <Link to="about">About</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
