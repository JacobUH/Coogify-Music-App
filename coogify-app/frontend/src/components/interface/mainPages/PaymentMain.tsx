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
interface Transaction {
  subscriptionType: string;
  startDate: string;
  transactionAmount: string;
}

export const PaymentMain = () => {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('sessionToken');
  const handleBack = () => {
    navigate(-1);
  };
  const [cardDetails, setCardDetails] = useState<Card[]>([]);
  const [selectCard, setSelectCard] = useState<Card | null>(null);
  const [changesMade, setChangesMade] = useState(false);
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [successMessage, setSuccessMessage] = useState('');


  const handleCardClick = (
    card: Card,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event?.stopPropagation();
    setSelectCard(card);
    setCardType(card.cardType || '');
    setCardNumber(card.cardNumber || '');
    setExpDate(card.cardExpiration || '');
    console.log(card);
  };

  // function/API
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
        const cards = response.data.map((card: Card) => {
          const expDateParts = (card.cardExpiration || '').split('T')[0].split('-');
          const expMonth = expDateParts[1];
          const expYear = expDateParts[0].substring(2);
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


  // function/API
  const handleConfirmation = () => {
    const updatedCard: Card = {
      cardType,
      cardNumber,
      cardExpiration: expDate,
      cardSecurity: cvv,
    }; 
    if (!selectCard) return;

    const isCardNumberValid = cardNumber.length === 16;
    const isCvvValid = cvv.length === 4;
    const isExpDateValid = /^\d{2}\/\d{2}$/.test(expDate);
  
    if (isCardNumberValid && isCvvValid && isExpDateValid) 
    {
      setChangesMade(true);
      setSuccessMessage('Card details updated successfully.');
      const updatedCards = cardDetails.map((card) =>
        card === selectCard ? { ...updatedCard } : card
      );
      setCardDetails(updatedCards);
    } 
    else 
    {
      setSuccessMessage('Please check card details.');
    }

    const updatedCards = cardDetails.map((card) =>
      card === selectCard ? { ...updatedCard } : card
    );
    setCardDetails(updatedCards);
    setChangesMade(true); // ????
  };

  // function/API
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
                      <div className="ml-8 text-left">
                        <div className=""> {card.cardType} </div>
                        <div className=""> {card.cardNumber} </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            


            <div className="flex flex-col">
              <div className="font-bold px-2 mb-2">Previous Transactions</div>
              <div className="bg-[#212020] text-white rounded-xl overflow-y-auto">
                  
                    <div className="flex flex-row space-x-3 text-center items-center">
                      <div className="flex flex-col">
                        <span className="">Transaction</span>
                        {transactions.slice(-4).map((transaction) => (
                          <div>{transaction.subscriptionType}</div>
                        ))}
                      </div>

                      <div className="flex flex-col">
                        <span className="">Price</span>
                        {transactions.slice(-4).map((transaction) => (
                          <div>{transaction.transactionAmount}</div>
                        ))}
                      </div>

                      <div className="flex flex-col">
                        <span className="">Date</span>
                        {transactions.slice(-4).map((transaction) => (
                          <div>{new Date(transaction.startDate).toLocaleDateString("en-US")}</div>
                        ))}
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
                    onChange={(e) => setCardType(e.target.value)}
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
                  <button className="mt-8 ml-32 hover:bg-[#434242] bg-[#9E67E4] shadow-lg shadow-[#313131] px-5 py-2 mb-3 text-center rounded-full" 
                      onClick={handleConfirmation}>
                      Confirm Changes
                      {successMessage && <div className="text-[#d7c4ef]">{successMessage}</div>}
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