import React from 'react';
import BackButton from '/images/Back Button.svg';
import { Link, useNavigate } from 'react-router-dom';

export const SubscriptionMain = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5 "
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-y-auto md:overflow-y-hidden relative">
        <div className="absolute top-10 left-10">
          <img
            src={BackButton}
            alt="Back"
            onClick={handleBack}
            className="cursor-pointer"
          />
        </div>
        <div className="text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Subscription
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5 overflow-auto">
          {/* Work in here */}
          {/* Subscription Main here: */}
          <div className="w-full flex flex-col md:flex-row items-center justify-center md:gap-40">
            <div className="text-2xl flex flex-col gap-4 items-center sm:w-96 md:w-96">
              <Link to="">Subscription Plans</Link>
              <div className="text-white w-full h-30 py-9 rounded-lg text-4xl pl-7 font-bold mb-4 bg-[#656262] shadow-md shadow-[#313131] cursor-pointer">
                Free
                <div className="text-lg font-normal">$0.00/per month</div>
              </div>
              <div className="text-[#A263F2] w-full h-30 py-9 rounded-lg text-4xl pl-7 font-bold mb-4 bg-[#656262] shadow-md shadow-[#313131] cursor-pointer">
                <Link to="">
                  Premium
                  <div className="text-white text-lg font-normal">
                    $10.99/per month
                  </div>
                </Link>
              </div>
              <div className="text-[#FFFF00] w-full h-30 py-9 rounded-lg text-4xl pl-7 font-bold bg-[#656262] shadow-md shadow-[#313131] cursor-pointer">
                <Link to="">
                  Student
                  <div className="text-white text-lg font-normal">
                    $5.99/per month
                  </div>
                </Link>
              </div>
            </div>
            <div className="text-2xl flex flex-col gap-4 items-center sm:mt-10 md:w-96">
              Current Plan
              <div className="bg-[#656262] w-full h-96 px-9 py-9 rounded-lg pl-7 font-normal">
                <div className="mb-24">
                  <h1 className="text-center text-[#FFFF00] text-5xl font-extrabold mb-5">
                    Student
                  </h1>
                  <h1 className="text-center">Start Date:</h1>
                  <h1 className="text-center">End Date:</h1>
                  <h1 className="text-center">Renewal Date:</h1>
                </div>
                <div className="text-center">
                  <button className="hover:bg-[#3f3f3f] bg-[#2d2c2c] text-white font-bold py-2 px-4 rounded ">
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
          


          {/* Shruthi's Changes Here - note: put all this on the pop-up card */}
          <div className="flex">
            <div className="flex bg-[#858181] h-[900px] w-[900px] rounded-lg">
              <div className="bg-gray-50 h-[200px] w-[400px] m-10">
              <div className="flex p-10 bg-[#656262] grid-cols-2 gap-y-4 gap-x-8 text-white rounded-xl">

                  <div className="text-left">
                      <div className="px-1">Card Type</div>
                      <input className=" hover:bg-[#434242] bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[250px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out" 
                          title="Please enter a card type.">
                      </input>

                      <div className="px-1">Card Number</div>
                      <input className=" hover:bg-[#434242] bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[250px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out" 
                          title="Please enter a card number."> 
                      </input>

                      <div className="px-1">Expiration Date</div>
                      <input className=" hover:bg-[#434242] bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[250px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out" 
                          title="Please enter a expiration date.">
                          </input>

                      <div className="px-1">CVV</div>
                      <input className=" hover:bg-[#434242] bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[250px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"
                          title="Please enter a CVV.">
                          </input>
                  </div>

                  <div className="pl-64">
                    <Link to="">
                      <div className="flex mb-4 h-30 w-70 hover:bg-[#434242] bg-[#656262] shadow-md shadow-[#313131] rounded-xl px-2 py-2 ">
                      <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                      width="100"
                      height="40"
                      ></img>

                      <div className="items-center">
                      <div className="ml-4 pl-5 text-left">Visa</div>
                      <div className="ml-4 pl-5 mt-auto text-left">
                        ####-####-####-####
                      </div>
                      </div>
                      </div>
                    </Link>
                  </div>
              </div>
              </div>
            
        </div> 
        </div>
      </div>
      </div>
    </div>
  );
};
