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

        <div className="rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col gap-5 px-5 md:py-5 pb-20 pt-5">
          {/* Work in here */}
          {/* How to fix the structure of Payments Method???? */}

          <div className="font-bold px-2">Payments Methods</div>

          <div className="block h-[335px] w-[350px] bg-[#656262] text-white rounded-xl px-5 py-5">
            <Link to="">
              <div className="flex mb-4 h-30 w-70 hover:bg-[#e7d5ff] bg-[#d1c9db] shadow-md shadow-[#d0c2e2] rounded-xl px-2 py-2 ">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                  width="80"
                  height="80"
                ></img>
                <div className="ml-4 pl-5 text-center">Visa</div>
                <div className="ml-4 pl-5 mt-auto text-center">####-####</div>
              </div>
            </Link>

            <Link to="">
              <div className="flex mb-4 h-30 w-70 hover:bg-[#e7d5ff] bg-[#d1c9db] shadow-md shadow-[#d0c2e2] rounded-xl px-2 py-2">
                <img
                  src="https://1000logos.net/wp-content/uploads/2017/03/MasterCard-Logo-1990.png"
                  width="80"
                  height="80"
                ></img>
                <div className="ml-4 pl-5 text-center">MasterCard</div>
                <div className="ml-4 pl-5 mt-auto text-center">####-####</div>
              </div>
            </Link>

            <Link to="">
              <div className="flex mb-4 h-30 w-70 hover:bg-[#e7d5ff] bg-[#d1c9db] shadow-md shadow-[#d0c2e2] rounded-xl px-2 py-2">
                <img
                  src="https://1000logos.net/wp-content/uploads/2016/10/American-Express-Color.png"
                  width="80"
                  height="80"
                ></img>
                <div className="ml-4 pl-5 text-center">American Express</div>
                <div className="ml-4 pl-5 mt-auto text-center">####-####</div>
              </div>
            </Link>

            <Link to="">
              <div className="flex mb-4 h-30 w-70 hover:bg-[#e7d5ff] bg-[#d1c9db] shadow-md shadow-[#d0c2e2] rounded-xl px-2 py-2">
                <img
                  src="https://www.discoversignage.com/uploads/DGN_AcceptanceMark_2C_Hrz_CMYK2.jpg"
                  width="80"
                  height="80"
                ></img>
                <div className="ml-4 pl-5 text-center">Discovery</div>
                <div className="ml-4 pl-5 mt-auto text-center">####-####</div>
              </div>
            </Link>
          </div>

          <div className="font-bold px-2">Previous Transactions</div>
          <div className="fblock h-[335px] w-[280px] bg-[#656262] text-white rounded-xl px-5 py-5 text-center">
            <div>Transaction 1</div>
          </div>
        </div>

        <div className="font-bold px-2">Add Payment Method</div>
        <div className="fblock h-[335px] w-[280px] bg-[#656262] text-white rounded-xl px-5 py-5 text-center">
          {/* How to create a typing feild? */}
          {/* How to create two columns for transactions and dates? */}
        </div>
      </div>
    </div>
  );
};
