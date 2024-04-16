import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DefaultPlaylist from '../../../../public/images/DefaultPlaylist.svg';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';

interface HandleClose {
  onClose: () => void; // Specify the type of onClose prop
}

export const SubscriptionScreen: React.FC<
  HandleClose & { subscriptionType: string; price: string; subColor: string }
> = ({ onClose, subscriptionType, price, subColor }) => {
  const defaultPlaylistName = 'My Playlist'; // Define the default playlist name
  const defaultCoverArtURL = DefaultPlaylist; // URL of the default SVG image

  const [error, setError] = useState('');
  const [playlistName, setPlaylistName] = useState(defaultPlaylistName);
  const [playlistDes, setPlaylistDes] = useState('');
  const [coverArtURL, setCoverArtURL] = useState<File | string | null>(
    defaultCoverArtURL
  );

  const handleInputClick = () => {
    const inputDiv = document.getElementById('playlistName');
    inputDiv?.focus();
  };

  const handleInputChange = (e) => {
    const newName = e.target.textContent.trim(); // Trim any leading or trailing whitespace
    setPlaylistName(newName || defaultPlaylistName); // If newName is empty, use defaultPlaylistName
    setError(''); // Clear error whenever the playlist name content changes
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setCoverArtURL(file);
    } else {
      setCoverArtURL(defaultCoverArtURL);
    }
  };

  const navigate = useNavigate();
  const storedToken = localStorage.getItem('sessionToken');

  const handleYes = async () => {
    console.log(
      JSON.stringify({
        playlistName,
        playlistDes,
        coverArtURL,
        storedToken,
      })
    );
    try {
      const response = await axios.post(
        `${backendBaseUrl}/api/playlist/uploadPlaylistEntry`, // Use backendBaseUrl here
        {
          playlistName: playlistName,
          playlistDescription: playlistDes,
          coverArtURL: coverArtURL,
          sessionToken: storedToken,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      navigate(`/playlist/${playlistName}`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('unable to create playlist.');
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        setError(error.response.data.error);
      }
    }
  };

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
                className="bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[180px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"
                title="Please enter a card type."
              ></input>

              <div className="">Card Number</div>
              <input
                className="bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[180px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"
                title="Please enter a card number."
              ></input>

              <div className="">Expiration Date</div>
              <input
                className="bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[180px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"
                title="Please enter a expiration date."
              ></input>

              <div className="">CVV</div>
              <input
                className="bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[180px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"
                title="Please enter a CVV."
              ></input>
            </div>
            <div className="flex flex-col p-10">
              <div className="pt-8">First Name</div>
              <input
                className="bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[180px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"
                title="Please enter your first name."
              ></input>

              <div className="">Last Name</div>
              <input
                className="bg-[#858181] shadow-md shadow-[#313131] h-[35px] w-[180px] px-2 py-2 pb-2 mb-3 rounded-full transition duration-200 ease-in-out"
                title="Please enter your last name."
              ></input>
            </div>
          </div>

          <div className="flex flex-col ml-5">
            {/* Card Details */}
            <div className="text-white text-md mb-2 text-left items-start">
              Your Cards
            </div>
            <div className="flex flex-col h-fit w-[300px] p-2 rounded-md bg-[#4d4949]">
              <button>
                <div className="flex flex-row items-center rounded-md py-1 pl-1 hover:bg-[#5b5656]">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                    width="100"
                    height="50"
                  />
                  {/* if cardType === Visa, cardType === MasterCard, cardType === American Express, cardType === Discover */}
                  <div className="ml-8">
                    <div className="mr-16">Visa Card</div> {/* Card.cardType */}
                    <div className="">**** **** **** 4567</div>{' '}
                    {/* Card.cardNumber */}
                  </div>
                </div>
              </button>
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
                <button className="bg-[#9E67E4] w-[75px] h-[50px] px-[23px] py-[15px] rounded-3xl mr-4">
                  Yes
                </button>

                <button
                  className="bg-[#2d2c2c] w-[75px] h-[50px] px-[26px] py-[15px] rounded-3xl"
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
