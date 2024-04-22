import React, { useEffect, useState } from 'react';
import BackButton from '/images/Back Button.svg';
import { useNavigate } from 'react-router-dom';
import backendBaseUrl from '../../../apiConfig';
import axios from 'axios';

interface Table {
  date: string;
  totalRevenue: number;
  totalSessions: number;
  totalAccounts: number;
  totalLikes: number;
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
        minTotalRev: minTotalRev,
        maxTotalRev: maxTotalRev,
        startDate: startDate,
        endDate: endDate,
      })
    );
    try {
      const response = await axios.post(
        `${backendBaseUrl}/api/admin/adminFinanceReport`,
        {
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

  // USESTATES USED IN GENERATE REPORT / TABLES
  const [minTotalRev, setMinRevenue] = useState('');
  const [maxTotalRev, setMaxRevenue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // TABLE OUTPUT
  const [userTable, setUserTable] = useState<Table[]>([]);

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
          Daily Performance Data Report
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          {/* Work in here */}
          <div className="flex flex-wrap justify-center gap-32 w-full">
            {/* DROP DOWNS */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-xs">Min Total Revenue Amount</div>
              <input
                type="text"
                placeholder="Enter min amount"
                className="bg-white text-black text-sm h-12 w-60 font-bold py-3 px-4 rounded"
                value={minTotalRev}
                onChange={(e) => setMinRevenue(e.target.value)}
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="text-xs">Max Total Revenue Amount</div>
              <input
                type="text"
                placeholder="Enter max amount"
                className="bg-white text-black text-sm h-12 w-60 font-bold py-3 px-4 rounded"
                value={maxTotalRev}
                onChange={(e) => setMaxRevenue(e.target.value)}
              />
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
            {/* TABLE USER SUBSCRIPTION REPORT */}
            <table className="border-collapse border-2 w-full text-sm table-fixed">
              {/* All 8 columns here */}
              <thead className="text-black bg-[#D8D9DB]">
                <tr>
                  <th className="border-black py-3 px-2 ">RECORDED DATE</th>
                  <th className="border-black py-3 px-2 ">TOTAL REVENUE</th>
                  <th className="border-black py-3 px-2 ">TOTAL SESSIONS</th>
                  <th className="border-black py-3 px-2 ">
                    TOTAL ACCOUNTS CREATED
                  </th>
                  <th className="border-black py-3 px-2 ">TOTAL LIKES </th>
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="text-black text-center">
                {adminTable.map((tuple: Table) => (
                  <tr key={tuple.date}>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {new Date(tuple.date).toLocaleDateString('en-US')}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.totalRevenue}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.totalSessions}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.totalAccounts}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.totalLikes}
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
