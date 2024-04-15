import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '/images/Back Button.svg';
import AddIcon from '/images/AddIcon.svg';
import backendBaseUrl from '../../../apiConfig';

export const PaymentMain = () => 
  {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handlePayNow = async () => {
    const storedToken = localStorage.getItem('sessionToken');
    if (!storedToken) {
      console.error('Session token not found');
      return;
    }

    try {
      const response = await fetch(`${backendBaseUrl}/api/payment`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle successful response here, if needed
      console.log('Payment successful');
    } catch (error) {
      console.error('Error making payment:', error);
    }
  };

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto relative">
        <div className="absolute top-10 left-10">
          <img
            src={BackButton}
            alt="Back"
            onClick={handleBack}
            className="cursor-pointer"
          />
        </div>


        <div className="text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Payment
        </div>


        <div className="rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col gap-5 px-8 md:py-5 pb-20 pt-5">
          {/* Work in here */}
          <div className="flex flex-row justify-center">
            <div className="items-center">
              
              <div className="font-bold flex items-center px-2 mb-2">
                Payment Method
                {/* <Link to="/AddCardPage"> */}
                  <div className="px-2">
                    <img
                      src={AddIcon}
                      alt="Back"
                      onClick={() => navigate('/AddCard')}
                      className="cursor-pointer h-6 w-6"
                      />
                  </div>
                {/* </Link> */}
              </div>

              {/* PAYMENT METHOD */}
              <div className="block h-[380px] w-[500px] bg-[#212020] text-white rounded-xl px-5 py-5 mr-8">
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

                <Link to="">
                  <div className="flex mb-4 h-30 w-70 hover:bg-[#434242] bg-[#656262] shadow-md shadow-[#313131] rounded-xl px-2 py-2">
                    <img
                      src="https://1000logos.net/wp-content/uploads/2017/03/MasterCard-Logo-1990.png"
                      width="100"
                      height="40"
                    ></img>

                    <div className="items-center">
                      <div className="ml-4 pl-5 text-left">Mastercard</div>
                      <div className="ml-4 pl-5 mt-auto text-left">
                        ####-####-####-####
                      </div>
                    </div>
                  </div>
                </Link>

                <Link to="">
                  <div className="flex mb-4 h-30 w-70 hover:bg-[#434242] bg-[#656262] shadow-md shadow-[#313131] rounded-xl px-2 py-2">
                    <img
                      src="https://1000logos.net/wp-content/uploads/2016/10/American-Express-Color.png"
                      width="100"
                      height="40"
                    ></img>

                    <div className="items-center">
                      <div className="ml-4 pl-5 text-left">
                        American Express
                      </div>
                      <div className="ml-4 pl-5 mt-auto text-left">
                        ####-####-####-####
                      </div>
                    </div>
                  </div>
                </Link>

                <Link to="">
                  <div className="flex mb-4 h-30 w-70 hover:bg-[#434242] bg-[#656262] shadow-md shadow-[#313131] rounded-xl px-2 py-2">
                    <img
                      src="https://www.discoversignage.com/uploads/DGN_AcceptanceMark_2C_Hrz_CMYK2.jpg"
                      width="100"
                      height="40"
                    ></img>

                    <div className="items-center">
                      <div className="ml-4 pl-5 text-left">Discovery</div>
                      <div className="ml-4 pl-5 mt-auto text-left">
                        ####-####-####-####
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* PREV TRANSACTIONS */}
            <div className="items-center">
              <div className="font-bold px-2 mb-2">Previous Transactions</div>
              <div className="h-[380px] w-[500px] bg-[#212020] text-white rounded-xl px-5 py-2 overflow-y-auto">
                <div className="grid grid-cols-2 gap-y-1 gap-x-6">
                  <div className="border-b border-gray-400 py-3">
                    Transaction 4
                  </div>
                  <div className="border-b border-gray-400 py-3">
                    2024-03-18
                  </div>

                  <div className="border-b border-gray-400 py-3">
                    Transaction 3
                  </div>
                  <div className="border-b border-gray-400 py-3">
                    2024-02-11
                  </div>

                  <div className="border-b border-gray-400 py-3">
                    Transaction 2
                  </div>
                  <div className="border-b border-gray-400 py-3">
                    2024-02-09
                  </div>

                  <div className="border-b border-gray-400 py-3">
                    Transaction 1
                  </div>
                  <div className="border-b border-gray-400 py-3">
                    2024-01-11
                  </div>
                </div>

                {/* <Link to=""> */} 
                <div>
                  <button className="mt-24 ml-44 justify-center hover:bg-[#434242] bg-[#9E67E4] shadow-lg shadow-[#313131] px-6 py-3 mb-3 text-center rounded-full" 
                  onClick={() => navigate('/PrevTransactions')}>
                    View All
                  </button>
                  
                </div>
                {/* </Link> */} 

              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center">
            {/* CHANGE CARD DETAILS */}
            <div className="items-center mb-12">
              <div className="font-bold px-4 mb-2">Change Card Details</div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 h-[335px] w-[1030px] px-6 py-7 bg-[#212020] text-white rounded-xl mr-2">
                <div className="text-left">
                  <div className="px-1">First Name</div>
                  <input className=" hover:bg-[#434242] bg-[#656262] shadow-md shadow-[#313131] h-[35px] w-[400px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"></input>

                  <div className="px-1">Last Name</div>
                  <input className=" hover:bg-[#434242] bg-[#656262] shadow-md shadow-[#313131] h-[35px] w-[400px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"></input>

                  <div className="px-1">Postal/Zip Code</div>
                  <input className=" hover:bg-[#434242] bg-[#656262] shadow-md shadow-[#313131] h-[35px] w-[400px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"></input>

                  <div className="px-1">Address</div>
                  <input className=" hover:bg-[#434242] bg-[#656262] shadow-md shadow-[#313131] h-[35px] w-[400px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"></input>
                </div>

                <div className="text-left">
                  <div className="px-1">Expiration Date</div>
                  <input className=" hover:bg-[#434242] bg-[#656262] shadow-md shadow-[#313131] h-[35px] w-[400px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"></input>

                  <div className="px-1">CVV</div>
                  <input className=" hover:bg-[#434242] bg-[#656262] shadow-md shadow-[#313131] h-[35px] w-[400px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"></input>

                  <div className="px-1">Set Card as Default?</div>
                    <div>
                      <button className="hover:bg-[#434242] bg-[#656262] shadow-lg shadow-[#313131] h-[40px] w-[60px] px-2 py-2 text-center rounded-full mr-4">
                        Yes
                      </button>
                      <button className="hover:bg-[#434242] bg-[#656262] shadow-lg shadow-[#313131] h-[40px] w-[60px] px-2 py-2 text-center rounded-full">
                        No
                      </button>  
                    </div>
                  <button className="mt-8 hover:bg-[#434242] bg-[#9E67E4] shadow-lg shadow-[#313131] px-5 py-2 mb-3 text-center rounded-full">
                    Confirm Changes
                  </button>               
                </div>
  
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
