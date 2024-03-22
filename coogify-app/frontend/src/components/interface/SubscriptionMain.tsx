import React from 'react';
import { Link } from 'react-router-dom';

export const SubscriptionMain = () => {
  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto">
        <div className="text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Subscription
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-row items-center gap-5 px-5 md:py-5 pb-20 pt-5 relative ">
          <div className="absolute top-0 left-52 text-2xl flex flex-col gap-4 items-center ">
            <Link to="">
              Subscription Plans
              <div className="w-96 h-30 py-9 rounded-lg text-4xl pl-7 font-bold mb-4  bg-[#656262] shadow-md shadow-[#313131] cursor-pointer">
                Free
                <div className="text-lg font-normal">$0.00/per month</div>
              </div>
            </Link>
            <div className="text-[#A263F2] w-96 h-30 py-9 rounded-lg text-4xl pl-7 font-bold mb-4  bg-[#656262] shadow-md shadow-[#313131] cursor-pointer">
              <Link to="">
                Premium
                <div className=" text-white text-lg font-normal">
                  $10.99/per month
                </div>
              </Link>
            </div>
            <div className="text-[#FFFF00] w-96 h-30 py-9 rounded-lg text-4xl pl-7 font-bold  bg-[#656262] shadow-md shadow-[#313131] cursor-pointer">
              <Link to="">
                Student
                <div className=" text-white text-lg font-normal">
                  $5.99/per month
                </div>
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-52 text-2xl flex flex-col gap-4 items-center">
            Current Plan
            <div className="bg-[#656262] w-96 h-96 px-9 py-9 rounded-lg pl-7 font-normal   ">
              <div className="mb-24">
                <h1 className="text-center text-[#FFFF00] text-5xl font-extrabold mb-5">
                  Student
                </h1>
                <h1 className="text-center">Start Date:</h1>
                <h1 className="text-center">End Date:</h1>
                <h1 className="text-center">Renewal Date:</h1>
              </div>
              <div className="text-center">
                <button className="hover:bg-[#3f3f3f] bg-[#2d2c2c] text-white font-bold py-2 px-4  rounded ">
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
