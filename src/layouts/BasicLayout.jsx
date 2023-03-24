import { Outlet, Link } from "react-router-dom";
import { MdDashboard, MdPeople } from "react-icons/md";
import { BiConversation } from "react-icons/bi";

export default function BasicLayout() {
  return (
    <div className="w-screen h-screen flex text-white">
      <nav className="bg-nav h-screen w-1/5 flex flex-col justify-center items-center space-y-16 text-xl">
        <Link to="dashboard">
          <span className="flex justify-center items-center">
            <MdDashboard className="mr-4" />
            DASHBOARD
          </span>
        </Link>
        <Link to="interview">
          <span className="flex justify-center items-center">
            <BiConversation className="mr-4" />
            INTERVIEW
          </span>
        </Link>
        <Link to="about">
          <span className="flex justify-center items-center">
            <MdPeople className="mr-4" />
            ABOUT
          </span>
        </Link>
      </nav>
      <main className="bg-base h-screen w-4/5">
        <Outlet />
      </main>
    </div>
  );
}
