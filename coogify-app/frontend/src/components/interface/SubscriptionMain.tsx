import React from 'react';

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
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-row items-center gap-5 px-5 md:py-5 pb-20 pt-5 relative">
          <div className="absolute top-0 left-52 text-2xl flex flex-col gap-4 items-center">
            Subscription Plans
            <div className="bg-[#8C8C8C] w-96 h-30 py-9 rounded-lg text-4xl pl-7 font-bold">
              Free
              <div className="text-lg font-normal">$0.00/per month</div>
            </div>
            <div className="text-[#A263F2] bg-[#8C8C8C] w-96 h-30 py-9 rounded-lg text-4xl pl-7 font-bold">
              Premium
              <div className=" text-white text-lg font-normal">
                $10.99/per month
              </div>
            </div>
            <div className="text-[#DCCE51] bg-[#8C8C8C] w-96 h-30 py-9 rounded-lg text-4xl pl-7 font-bold">
              Student
              <div className=" text-white text-lg font-normal">
                $5.99/per month
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-52 text-2xl flex flex-col gap-4 items-center">
            Current Plan
            <div className="bg-[#8C8C8C] w-96 h-96 px-9 py-9 rounded-lg pl-7 font-normal">
              <div className="text-center">Start Date:</div>
              <div className="text-center">End Date:</div>
              <div className="text-center">Renewal Date:</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
