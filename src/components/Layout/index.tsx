import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Taskbar from "./Taskbar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Taskbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Toaster richColors position="bottom-right" />
    </div>
  );
};

export default Layout;
