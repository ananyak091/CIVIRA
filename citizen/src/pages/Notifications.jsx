import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

const initialNotifications = [
  {
    id: "n1",
    type: "status",
    title: "Complaint In Progress",
    message: "Your complaint #CIV-1033 is now being worked on.",
    complaintId: "1033",
    time: "Today · 10:30 AM",
    read: false,
  },
  {
    id: "n2",
    type: "assignment",
    title: "Complaint Assigned",
    message: "Your complaint has been assigned to Sanitation Department.",
    complaintId: "1033",
    time: "Yesterday · 6:15 PM",
    read: true,
  },
  {
    id: "n3",
    type: "action",
    title: "Action Required",
    message: "Please upload additional photos for complaint #CIV-1031.",
    complaintId: "1031",
    time: "Yesterday · 2:40 PM",
    read: false,
  },
  {
    id: "n4",
    type: "resolved",
    title: "Complaint Resolved",
    message: "Complaint #CIV-1029 has been successfully resolved.",
    complaintId: "1029",
    time: "2 days ago",
    read: true,
  },
];

const typeIcon = {
  status: <Clock size={18} />,
  assignment: <MessageSquare size={18} />,
  action: <AlertTriangle size={18} />,
  resolved: <CheckCircle2 size={18} />,
};

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center gap-3">
          <Bell className="text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-800">Notifications</h1>
        </header>

        {/* Notification List */}
        <div className="bg-white border divide-y border-slate-200 rounded-2xl">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markAsRead(n.id);
                navigate(`/complaints/${n.complaintId}`);
              }}
              className={`flex gap-4 p-5 cursor-pointer transition ${
                n.read ? "bg-white" : "bg-[#eff6ff]"
              } hover:bg-slate-50`}
            >
              {/* Icon */}
              <div className="mt-1 text-blue-600">{typeIcon[n.type]}</div>

              {/* Content */}
              <div className="flex-1">
                <p className="font-semibold text-slate-800">{n.title}</p>
                <p className="mt-1 text-sm text-slate-600">{n.message}</p>
                <p className="mt-2 text-xs text-slate-400">{n.time}</p>
              </div>

              {/* Unread Indicator */}
              {!n.read && (
                <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full" />
              )}
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No notifications yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
