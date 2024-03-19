import React from 'react';
import { Link } from 'react-router-dom';

export const PaymentMain = () => {
  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto">
        <div className="text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Payment

      </div>

        <div className="rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col gap-5 px-8 md:py-5 pb-20 pt-5">
                
          {/* Work in here */}
              <div className="flex flex-row">

                <div className="items-center">
                <div className="font-bold px-2">Payment Method</div>
                    {/* PAYMENT METHOD */}
                    <div className="block h-[380px] w-[500px] bg-[#656262] text-white rounded-xl px-5 py-5 mr-8">
                        <Link to="">
                          <div className="flex mb-4 h-30 w-70 hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-md shadow-[#d0c2e2] rounded-xl px-2 py-2 ">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                              width="100"
                              height="40"
                            ></img>

                            <div className="items-center">
                              <div className="ml-4 pl-5 text-left">Visa</div>
                              <div className="ml-4 pl-5 mt-auto text-left">####-####-####-####</div>
                            </div>
                          </div>
                        </Link>

                        <Link to="">
                          <div className="flex mb-4 h-30 w-70 hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-md shadow-[#d0c2e2] rounded-xl px-2 py-2">
                            <img
                              src="https://1000logos.net/wp-content/uploads/2017/03/MasterCard-Logo-1990.png"
                              width="100"
                              height="40"
                            ></img>

                            <div className="items-center">
                              <div className="ml-4 pl-5 text-left">Mastercard</div>
                              <div className="ml-4 pl-5 mt-auto text-left">####-####-####-####</div>
                            </div>
                          </div>
                        </Link>

                        <Link to="">
                          <div className="flex mb-4 h-30 w-70 hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-md shadow-[#d0c2e2] rounded-xl px-2 py-2">
                            <img
                              src="https://1000logos.net/wp-content/uploads/2016/10/American-Express-Color.png"
                              width="100"
                              height="40"
                            ></img>

                            <div className="items-center">
                              <div className="ml-4 pl-5 text-left">American Express</div>
                              <div className="ml-4 pl-5 mt-auto text-left">####-####-####-####</div>
                            </div>
                          </div>
                        </Link>

                        <Link to="">
                          <div className="flex mb-4 h-30 w-70 hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-md shadow-[#d0c2e2] rounded-xl px-2 py-2">
                          <img
                            src="https://www.discoversignage.com/uploads/DGN_AcceptanceMark_2C_Hrz_CMYK2.jpg"
                            width="100"
                            height="40"
                          ></img>

                          <div className="items-center">
                            <div className="ml-4 pl-5 text-left">Discovery</div>
                            <div className="ml-4 pl-5 mt-auto text-left">####-####-####-####</div>
                          </div>
                        </div>
                      </Link>
                  </div>
                </div>


                {/* PREV TRANSACTIONS */}
                <div className="items-center">
                  <div className="font-bold px-2">Previous Transactions</div>
                    <div className="h-[380px] w-[500px] bg-[#656262] text-white rounded-xl px-5 py-2 overflow-y-auto">
                      <div className="grid grid-cols-2 gap-y-1 gap-x-6">
                        <div className="border-b border-gray-400 py-3">Transaction 4</div>
                        <div className="border-b border-gray-400 py-3">2024-03-18</div>

                        <div className="border-b border-gray-400 py-3">Transaction 3</div>
                        <div className="border-b border-gray-400 py-3">2024-02-11</div>

                        <div className="border-b border-gray-400 py-3">Transaction 2</div>
                        <div className="border-b border-gray-400 py-3">2024-02-09</div>

                        <div className="border-b border-gray-400 py-3">Transaction 1</div>
                        <div className="border-b border-gray-400 py-3">2024-01-11</div>
                    </div>
                  </div>
                </div>
            </div>

            <div className="flex flex-row">
                {/* CHANGE CARD DETAILS */}
                <div className="items-center mb-12">
                  <div className="font-bold px-2">Change Card Details</div>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-4 h-[335px] w-[700px] px-5 py-7 bg-[#656262] text-white rounded-xl mr-8">

                      <div className="text-left">
                        <div className="px-1">First Name</div>
                        <textarea className="caret-white border border-white focus:outline-none focus:border-white hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-lg shadow-[#d0c2e2] h-[35px] w-[260px] px-2 py-2 rounded-full transition duration-200 ease-in-out"></textarea>

                        <div className="px-1">Last Name</div>
                        <textarea className="caret-white border border-white focus:outline-none focus:border-white hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-lg shadow-[#d0c2e2] h-[35px] w-[260px] px-2 py-2 rounded-full transition duration-200 ease-in-out"></textarea>

                        <div className="px-1">Postal/Zip Code</div>
                        <textarea className="caret-white border border-white focus:outline-none focus:border-white hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-lg shadow-[#d0c2e2] h-[35px] w-[260px] px-2 py-2 rounded-full transition duration-200 ease-in-out"></textarea>

                        <div className="px-1">Address</div>
                        <textarea className="caret-white border border-white focus:outline-none focus:border-white hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-lg shadow-[#d0c2e2] h-[35px] w-[260px] px-2 py-2 rounded-full transition duration-200 ease-in-out"></textarea>
                      </div>

                      <div className="text-left">
                        <div className="px-1">Expiration Date</div>
                        <textarea className="caret-white border border-white focus:outline-none focus:border-white hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-lg shadow-[#d0c2e2] h-[35px] w-[260px] px-2 py-2 rounded-full transition duration-200 ease-in-out"></textarea>

                        <div className="px-1">CVV</div>
                        <textarea className="caret-white border border-white focus:outline-none focus:border-white hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-lg shadow-[#d0c2e2] h-[35px] w-[260px] px-2 py-2 rounded-full transition duration-200 ease-in-out"></textarea>

                        <div className="px-1">Set Card as Default?</div>
                        <button className="transition duration-200 ease-in-out border-white focus:outline-none focus:border-white hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-lg shadow-[#d0c2e2] h-[40px] w-[60px] px-2 py-2 text-center rounded-full mr-4">Yes</button>
                        <button className="transition duration-200 ease-in-out border-white focus:outline-none focus:border-white hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-lg shadow-[#d0c2e2] h-[40px] w-[60px] px-2 py-2 text-center rounded-full">No</button>
                      </div>
                  </div>
                </div>


                <div className="items-center">
                  <div className="font-bold px-2">Add Payment</div>
                  {/* ADD PAYMENT */}
                  <div className="block h-[335px] w-[300px] px-5 py-7 bg-[#656262] text-white rounded-xl">
                    <div className="text-left px-1">Card Type</div>
                    <textarea className="caret-white border border-white focus:outline-none focus:border-white hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-lg shadow-[#d0c2e2] h-[35px] w-[260px] mb-2 px-2 py-2 rounded-full transition duration-200 ease-in-out"></textarea>
                  
                    <div className="text-left px-1">Card Number</div>
                    <textarea className="caret-white border border-white focus:outline-none focus:border-white hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-lg shadow-[#d0c2e2] h-[35px] w-[260px] mb-2 px-2 py-2 rounded-full transition duration-200 ease-in-out"></textarea>

                    <div className="text-left px-1">Expiration Date</div>
                    <textarea className="caret-white border border-white focus:outline-none focus:border-white hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-lg shadow-[#d0c2e2] h-[35px] w-[260px] mb-2 px-2 py-2 rounded-full transition duration-200 ease-in-out"></textarea>

                    <div className="text-left px-1">CVV</div>
                    <textarea className="caret-white border border-white focus:outline-none focus:border-white hover:bg-[#ddc5fc] bg-[#d1c9db] shadow-lg shadow-[#d0c2e2] h-[35px] w-[260px] mb-2 px-2 py-2 rounded-full transition duration-200 ease-in-out"></textarea>
                  </div>
                </div>
            </div>


        </div>
        </div>
      </div>
  );
};
