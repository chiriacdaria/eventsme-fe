// PriorityBadge.tsx
import React from "react";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let badgeColor = "";

  switch (status.toLowerCase()) {
    case "going":
      badgeColor = "#9BCF53";
      break;
    case "pending":
      badgeColor = "#FAA300";
      break;
    case "declined":
      badgeColor = "#ee4266";
      break;
    default:
      badgeColor = "bg-gray-500";
  }

  return (
    <span
      className={`inline-block px-4 py-1 text-xs font-semibold text-white rounded-xl ${badgeColor}`}
      style={{ backgroundColor: badgeColor }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
