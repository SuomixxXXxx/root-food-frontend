import React from "react";
import { Outlet } from "react-router-dom";
import SideBarWorker from "../components/SideBarWorker";

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <div className="w-1/5  p-4">
        <SideBarWorker />
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
