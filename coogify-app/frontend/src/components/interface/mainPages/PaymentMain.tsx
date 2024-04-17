import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '/images/Back Button.svg';
import AddIcon from '/images/AddIcon.svg';
import backendBaseUrl from '../../../apiConfig';
import axios from 'axios';

interface Card {
  cardType?: string;
  cardNumber?: string;
  cardExpiration?: string;
  cardSecurity?: string;
  firstName?: string;
  lastName?: string;
}

export const PaymentMain = () => {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('sessionToken');

  const handleBack = () => {
    navigate(-1);
  };

  const [cardDetails, setCardDetails] = useState<Card[]>([]); // cardDetails store an array of cards
  const [selectCard, setSelectCard] = useState<Card | null>(null); // either user chooses card, or not

  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');

  const handleCardClick = (
    card: Card,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event?.stopPropagation(); // Prevent event propagation if event exists
    setSelectCard(card); // Update the selected card
    setCardType(card.cardType || '');
    setCardNumber(card.cardNumber || '');
    setExpDate(card.cardExpiration || '');
    console.log(card);
  };

  // API - GET
useEffect(() => {
  const fetchCards = async () => {
    try {
      const response = await axios.get(
        `${backendBaseUrl}/api/card/fetchCardDetails`, // endpoint
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const cards = response.data.map((card: Card) => {
        // Split the date and take only the MM/YY part
        const expDateParts = (card.cardExpiration || '').split('T')[0].split('-');
        const expMonth = expDateParts[1];
        const expYear = expDateParts[0].substring(2); // Take the last two digits of the year
        const expDateFormatted = `${expMonth}/${expYear}`;
        return {
          ...card,
          cardExpiration: expDateFormatted,
        };
      });
      setCardDetails(cards);
      console.log(cards);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };
  fetchCards();
}, []);



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
          <div className="flex flex-row justify-center gap-5">
            {/* Payment Method */}
            <div className="flex flex-col items-start">
              <div className="font-bold flex items-left px-2 mb-2">
                Payment Method
                <div className="px-2">
                  <img
                    src={AddIcon}
                    alt="Back"
                    onClick={() => navigate('/AddCard')}
                    className="cursor-pointer h-6 w-6"
                  />
                </div>
              </div>
              {/* PAYMENT METHOD */}
              <div className="flex flex-col h-fit w-[300px] p-2 rounded-md bg-[#212020]">
                {cardDetails.map((card: Card) => (
                  <button onClick={(e) => handleCardClick(card, e)} key={card.cardNumber}>
                    <div className="flex flex-row items-center rounded-md py-1 pl-1 hover:bg-[#5b5656]">
                      {card.cardType && card.cardType === "Visa" && (
                        <img className="ml-2"
                          src="https://static-00.iconduck.com/assets.00/visa-icon-2048x1313-o6hi8q5l.png"
                          width="90"
                          height="40"
                        />
                      )}
                      {card.cardType && card.cardType === "Discover" && (
                        <img className="ml-2"
                          src="https://www.shutterstock.com/image-vector/west-java-indonesia-oktober-13-600nw-2374385743.jpg"
                          width="90"
                          height="40"
                        />
                      )}
                      {card.cardType && card.cardType === "Mastercard" && (
                        <img className="ml-2"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
                          width="90"
                          height="40"
                        />
                      )}
                      {card.cardType && card.cardType === "American Express" && (
                        <img className="ml-2"
                          src="https://www.svgrepo.com/show/266068/american-express.svg"
                          width="90"
                          height="40"
                        />
                      )}
                      {/* if cardType === Visa, cardType === MasterCard, cardType === American Express, cardType === Discover */}
                      <div className="ml-8 text-left">
                        <div className=""> {card.cardType} </div>
                        <div className=""> {card.cardNumber} </div>{' '}
                        {/* Card.cardNumber */}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Previous Transactions */}
            <div className="flex flex-col items-start">
              <div className="font-bold px-2 mb-2">Previous Transactions</div>
              <div className="h-[380px] w-[500px] bg-[#212020] text-white rounded-xl px-5 py-2 overflow-y-auto">
                {/* MAPPING */}
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

                <div>
                  <button className="mt-24 ml-44 justify-center hover:bg-[#434242] bg-[#9E67E4] shadow-lg shadow-[#313131] px-6 py-3 mb-3 text-center rounded-full" onClick={() => navigate('/PrevTransactions')}>
                    View All
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Change Card Details */}
          <div className="flex flex-row justify-center">
            <div className="items-center mb-12">
              <div className="font-bold px-4 mb-2">Change Card Details</div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 h-[335px] w-[1030px] px-6 py-7 bg-[#212020] text-white rounded-xl mr-2">
                <div className="text-left">
                  <div className="px-1">Card Type</div>
                  <select
                    className="hover:bg-[#434242] bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[300px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"
                    id="cardType"
                    name="cardType"
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)} // on change call function to be created for validating input
                    title="Please select a card type."
                  >
                    <option value="" disabled selected hidden>Select Card Type</option>
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="Discover">Discover</option>
                    <option value="American Express">American Express</option>
                  </select>

                  <div className="px-1">Card Number</div>
                  <input
                    className="hover:bg-[#434242] bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[300px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"
                    id="cardNumber"
                    name="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    pattern="\d{16}"
                    placeholder="---- ---- ---- ----"
                    required
                    title="Please enter a 16-digit card number."
                  ></input>
                </div>

                <div className="text-left">
                  <div className="px-1">Expiration Date</div>
                  <input
                    className="hover:bg-[#434242] bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[300px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"
                    id="expDate"
                    name="expDate"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                    placeholder="MM/YY"
                    required
                    title="Please enter an expiration date in MM/YY format."
                  ></input>

                  <div className="px-1">CVV</div>
                  <input
                    className="hover:bg-[#434242] bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[300px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"
                    id="CVV"
                    name="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength={4}
                    placeholder="----"
                    title="Please enter a CVV."
                  ></input>

                  <div className="flex flex-row"></div>
                  <button className="mt-8 ml-32 hover:bg-[#434242] bg-[#9E67E4] shadow-lg shadow-[#313131] px-5 py-2 mb-3 text-center rounded-full">
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
