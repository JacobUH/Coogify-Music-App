import React from 'react';
import BackButton from '/images/Back Button.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SubscriptionScreen } from '../elements/SubscriptionScreen';
import { SubscriptionActive } from '../elements/SubscriptionActiveScreen';
import { SchoolEmail } from '../elements/SchoolEmail';
import { ConfirmCancelScreen } from '../elements/ConfirmCancelScreen';
import backendBaseUrl from '../../../apiConfig';
import axios from 'axios';

interface Subscription {
  subscriptionID: number;
  cardID: number;
  subscriptionType: string;
  startDate: string;
  endDate: string;
  renewDate: string;
}

export const SubscriptionMain = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [subCreds, setSubCreds] = useState<Subscription[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showActive, setShowActive] = useState(false);
  const [showSchool, setShowSchool] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState('');
  const [price, setPrice] = useState('');
  const [subColor, setSubColor] = useState('');

  const handlePurchase = (subscriptionType, price, subColor) => {
    if (
      subCreds[0].subscriptionType === 'Student' ||
      subCreds[0].subscriptionType === 'Paid'
    ) {
      setShowActive(true);
    } else {
      setShowPopup(true);
      setSubscriptionType(subscriptionType);
      setPrice(price);
      setSubColor(subColor);
    }
  };

  const handleSchool = (subscriptionType, price, subColor) => {
    if (
      subCreds[0].subscriptionType === 'Student' ||
      subCreds[0].subscriptionType === 'Paid'
    ) {
      setShowActive(true);
    } else {
      setShowSchool(true);
      setSubscriptionType(subscriptionType);
      setPrice(price);
      setSubColor(subColor);
    }
  };

  const HandleClosePopup = () => {
    setShowPopup(false);
  };

  const HandleCloseActive = () => {
    setShowActive(false);
  };

  const HandleCloseSchool = () => {
    setShowSchool(false);
  };

  const storedToken = localStorage.getItem('sessionToken');

  // API - GET
  useEffect(() => {
    const fetchUserLikedSongs = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/user/subscriptionCredentials`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        //console.log(response.data);
        setSubCreds(response.data);
      } catch (error) {
        console.error('Error fetching new songs:', error);
      }
    };

    fetchUserLikedSongs();
  }, []);

  const cancelSubscription = async () => {
    try {
      const response = await axios.get(
        `${backendBaseUrl}/api/subscription/cancelSubscription`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    }
  };

  const restoreSubscription = async () => {
    try {
      const response = await axios.get(
        `${backendBaseUrl}/api/subscription/restoreSubscription`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error restoring subscription:', error);
    }
  };

  const [showCancel, setShowCancel] = useState(false);
  const [showRestore, setShowRestore] = useState(false);

  const handleCancel = () => {
    setShowCancel(true);
  };

  const handleRestore = () => {
    setShowRestore(true);
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
            <div className="text-2xl flex flex-col gap-4 items-center sm:w-96 md:w-96 mt-16">
              <span>Subscription Plans</span>
              <button
                className="text-[#A263F2] w-full py-9 rounded-lg pl-7 mb-4 bg-[#656262] shadow-md shadow-[#313131] text-left"
                onClick={() =>
                  handlePurchase('Paid', '$10.99/per month', '#A263F2')
                }
              >
                <div className="text-4xl font-bold">Premium</div>
                <div className=" text-white text-lg font-normal">
                  {' '}
                  $10.99/per month
                </div>
              </button>
              <button
                className="text-[#FFFF00] w-full py-9 rounded-lg pl-7 mb-4 bg-[#656262] shadow-md shadow-[#313131] text-left"
                onClick={() =>
                  handleSchool('Student', '$5.99/per month', '#FFFF00')
                }
              >
                <div className="text-4xl font-bold">Student</div>
                <div className="text-white text-lg font-normal">
                  $5.99/per month
                </div>
              </button>
            </div>
            {showActive && <SubscriptionActive onClose={HandleCloseActive} />}
            {showPopup && (
              <SubscriptionScreen
                onClose={HandleClosePopup}
                subscriptionType={subscriptionType} // Pass subscription type as prop
                price={price} // Pass price as prop
                subColor={subColor}
              />
            )}
            {showSchool && (
              <SchoolEmail
                onClose={HandleCloseSchool}
                subscriptionType={subscriptionType} // Pass subscription type as prop
                price={price} // Pass price as prop
                subColor={subColor}
              />
            )}
            <div className="text-2xl text-center gap-4 items-center sm:mt-10 md:w-96">
              Current Plan
              <div className="bg-[#656262] w-full h-96 px-9 py-9 rounded-lg pl-7 font-normal flex flex-col mt-5">
                <div className="flex-grow">
                  <h1 className="text-center text-5xl font-extrabold mb-5 ">
                    {subCreds.length > 0 &&
                      subCreds[0].subscriptionType &&
                      subCreds[0].subscriptionType === 'Free' && (
                        <span className="text-white">Free</span>
                      )}
                    {subCreds.length > 0 &&
                      subCreds[0].subscriptionType &&
                      subCreds[0].subscriptionType === 'Paid' && (
                        <span className="text-[#A263F2]">Premium</span>
                      )}
                    {subCreds.length > 0 &&
                      subCreds[0].subscriptionType &&
                      subCreds[0].subscriptionType === 'Student' && (
                        <span className="text-[#FFFF00]">Student</span>
                      )}
                  </h1>
                </div>
                {subCreds.length > 0 &&
                  subCreds[0].subscriptionType &&
                  subCreds[0].subscriptionType !== 'Free' && (
                    <>
                      <h1 className="text-center mb-4">
                        Start Date<span className="pr-1">: </span>
                        {new Date(subCreds[0].startDate).toLocaleDateString(
                          'en-US'
                        )}
                      </h1>
                      {subCreds[0].endDate === null && (
                        <>
                          <h1 className="text-center mb-4">
                            Renewal Date<span className="pr-1">: </span>
                            {new Date(subCreds[0].renewDate).toLocaleDateString(
                              'en-US'
                            )}
                          </h1>
                        </>
                      )}
                      {subCreds[0].endDate !== null && (
                        <>
                          <h1 className="text-center mb-4">
                            Subscription End Date
                            <span className="pr-1">: </span>
                            {new Date(subCreds[0].endDate).toLocaleDateString(
                              'en-US'
                            )}
                          </h1>
                        </>
                      )}
                    </>
                  )}

                {subCreds.length > 0 &&
                  subCreds[0].subscriptionType &&
                  subCreds[0].subscriptionType == 'Free' && (
                    <>
                      <h1 className="text-center text-[#A263F2] font-extrabold mb-4">
                        Purchase A Subscription
                      </h1>
                      <h1 className="text-center text-sm mb-4">
                        Lossless Audio, Offline Listening and More
                      </h1>
                    </>
                  )}
                <div className="flex-grow"></div>
                <div className="text-center flex flex-col">
                  {subCreds.length > 0 &&
                    subCreds[0].subscriptionType &&
                    subCreds[0].subscriptionType !== 'Free' &&
                    subCreds[0].endDate === null && (
                      <>
                        <button
                          className="hover:bg-[#3f3f3f] bg-[#2d2c2c] text-white font-bold py-2 px-4 rounded"
                          onClick={handleCancel}
                        >
                          Cancel Subscription
                        </button>
                        {/* Render ConfirmCancelScreen component if showCancel state is true */}
                        {showCancel && (
                          <ConfirmCancelScreen
                            onClose={() => setShowCancel(false)}
                            condition="cancel"
                          />
                        )}
                      </>
                    )}
                  {subCreds.length > 0 &&
                    subCreds[0].subscriptionType &&
                    subCreds[0].subscriptionType !== 'Free' &&
                    subCreds[0].endDate !== null && (
                      <>
                        <button
                          className="hover:bg-[#3f3f3f] bg-[#2d2c2c] text-white font-bold py-2 px-4 rounded"
                          onClick={handleRestore}
                        >
                          Restore Subscription
                        </button>
                        {/* Render ConfirmCancelScreen component if showRestore state is true */}
                        {showRestore && (
                          <ConfirmCancelScreen
                            onClose={() => setShowRestore(false)}
                            condition="restore"
                          />
                        )}
                      </>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
