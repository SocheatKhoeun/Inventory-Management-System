import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications } from "../features/notificationSlice";
import FormattedTime from "../lib/FormattedTime";
import image from "../images/user.png";
import TopNavbar from "../Components/TopNavbar";
import getSocket from "../lib/socket";

function NotificationPageRead() {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);
  const { Authuser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllNotifications());

    const socket = getSocket();
    if (!socket) return;

    socket.on("newNotification", () => {
      dispatch(getAllNotifications());
    });

    return () => {
      if (socket) socket.off("newNotification");
    };
  }, [dispatch]);

  return (
    <div className="bg-base-100 min-h-screen">
      <TopNavbar />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100"
              >
                <img
                  src={Authuser?.ProfilePic || image}
                  alt="User"
                  className="w-10 h-10 rounded-full mr-4 object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {notification.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.type}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    <FormattedTime timestamp={notification.createdAt} />
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No notifications available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationPageRead;
