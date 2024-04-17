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
  transactionAmount: number;
  email: string;
  cardType: string;
  cardNumber: string;
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
          <div className="flex flex-row p-12 space-x-24 bg-[#656262] text-white rounded-xl overflow-y-auto text-center">
            <div className="flex flex-col">
              <span className="text-2xl"> Subscription Type</span>
              <div className="pt-12">
                {transactions.map((index: Transaction) => (
                  <div className="border-b border-white py-3">
                    {index.subscriptionType}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl"> Purchase Date </span>
              <div className="pt-12">
                {transactions.map((index: Transaction) => (
                  <div className="border-b border-white py-3">
                    {new Date(index.startDate).toLocaleDateString('en-US')}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl">Purchase Price</span>
              <div className="pt-12">
                {transactions.map((index: Transaction) => (
                  <div className="border-b border-white py-3">
                    {index.transactionAmount}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl">Email Linked</span>
              <div className="pt-12">
                {transactions.map((index: Transaction) => (
                  <div className="border-b border-white py-3">
                    {index.email}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl">Card Type</span>
              <div className="pt-12">
                {transactions.map((index: Transaction) => (
                  <div className="border-b border-white py-3">
                    {index.cardType}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl">Card Number</span>
              <div className="pt-12">
                {transactions.map((index: Transaction) => (
                  <div className="border-b border-white py-3 justify-center flex flex-row">
                    <p className="mr-2">****</p> {index.cardNumber.slice(-4)}
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
