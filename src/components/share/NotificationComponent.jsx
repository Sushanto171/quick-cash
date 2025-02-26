/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL);

const NotificationComponent = ({ mobileNumber }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    socket.emit("register", mobileNumber);

    socket.on("notification", (data) => {
      setNotification(data.message);
      setTimeout(() => setNotification(null), 5000);
    });

    return () => {
      socket.off("notification");
    };
  }, [mobileNumber]);

  return (
    <div>
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
