import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllActivityLogs,
  getsingleUserActivityLogs,
} from "../features/activitySlice";
import TopNavbar from "../Components/TopNavbar";
import FormattedTime from "../lib/FormattedTime";
import getSocket from "../lib/socket";

function Activitylogpage() {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  const { activityLogs, isFetching, userdata } = useSelector(
    (state) => state.activity
  );
  const { Authuser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch all activity logs
    dispatch(getAllActivityLogs());

    // Only fetch single user logs if Authuser exists and has an id
    if (Authuser?._id) {
      dispatch(getsingleUserActivityLogs(Authuser._id));
    }

    const socket = getSocket();
    if (!socket) return;

    socket.on("newActivityLog", (newLog) => {
      setLogs((prevLogs) => [newLog, ...prevLogs]);
    });

    return () => {
      if (socket) socket.off("newActivityLog");
    };
  }, [dispatch, Authuser?._id]);

  useEffect(() => {
    // Update local logs from Redux state
    setLogs(activityLogs || []);
  }, [activityLogs]);

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(logs.length / logsPerPage);

  return (
    <div className="bg-base-100 min-h-screen">
      <TopNavbar />
      <div className="mt-10 ml-5">
        <h1 className="text-xl font-semibold mb-4">Activity Logs</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-base-100 mb-24 border-gray-200 rounded-lg shadow-md">
            <thead className="bg-base-100">
              <tr>
                <th className="px-3 py-2 border w-5">#</th>
                <th className="px-3 py-2 border">Name</th>
                <th className="px-3 py-2 border">Email</th>
                <th className="px-3 py-2 border">Action</th>
                <th className="px-3 py-2 border">Affected Part</th>
                <th className="px-3 py-2 border">Description</th>
                <th className="px-3 py-2 border">Time</th>
                <th className="px-3 py-2 border">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(currentLogs) && currentLogs.length > 0 ? (
                currentLogs.map((log, index) => (
                  <tr key={log._id || index}>
                    <td className="px-3 py-2 border">
                      {indexOfFirstLog + index + 1}
                    </td>
                    <td className="px-3 py-2 border">
                      {log.userId?.name || "N/A"}
                    </td>
                    <td className="px-3 py-2 border">
                      {log.userId?.email || "N/A"}
                    </td>
                    <td className="px-3 py-2 border">{log.action}</td>
                    <td className="px-3 py-2 border">{log.entity}</td>
                    <td className="px-3 py-2 border">{log.description}</td>
                    <td className="px-4 py-2 border">
                      <FormattedTime timestamp={log.createdAt} />
                    </td>
                    <td className="px-4 py-2 border">
                      {log.ipAddress || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    <p>No activity logs available</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="join mt-4 mb-20 ml-72 flex justify-center">
          <button
            className="join-item btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`join-item btn ${
                currentPage === index + 1 ? "btn-active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="join-item btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Activitylogpage;
