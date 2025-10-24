import React from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Dashboardpage from "./Dashboardpage";

function ManagerDashboard() {
  const location = useLocation();
  // Only show dashboard on the main dashboard route
  const isDashboard =
    location.pathname === "/ManagerDashboard" ||
    location.pathname === "/ManagerDashboard/";

  return (
    <div className="flex bg-gray-200 min-h-screen">
      <div className="fixed h-full">
        <Sidebar />
      </div>

      <div className="flex-1 pl-64">
        {isDashboard ? <Dashboardpage /> : <Outlet />}
      </div>
    </div>
  );
}

export default ManagerDashboard;
