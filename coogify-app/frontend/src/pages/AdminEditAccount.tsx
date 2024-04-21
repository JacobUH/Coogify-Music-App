import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { AdminUserReportMain } from '../components/interface/mainPages/AdminUserReportMain';
import React from 'react';
import { AdminNavbar } from '../components/interface/elements/AdminNavbar';
import { AdminEditAccountMain } from '../components/interface/mainPages/AdminEditAccountMain';

export const AdminEditAccount = () => {
  return (
    <div className="w-full h-full text-white relative">
      <AdminNavbar />
      <AdminEditAccountMain />
      <Outlet />
    </div>
  );
};
