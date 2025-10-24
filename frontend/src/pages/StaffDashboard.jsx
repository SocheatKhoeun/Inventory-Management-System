import React from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Dashboardpage from "./Dashboardpage";

function StaffDashboard() {
  const location = useLocation();
  // Only show dashboard on the main dashboard route
  const isDashboard =
    location.pathname === "/StaffDashboard" ||
    location.pathname === "/StaffDashboard/";

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

export default StaffDashboard;
