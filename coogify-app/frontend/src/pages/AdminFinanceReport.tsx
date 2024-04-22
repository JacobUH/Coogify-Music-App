import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/elements/Sidebar';
import { AdminFinanceReportMain } from '../components/interface/mainPages/AdminFinanceReportMain';
import React from 'react';
import { AdminNavbar } from '../components/interface/elements/AdminNavbar';

export const AdminFinanceReport = () => {
  return (
    <div className="w-full h-full text-white relative">
      <AdminNavbar />
      <AdminFinanceReportMain />
      <Outlet />
    </div>
  );
};
