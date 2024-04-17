import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DefaultPlaylist from '../../../../public/images/DefaultPlaylist.svg';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';

interface HandleClosePopup {
  onClose: () => void; // Specify the type of onClose prop
}

interface Card {
  userID: number;
  cardID: number;
  cardType?: string;
  cardNumber?: string;
  cardExpiration?: string;
  cardSecurity?: string;
  firstName?: string;
  lastName?: string;
}

export const SubscriptionScreen: React.FC<
  HandleClosePopup & {
    subscriptionType: string;
    price: string;
    subColor: string;
  }
> = ({ onClose, subscriptionType, price, subColor }) => {
  console.log(price);
  const [error, setError] = useState('');
  const [cardDetails, setCardDetails] = useState<Card[]>([]); // cardDetails store an array of cards
  const [selectCard, setSelectCard] = useState<Card[]>([]); // either user chooses card, or not
  const [cvv, setCvv] = useState('');

  // handleCardClick should show all the info of a card
  const handleCardClick = (
    card: Card,
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event?.stopPropagation(); // Prevent event propagation if event exists
    setSelectCard([card]);
    console.log(card);
  };

  const handleSubmit = async () => {
    if (cvv === selectCard[0]?.cardSecurity) {
      try {
        await axios.post(
          `${backendBaseUrl}/api/subscription/updateSubscription`,
          {
            cardID: selectCard[0].cardID,
            subscriptionType: subscriptionType,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const priceNumeric = parseFloat(price.replace(/[^\d.]/g, ''));
        // Convert numerical value to decimal with two decimal places
        const decimalPrice = priceNumeric.toFixed(2);
        await axios.post(
          `${backendBaseUrl}/api/card/createTransaction`,
          {
            transactionAmount: decimalPrice,
            subscriptionType: subscriptionType,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        navigate('/PrevTransactions');
      } catch (error) {
        console.error(
          'Error updating subscription and creating transaction:',
          error
        );
      }
    } else if (cvv === '') {
      setError('Please enter a CVV.');
    } else {
      setError('Please enter the correct CVV.');
    }
  };

  const handleCVVChange = (value) => {
    setCvv(value);
  };

  const navigate = useNavigate();
  const storedToken = localStorage.getItem('sessionToken');

  // API - GET
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
        setCardDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching new songs:', error);
      }
    };
    fetchCards();
  }, []);

  const handleNo = () => {
    onClose();
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-60"></div>
        {/* Increased z-index to 60 */}
        <div className="md:ml-[400px] bg-[#3E3C3C] p-16 flex flex-row justify-evenly w-[900px] h-[600px] rounded-xl z-50">
          {/* Col 1 */}
          <div className="bg-[#656262] flex flex-row justify-start rounded-xl w-[500px]">
            <div className="flex flex-col p-8">
              <div className="text-lg font-semibold">Review Details</div>
              <div className="mt-3">Card Type</div>
              <input
                className="bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[180px] px-2 py-2 pb-2 mb-3 rounded-full text-center"
                title="Please enter a card type."
                value={selectCard[0]?.cardType || ''}
                disabled
              />

              <span>Card Number</span>
              <input
                className="bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[180px] px-2 py-2 pb-2 mb-3 rounded-full text-center"
                title="Please enter a card number."
                value={
                  selectCard[0]?.cardNumber
                    ? '**** ' + selectCard[0].cardNumber.slice(-4)
                    : ''
                }
                disabled
              />

              <span>Expiration Date</span>
              <input
                className="bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[180px] px-2 py-2 pb-2 mb-3 rounded-full text-center"
                title="Please enter a expiration date."
                value={
                  selectCard[0]?.cardExpiration
                    ? `${selectCard[0].cardExpiration.slice(
                        5,
                        7
                      )}/${selectCard[0].cardExpiration.slice(2, 4)}`
                    : ''
                }
                disabled
              />

              <span>Card Security</span>
              <input
                className="bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[180px] px-2 py-2 pb-2 mb-3 rounded-full text-center"
                title="Please enter a card Security."
                value={cvv}
                onChange={(e) => handleCVVChange(e.target.value)}
              />
              {error && error === 'Please enter a CVV.' && (
                <p className="text-[#b074ff] text-bold">{error}</p>
              )}
              {error && error === 'Please enter the correct CVV.' && (
                <p className="text-red-500 text-bold">{error}</p>
              )}
            </div>
            <div className="flex flex-col p-10">
              <span className="pt-8">First Name</span>
              <input
                className="bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[180px] px-2 py-2 pb-2 mb-3 rounded-full text-center"
                title="Please enter a first name."
                value={selectCard[0]?.firstName || ''}
                disabled
              />

              <span>Last Name</span>
              <input
                className="bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[180px] px-2 py-2 pb-2 mb-3 rounded-full text-center"
                title="Please enter a last name."
                value={selectCard[0]?.lastName || ''}
                disabled
              />
            </div>
          </div>

          <div className="flex flex-col ml-5">
            {/* Card Details */}
            <div className="text-white text-md mb-2 text-left items-start">
              Your Cards
            </div>
            <div className="flex flex-col h-fit w-[300px] p-2 rounded-md bg-[#4d4949]">
              {cardDetails.map((card: Card) => (
                <button
                  key={card.cardID}
                  onClick={(e) => handleCardClick(card, e)}
                >
                  <div className="flex flex-row items-center rounded-md py-1 pl-1 hover:bg-[#5b5656]">
                    {card.cardType && card.cardType === 'Visa' && (
                      <img
                        className="ml-2"
                        src="https://static-00.iconduck.com/assets.00/visa-icon-2048x1313-o6hi8q5l.png"
                        width="90"
                        height="40"
                      />
                    )}
                    {card.cardType && card.cardType === 'Discover' && (
                      <img
                        className="ml-2"
                        src="https://www.shutterstock.com/image-vector/west-java-indonesia-oktober-13-600nw-2374385743.jpg"
                        width="90"
                        height="40"
                      />
                    )}
                    {card.cardType && card.cardType === 'Mastercard' && (
                      <img
                        className="ml-2"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
                        width="90"
                        height="40"
                      />
                    )}
                    {card.cardType && card.cardType === 'American Express' && (
                      <img
                        className="ml-2"
                        src="https://www.svgrepo.com/show/266068/american-express.svg"
                        width="90"
                        height="40"
                      />
                    )}

                    {/* if cardType === Visa, cardType === MasterCard, cardType === American Express, cardType === Discover */}
                    <div className="ml-8 text-left">
                      <div className="text-lg"> {card.cardType} </div>
                      {card.cardNumber && (
                        <div className="text-base flex items-center">
                          <p className="mt-1.5">****</p>
                          <p className="ml-1">{card.cardNumber.slice(-4)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {/* Space in between */}
            <div className="flex flex-grow"></div>
            {/* Subscription Listing */}
            <div className="flex flex-row justify-center mb-5">
              <p className={`text-xl text-[${subColor}]`}>
                {subscriptionType}
                <span className="pr-1">: </span>
              </p>
              <p className="text-xl">{price}</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center">
              <span className="mb-3 ">Proceed With Transaction?</span>
              <div className="flex flex-row justify-center">
                <button
                  className="hover:bg-[#9E67E4] bg-[#683f9c] w-[75px] h-[50px] px-[23px] py-[15px] rounded-3xl mr-4"
                  onClick={handleSubmit}
                >
                  Yes
                </button>

                <button
                  className="hover:bg-[#494747] bg-[#2d2c2c] w-[75px] h-[50px] px-[26px] py-[15px] rounded-3xl"
                  onClick={handleNo}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
