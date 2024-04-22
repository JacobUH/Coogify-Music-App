import React, { useEffect, useState } from 'react';
import BackButton from '/images/Back Button.svg';
import { useNavigate } from 'react-router-dom';
import backendBaseUrl from '../../../apiConfig';
import axios from 'axios';

interface Table {
  role: string;
  fullName: string;
  email: string;
  subscriptionType: string;
  totalTransactionsAmount: number;
  totalPlaylistIDs: number;
  totalSessionIDs: number;
  dateCreated: string;
}

export const AdminUserReportMain = () => {
  const storedToken = localStorage.getItem('sessionToken');

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/admin');
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  // API - POST
  const handleGenerate = async () => {
    console.log(
      'Request data:',
      JSON.stringify({
        role: userRole,
        subscription: subType,
        startDate: startDate,
        endDate: endDate,
        minTransaction: minTransaction,
        maxTransaction: maxTransaction,
      })
    );
    try {
      const response = await axios.post(
        `${backendBaseUrl}/api/admin/adminUserReport`,
        {
          role: userRole,
          subscription: subType,
          startDate: startDate,
          endDate: endDate,
          minTransaction: minTransaction,
          maxTransaction: maxTransaction,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      setUserTable(response.data);
    } catch (error) {
      console.error('Error fetching data for table:', error);
    }
  };

  // USESTATES USED IN GENERATE REPORT / TABLES
  const [userRole, setUserRole] = useState('');
  const [subType, setSubType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minTransaction, setMinTransaction] = useState('');
  const [maxTransaction, setMaxTransaction] = useState('');

  //  ADDITIONAL STATES IN TABLES
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [totRevenue, setTotRevenue] = useState('');
  const [totPlaylists, setTotPlaylists] = useState('');
  const [numSessions, setNumSessions] = useState('');
  const [dateCreated, setDateCreated] = useState('');

  // TABLE OUTPUT
  const [userTable, setUserTable] = useState<Table[]>([]);

  return (
    <div
      className="text-white pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 130px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md">
        <div className="absolute top-40 left-20">
          <img
            src={BackButton}
            alt="Back"
            onClick={handleBack}
            className="cursor-pointer"
          />
        </div>
        <div className="text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          User Metric Data Report
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          {/* Work in here */}
          <div className="flex flex-wrap justify-center gap-32 w-full">
            {/* DROP DOWNS */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-xs">Role</div>
              <select
                className="bg-white text-black h-12 w-60 font-bold py-2 px-4 rounded"
                onChange={(e) => setUserRole(e.target.value)}
              >
                {/* Options */}
                <option
                  value=""
                  hidden
                  disabled
                  className="text-[#979797] text-left"
                >
                  Select a role
                </option>
                <option value="">Any</option>
                <option value="Listener">Listener</option>
                <option value="Artist">Artist</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="text-xs">Subscription Type</div>
              <select
                className="bg-white text-black h-12 w-60 font-bold py-2 px-4 rounded"
                onChange={(e) => setSubType(e.target.value)}
              >
                {/* Options */}
                <option
                  value=""
                  hidden
                  disabled
                  className="text-[#979797] text-left"
                >
                  Select a Subscription
                </option>
                <option value="">Any</option>
                <option value="Free">Free</option>
                <option value="Paid">Premium</option>
                <option value="Student">Student</option>
              </select>
            </div>

            {/* INPUTS */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-xs">Start Date</div>
              <input
                type="date"
                placeholder="Enter start date"
                className="bg-white text-black text-sm h-12 w-60 font-bold py-3 px-4 rounded"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="text-xs">End Date</div>
              <input
                type="date"
                placeholder="Enter end date"
                className="bg-white text-black text-sm h-12 w-60 font-bold py-3 px-4 rounded"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* 
          <div className="flex flex-col justify-center items-center">
              <div className="text-xs">Min Transaction Amount</div>
              <input
                type="text"
                placeholder="Enter min amount"
                className="bg-white text-black text-sm h-12 w-60 font-bold py-3 px-4 rounded"
                value={minTransaction}
                onChange={(e) => setMinTransaction(e.target.value)}
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="text-xs">Max Transaction Amount</div>
              <input
                type="text"
                placeholder="Enter max amount"
                className="bg-white text-black text-sm h-12 w-60 font-bold py-3 px-4 rounded"
                value={maxTransaction}
                onChange={(e) => setMaxTransaction(e.target.value)}
              />
            </div>
          */}
          {/* Generate Report Button and Inputs */}
          <div className="flex flex-wrap justify-center gap-32 w-full mt-3">
            <div className="flex flex-col justify-end items-end">
              <button
                className="bg-[#9E67E4] text-white text-bold h-12 w-full font-bold py-2 px-[650px] rounded"
                onClick={handleGenerate}
              >
                Generate Report
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="px-0.5 mt-12">
            {' '}
            {/* TABLE USER SUBSCRIPTION REPORT */}
            <table className="border-collapse border-2 w-full text-sm table-fixed">
              {/* All 8 columns here */}
              <thead className="text-black bg-[#D8D9DB]">
                <tr>
                  <th className="border-black py-3 px-2 ">ROLE</th>
                  <th className="border-black py-3 px-2 ">FULL NAME</th>
                  <th className="border-black py-3 px-2 ">EMAIL</th>
                  <th className="border-black py-3 px-2 ">SUBSCRIPTION TYPE</th>
                  <th className="border-black py-3 px-2 ">TOTAL REVENUE </th>
                  <th className="border-black py-3 px-2 ">TOTAL PLAYLISTS</th>
                  <th className="border-black py-3 px-2 ">
                    NUMBER OF SESSIONS
                  </th>
                  <th className="border-black py-3 px-2 ">DATE CREATED</th>
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="text-black text-center">
                {userTable.map((tuple: Table, index) => (
                  <tr key={index}>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.role}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.fullName}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.email}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.subscriptionType}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.totalTransactionsAmount}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.totalPlaylistIDs}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.totalSessionIDs}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {new Date(tuple.dateCreated).toLocaleDateString('en-US')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
