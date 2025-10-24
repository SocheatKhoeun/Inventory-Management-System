import React from "react";

export default function FormattedTime({ timestamp }) {
  if (!timestamp) return <span className="text-sm text-gray-500">N/A</span>;

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return <span className="text-sm text-gray-500">Invalid date</span>;

  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return <span>{seconds}s ago</span>;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return <span>{minutes}m ago</span>;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return <span>{hours}h ago</span>;

  return <span>{date.toLocaleString()}</span>;
}
