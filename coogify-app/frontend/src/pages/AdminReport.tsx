import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { AdminUserReportMain } from '../components/interface/mainPages/AdminUserReportMain';
import React from 'react';
import { AdminNavbar } from '../components/interface/elements/AdminNavbar';

export const AdminUserReport = () => {
  return (
    <div className="w-full h-full text-white relative">
      <AdminNavbar />
      <AdminUserReportMain />
      <Outlet />
    </div>
  );
};
