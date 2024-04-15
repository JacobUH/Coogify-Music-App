import React from 'react';
import ProfileIcon from '/images/Profile Icon.svg';
import BackButton from '/images/Back Button.svg';
import axios from 'axios';
import { useState } from 'react';
import backendBaseUrl from '../../../apiConfig';
import { useNavigate, Link } from 'react-router-dom';

export const AddCardMain = () => {
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('')
  const [expDate, setExpDate] = useState('')
  const [cvv, setCVV] = useState('')

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

const storedToken = localStorage.getItem('sessionToken') // using a session token

//API post
const handleSubmit = async () => {
    try {
        const response = await axios.post(`${backendBaseUrl}/api/card/addCard`,
        {
            cardType: cardType,
            cardNumber: cardNumber,
            cardExpiration: expDate,
            cardSecurity: cvv,
        },
        {
            headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
            }
        }
        );
        navigate('/payment');
    } catch (error) {
        console.error('error inputting card information: ', error);
    }
};


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
            Add Card
            </div>
            <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
            {/* Work in here */}
                    <div className="flex p-10 bg-[#656262] grid-cols-2 gap-y-4 gap-x-8 text-white rounded-xl">

                        <div className="text-left">
                        <div className="px-1">Card Type</div>
                          <select 
                              className="hover:bg-[#434242] bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[250px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out" 
                              id="cardType"
                              name="cardType" 
                              value={cardType}
                              onChange={(e) => setCardType(e.target.value)} // on change call function to be created for validating input
                              required
                              title="Please select a card type."
                          >
                              <option value="" disabled selected hidden>Select Card Type</option>
                              <option value="Visa">Visa</option>
                              <option value="Mastercard">Mastercard</option>
                              <option value="Discovery">Discovery</option>
                              <option value="American Express">American Express</option>
                          </select>


                          <div className="px-1">Card Number</div>
                          <input 
                              className="hover:bg-[#434242] bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[250px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out" 
                              id="cardNumber"
                              name="cardNumber"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              pattern="\d{16}"
                              placeholder="---- ---- ---- ----"
                              required
                              title="Please enter a 16-digit card number."
                          > 
                          </input>
                          {/*{document.getElementById("cardNumber").validity.patternMismatch && (
                              <p style={{ color: "red" }}>Please enter a valid 12-digit card number.</p>
                          )} */}
 

                          <div className="px-1">Expiration Date</div>
                          <input 
                              className="hover:bg-[#434242] bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[250px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out" 
                              id="expDate"
                              name="expDate"
                              value={expDate}
                              onChange={(e) => setExpDate(e.target.value)}
                              pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                              placeholder="MM/YY"
                              required
                              title="Please enter an expiration date in MM/YY format."
                          > 
                          </input>


                          <div className="px-1">CVV</div>
                          <input 
                              className="hover:bg-[#434242] bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[250px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"
                              id="CVV"
                              name="CVV"
                              value={cvv}
                              onChange={(e) => setCVV(e.target.value)}
                              maxLength={4}
                              placeholder="----"
                              required
                              title="Please enter a CVV."
                          > 
                          </input>


                        </div>
                    </div>

                   <button className="text-white bg-[#9E67E4] px-10 py-2 rounded-md" onClick={handleSubmit}> 
                   Submit
                   </button> 
               
            </div>

        </div>
    </div>
 

  );
};
