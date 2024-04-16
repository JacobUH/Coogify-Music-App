import React from 'react';
import ProfileIcon from '/images/Profile Icon.svg';
import BackButton from '/images/Back Button.svg';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import backendBaseUrl from '../../../apiConfig';
import { useNavigate, Link } from 'react-router-dom';

interface Transaction {
  subscriptionType: string;
  startDate: string;
}

export const PrevTransactionsMain = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const storedToken = localStorage.getItem('sessionToken'); // using a session token

  //API GET
  useEffect(() => {
    const handleRetrieve = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/card/PrevTransactions`,

          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setTransactions(response.data);
      } catch (error) {
        console.error('error fetching previous transaction history: ', error);
      }
    };
    handleRetrieve();
  }, []);

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="relative bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto">
        <div className="absolute top-10 left-10">
          <img
            src={BackButton}
            alt="Back"
            onClick={handleBack}
            className="cursor-pointer"
          />
        </div>
        <div className="text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Previous Transactions
        </div>

        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          {/* Work in here */}
          <div className="flex grid-cols-2 h-[380px] w-[500px] bg-[#656262] text-white rounded-xl overflow-y-auto">
            <div>
              <div className="pl-16 pt-12"> Purchase History </div>
              <div className="pl-16 pt-12">
              { transactions.map((index: Transaction) => (
                <div className="border-b border-white py-3 text-center">
                  {index.subscriptionType}
                </div>
              ))}
              </div>
            </div>

            <div>
              <div className="pl-28 pt-12"> Purchase Date </div>
              <div className="pl-28 pt-12 text-center">
              { transactions.map((index: Transaction) => (
                <div className="border-b border-white py-3">
                  {new Date(index.startDate).toLocaleDateString('en-US')}
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};