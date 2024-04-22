import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '/images/Back Button.svg';
import AddIcon from '/images/AddIcon.svg';
import backendBaseUrl from '../../../apiConfig';
import axios from 'axios';

interface Card {
  cardID?: number;
  cardType?: string;
  cardNumber?: string;
  cardExpiration?: string;
  cardSecurity?: string;
}
interface Transaction {
  subscriptionType: string;
  startDate: string;
  transactionAmount: string;
}

export const PaymentMain = () => {
  // GENERAL
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('sessionToken');

  // CARD INFO
  const [CardID, setCardID] = useState<number>();
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [selectCard, setSelectCard] = useState<Card | null>(null);
  const [cardDetails, setCardDetails] = useState<Card[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleCardClick = (
    card: Card,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setSelectCard(card);
    setCardID(card.cardID);
    setCardType(card.cardType || '');
    setCardNumber(card.cardNumber || '');
    const expDateFormatted = card.cardExpiration
      ? new Date(card.cardExpiration).toISOString().slice(0, 10)
      : '';
    setExpDate(expDateFormatted);
    setShowCardChanges(true);
  };

  // GET THE CARD DETAILS ON MOUNT (REFRESH)
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/card/fetchCardDetails`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const cards = response.data;

        setCardDetails(cards);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
    fetchCards();
  }, []);

  // GET PREVIOUS TRANSACTIONS
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
        console.error('Error fetching previous transaction history: ', error);
      }
    };
    handleRetrieve();
  }, []);

  const [showCardChanges, setShowCardChanges] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${backendBaseUrl}/api/card/updateCard`,
        {
          cardID: CardID,
          cardType: cardType,
          cardNumber: cardNumber,
          cardExpiration: expDate,
          cardSecurity: cvv,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data === true) {
        refreshPage();
      } else {
        console.log('invalid ID supported or error updating');
      }
    } catch (error) {
      console.error('Error fetching previous transaction history: ', error);
    }
  };

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto">
        <div className="text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Payment
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          <div className="flex flex-row justify-center gap-16">
            <div className="flex flex-col p-6 items-center rounded-md bg-[#212020]">
              <div className="flex items-center gap-3 justify-between pb-6">
                <div>Add Card</div>
                <img
                  src={AddIcon}
                  alt="Add"
                  className="cursor-pointer h-6 w-6"
                  onClick={() => navigate('/AddCard')}
                />
              </div>

              {cardDetails.map((card: Card, index: number) => (
                <button key={index} onClick={(e) => handleCardClick(card, e)}>
                  <div className="flex flex-row justify-center items-center w-[400px] rounded-md py-2 px-6 hover:bg-[#5b5656]">
                    {card.cardType === 'Visa' && (
                      <img
                        className="ml-2"
                        src="https://static-00.iconduck.com/assets.00/visa-icon-2048x1313-o6hi8q5l.png"
                        width="90"
                        height="40"
                        alt="Visa Card"
                      />
                    )}
                    {card.cardType === 'Discover' && (
                      <img
                        className="ml-2"
                        src="https://www.shutterstock.com/image-vector/west-java-indonesia-oktober-13-600nw-2374385743.jpg"
                        width="90"
                        height="40"
                        alt="Discover Card"
                      />
                    )}
                    {card.cardType === 'Mastercard' && (
                      <img
                        className="ml-2"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
                        width="90"
                        height="40"
                        alt="Mastercard"
                      />
                    )}
                    {card.cardType === 'American Express' && (
                      <img
                        className="ml-2"
                        src="https://www.svgrepo.com/show/266068/american-express.svg"
                        width="90"
                        height="40"
                        alt="American Express"
                      />
                    )}
                    <div className="ml-8 text-left">
                      <div className=""> {card.cardType} </div>
                      <div className=""> {card.cardNumber} </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-col p-6 items-center rounded-md bg-[#212020]">
              <div className="flex items-start gap-2 text-medium justify-between pb-6">
                <div>Previous Transactions</div>
              </div>

              <div className="flex flex-row gap-6 items-start">
                <div className="flex flex-col p-6 items-center">
                  <span className="">Transaction</span>
                  {transactions.slice(-4).map((transaction, index: number) => (
                    <div key={index}>{transaction.subscriptionType}</div>
                  ))}
                </div>

                <div className="flex flex-col p-6 items-center">
                  <span className="">Amount</span>
                  {transactions.slice(-4).map((transaction, index: number) => (
                    <div key={index}>{transaction.transactionAmount}</div>
                  ))}
                </div>

                <div className="flex flex-col p-6 items-center">
                  <span className="">Date</span>
                  {transactions.slice(-4).map((transaction, index: number) => (
                    <div key={index}>
                      {new Date(transaction.startDate).toLocaleDateString(
                        'en-US'
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="mt-24 justify-center hover:bg-[#434242] bg-[#9E67E4] shadow-lg shadow-[#313131] px-6 py-3 mb-3 text-center rounded-full"
                onClick={() => navigate('/PrevTransactions')}
              >
                View All
              </button>
            </div>
          </div>

          {showCardChanges}

          {/* CHANGE DETAILS CARD */}
          <div className="flex flex-row justify-center mt-5">
            <div className="flex flex-col gap-8 items-center mb-12 w-[800px]">
              <div className="bg-[#212020] text-white rounded-xl mr-2">
                <div className="font-bold px-4 mb-2 pt-8 pr-8">
                  Change Card Details
                </div>
                <div className="flex flex-row gap-12">
                  {/* First Column */}
                  <div className="text-left w-1/2 pr-4 p-8">
                    <div className="px-1">Card Type</div>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="cardType"
                      name="cardType"
                      value={cardType}
                      onChange={(e) => setCardType(e.target.value)} // on change call function to be created for validating input
                      required
                      title="Please select a card type."
                    >
                      <option value="" disabled selected hidden>
                        Select Card Type
                      </option>
                      <option value="Visa">Visa</option>
                      <option value="Mastercard">Mastercard</option>
                      <option value="Discover">Discover</option>
                      <option value="American Express">American Express</option>
                    </select>

                    <div className="px-1">Card Number</div>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Enter card number"
                      maxLength={16} // Maximum length set to 16 characters
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  {/* Second Column */}
                  <div className="text-left w-1/2 pl-4 p-8">
                    <div className="px-1">Expiration Date</div>
                    <input
                      type="date"
                      value={expDate}
                      onChange={(e) => setExpDate(e.target.value)}
                      placeholder="MM/YY"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <div className="px-1">CVV</div>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="CVV"
                      name="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      maxLength={4}
                      placeholder="----"
                      required
                      title="Please enter a CVV."
                    ></input>

                    <button
                      className="mt-8 ml-32 hover:bg-[#434242] bg-[#9E67E4] shadow-lg shadow-[#313131] px-5 py-2 mb-3 text-center rounded-full"
                      onClick={handleSubmit}
                    >
                      Confirm Changes
                    </button>
                    <div className="pl-[70px]">
                      {successMessage && (
                        <div className="text-[#d7c4ef]">{successMessage}</div>
                      )}
                    </div>
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
