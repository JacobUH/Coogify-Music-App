import React, { useState } from 'react';
import AddIcon from '/images/AddIcon.svg';
import AddIconHover from '/images/AddIconHover.svg';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreatePlaylistScreen } from '../elements/CreatePlaylistScreen';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';

interface Playlist {
  playlistID: number;
  userID: number;
  firstName: string;
  lastName: string;
  playlistName: string;
  playlistArt: string;
}

interface Props {
  title: string;
}

export const PlaylistRows = ({ title }: Props) => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const location = useLocation();

  const [currentHoveredItem, setCurrentHoveredItem] = useState(false);

  const handleMouseLeave = () => {
    setCurrentHoveredItem(null);
  };

  const toggleShowScreen = () => {
    setShowPopup(true);
  };

  const handleCloseScreen = () => {
    setShowPopup(false); // Close the confirmation screen
  };

  const storedToken = localStorage.getItem('sessionToken');

  useEffect(() => {
    // Fetch data from backend API for rap songs
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/playlist/fetchPlaylists`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setPlaylists(response.data);
      } catch (error) {
        console.error('Error fetching rap songs:', error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="w-full flex flex-col md:gap-4 gap-6 px-2">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-[22px]">{title}</span>
          <div
            onMouseEnter={() => setCurrentHoveredItem(true)}
            onMouseLeave={() => setCurrentHoveredItem(false)}
          >
            <img
              className="w-[20px] pb-1 cursor-pointer"
              src={currentHoveredItem ? AddIconHover : AddIcon}
              onClick={toggleShowScreen}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center overflow-x-auto overflow-y-auto md:pb-0 pb-5">
        <div className="flex items-center gap-2">
          {playlists.map((playlist: Playlist) => (
            <div
              key={playlist.playlistID}
              className="flex flex-col items-center gap-[6px] cursor-pointer"
              style={{ minWidth: '200px' }} // Adjust the minimum width of each song item
              onClick={() => navigate(`/playlist/${playlist.playlistName}`)}
            >
              <div className=" bg-[#656262] rounded-lg p-5 bg-center bg-cover">
                <img
                  className="w-[140px] h-[140px] rounded-xl"
                  src={playlist.playlistArt}
                  alt={playlist.playlistName}
                />
                <div className="pt-2 text-white text-[15px] font-medium whitespace-nowrap">
                  {playlist.playlistName.length > 20
                    ? playlist.playlistName.slice(0, 17) + '...'
                    : playlist.playlistName}
                </div>
                <div className="pt-1 text-[#BA85FE] text-[13px]">
                  {playlist.firstName + ' ' + playlist.lastName}
                </div>
              </div>
            </div>
          ))}
        </div>
        {showPopup && <CreatePlaylistScreen onClose={handleCloseScreen} />}
      </div>
    </div>
  );
};
