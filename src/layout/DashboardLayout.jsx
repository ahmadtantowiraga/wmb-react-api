import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar/Sidebar";


function DashboardLayout() {

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <main className="w-100 flex-grow-1">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default DashboardLayout;
