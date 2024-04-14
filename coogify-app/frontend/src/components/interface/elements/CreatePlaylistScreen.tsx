import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DefaultPlaylist from '../../../../public/images/DefaultPlaylist.svg';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';

interface ConfirmationScreenProps {
  onClose: () => void; // Specify the type of onClose prop
}

export const CreatePlaylistScreen: React.FC<ConfirmationScreenProps> = ({
  onClose,
}) => {
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
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-60"></div>
        {/* Increased z-index to 60 */}
        <div className="md:ml-[400px] bg-[#3E3C3C] text-white rounded-lg p-5 w-[1100px] h-[480px] shadow-md z-50 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-5">
            <span className="text-[22px]">Create Playlist</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col justify-center items-center mr-4">
              <label className="w-[200px] h-[200px] bg-[#656262] rounded-lg flex justify-center items-center cursor-pointer mb-4">
                <input
                  className="hidden"
                  type="file"
                  id="coverArtURL"
                  name="coverArtURL"
                  onChange={handleFileChange}
                  accept="image/jpeg, image/jpg, image/png, image/svg+xml"
                  required
                  title="Please enter a cover art."
                />
                <div>Upload Cover</div>
              </label>
            </div>
            <div className="flex flex-col flex-grow">
              <div className="mb-3">
                <label
                  htmlFor="playlistName"
                  className="text-[#9E67E4] ml-3 mb-2 text-sm"
                >
                  Playlist
                </label>
                <div
                  id="playlistName"
                  className="p-2 w-full font-black text-7xl border-none outline-none cursor-text relative"
                  contentEditable={true}
                  onBlur={handleInputChange}
                  onClick={handleInputClick}
                  onFocus={handleInputClick}
                  suppressContentEditableWarning={true} // Suppress the warning about contentEditable
                >
                  {playlistName || 'My Playlist'}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="playlistDes" className="mb-2 text-sm">
              Playlist Description
            </label>
            <input
              className="text-black text-lg h-20 p-2 w-full rounded-md border-none outline-none cursor-text mb-5"
              id="playlistDes"
              name="playlistDes"
              value={playlistDes}
              onChange={(e) => setPlaylistDes(e.target.value)}
              placeholder="Add optional description."
            />
          </div>

          <div className="w-full flex items-center justify-between">
            <div
              className="bg-[#212020] hover:bg-[#5e5c5c] text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={handleNo}
            >
              Cancel
            </div>
            <div
              className="bg-[#683f9c] hover:bg-[#9E67E4] text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={handleYes}
            >
              Create Playlist
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
