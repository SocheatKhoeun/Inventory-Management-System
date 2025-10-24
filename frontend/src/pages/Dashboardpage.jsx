import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopNavbar from "../Components/TopNavbar";
import { getrecentActivityLogs } from "../features/activitySlice";
import { staffUser, managerUser, adminUser } from "../features/authSlice";
import { LuActivity, LuClock } from "react-icons/lu";
import FormattedTime from "../lib/FormattedTime";
import getSocket from "../lib/socket";

function Dashboardpage() {
  const dispatch = useDispatch();
  const { staffuser, manageruser, adminuser } = useSelector(
    (state) => state.auth
  );
  const { recentuser } = useSelector((state) => state.activity);

  useEffect(() => {
    dispatch(getrecentActivityLogs());
    dispatch(staffUser());
    dispatch(managerUser());
    dispatch(adminUser());

    const socket = getSocket();
    if (!socket) return;

    socket.on("newActivityLog", (newLog) => {
      console.log("New activity log:", newLog);
    });

    return () => {
      if (socket) socket.off("newActivityLog");
    };
  }, [dispatch]);

  return (
    <div className="bg-base-100 min-h-screen">
      <TopNavbar />
      <div className="mt-10 px-12">
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Staff Users</h3>
            <p className="text-4xl font-bold">{staffuser?.length || 0}</p>
          </div>
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Managers</h3>
            <p className="text-4xl font-bold">{manageruser?.length || 0}</p>
          </div>
          <div className="bg-purple-600 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Admins</h3>
            <p className="text-4xl font-bold">{adminuser?.length || 0}</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <LuActivity className="mr-2" /> Recent Activity
          </h2>
          <div className="space-y-3">
            {Array.isArray(recentuser) && recentuser.length > 0 ? (
              recentuser
                .filter((log) => log && log._id) // Filter out null/undefined logs
                .map((log) => (
                  <div
                    key={log._id}
                    className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                  >
                    <LuClock className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">
                            {log.action || "Activity"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {log.description || "No description"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            User:{" "}
                            <span className="font-medium">
                              {log.userId?.name || "Unknown User"}
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <FormattedTime timestamp={log.createdAt} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                No recent activity
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboardpage;
