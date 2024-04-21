import React, { useEffect, useState } from 'react';
import BackButton from '/images/Back Button.svg';
import { useNavigate } from 'react-router-dom';
import backendBaseUrl from '../../../apiConfig';
import axios from 'axios';

interface Table {
  userRole: string;
  fullName: string;
  email: string;
  subType: string;
  totRevenue: number;
  numPlaylists: number;
  numSessions: number;
  dateCreated: string;
}

export const AdminFinanceReportMain = () => {
  const storedToken = localStorage.getItem('sessionToken');
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/admin');
  };
  useEffect(() => {
    handleGenerate();
  }, []);

  const [adminTable, setAdminTable] = useState<Table[]>([]);

  // API - POST
  const handleGenerate = async () => {
    console.log(
      'Request data:',
      JSON.stringify({
        role: userRole,
        name: fullName,
        email: email,
        subscription: subType,
        revenue: totRevenue,
        playlists: totPlaylists,
        sessions: numSessions,
        date: dateCreated,
        startDate: startDate,
        endDate: endDate,
      })
    );
    try {
      const response = await axios.post(
        `${backendBaseUrl}/api/admin/adminUserReport`,
        {
          role: userRole,
          name: fullName,
          email: email,
          subscription: subType,
          revenue: totRevenue,
          playlists: totPlaylists,
          sessions: numSessions,
          date: dateCreated,
          startDate: startDate,
          endDate: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      setAdminTable(response.data);
    } catch (error) {
      console.error('Error fetching data for table:', error);
    }
  };

  // USESTATES
  const [userRole, setUserRole] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subType, setSubType] = useState('');
  const [totRevenue, setTotRevenue] = useState('');
  const [totPlaylists, setTotPlaylists] = useState('');
  const [numSessions, setNumSessions] = useState('');
  const [dateCreated, setDateCreated] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [maxTransaction, setMaxTransaction] = useState('');
  const [minTransaction, setMinTransaction] = useState('');

  return (
    <div
      className="text-white pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 130px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-hidden">
        <div className="absolute top-40 left-20">
          <img
            src={BackButton}
            alt="Back"
            onClick={handleBack}
            className="cursor-pointer"
          />
        </div>
        <div className="text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Financial Data Report
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
              </select>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="text-xs">Subscription Type</div>
              <select
                className="bg-white text-black h-12 w-60 font-bold py-2 px-4 rounded"
                onChange={(e) => setSubType(e.target.value)}
              >
                {/* Options */}
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

          {/* Generate Report Button and Inputs */}
          <div className="flex flex-wrap justify-center gap-32 w-full">
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

            <div className="flex flex-col justify-center items-center">
              <div className="text-xs">Number of Sessions</div>
              <input
                type="text"
                placeholder="Enter number of sessions"
                className="bg-white text-black text-sm h-12 w-60 font-bold py-3 px-4 rounded"
                value={numSessions}
                onChange={(e) => setNumSessions(e.target.value)}
              />
            </div>

            <div className="flex flex-col justify-end items-end">
              <button
                className="bg-[#9E67E4] text-white text-bold h-12 w-full font-bold py-2 px-14 rounded"
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
                {adminTable.map((tuple: Table) => (
                  <tr key={tuple.userRole}>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.fullName}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.email}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.subType}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.totRevenue}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.numPlaylists}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.numSessions}
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
