import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import { useNavigate } from 'react-router-dom';
import { SelectPlaylistPopup } from './selectPlaylistPopup';

interface Props {
  selectedSong: any;
  clickPosition: { x: number; y: number };
  hideCard: boolean;
  setHideCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const SongContextMenu: React.FC<Props> = ({
  selectedSong,
  clickPosition,
  hideCard,
  setHideCard,
}) => {
  const storedToken = localStorage.getItem('sessionToken');

  // LIKE SONG BACKEND CALL
  const handleLikeSong = async () => {
    if (selectedSong) {
      try {
        await axios.post(
          `${backendBaseUrl}/api/song/likeSong`,
          {
            trackID: selectedSong.trackID,
            sessionToken: localStorage.getItem('sessionToken'),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Song liked successfully');
        setHideCard(true);
      } catch (error) {
        console.error('Error liking the song:', error);
      }
    }
  };

  // UNLIKE SONG BACKEND CALL
  const handleUnlikeSong = async () => {
    if (selectedSong) {
      try {
        await axios.post(
          `${backendBaseUrl}/api/song/unlikeSong`,
          {
            trackID: selectedSong.trackID,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Song unliked successfully');
        // You can perform additional actions after liking the song here
      } catch (error) {
        console.error('Error unliking the song:', error);
      }
    }
  };

  const [songIsLiked, setSongIsLiked] = useState(false);

  useEffect(() => {
    const checkSongLiked = async () => {
      if (selectedSong) {
        try {
          const response = await axios.post(
            `${backendBaseUrl}/api/song/checkSongLiked`,
            {
              trackID: selectedSong.trackID,
            },
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
              },
            }
          );

          // Assuming response.data is a boolean value
          const isLiked = response.data;

          // Set the state based on the response
          setSongIsLiked(isLiked);
        } catch (error) {
          console.error('Error checking the song:', error);
          // Handle error, maybe show a notification to the user
        }
      }
    };

    checkSongLiked();
  }, [selectedSong, storedToken]);

  const [showPlaylistPopup, setShowPlaylistPopup] = useState(false);

  const handleAddSong = () => {
    setShowPlaylistPopup(true);
  };

  const handleClosePopup = () => {
    setShowPlaylistPopup(false);
  };

  const navigate = useNavigate();

  const handleSongPlayed = async () => {
    try {
      const response = await axios.post(
        `${backendBaseUrl}/api/song/playedSong`,
        {
          trackID: selectedSong.trackID,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log('song played could not be stored');
    }
  };

  return (
    <div
      className="absolute"
      style={{ top: clickPosition.y - 145, left: clickPosition.x - 5 }}
    >
      <div
        className="text-center font-color-red-500 w-[100px] h-[150px] bg-[rgba(33,32,32,0.8)] p-1 rounded-lg"
        onMouseLeave={() => setHideCard(true)}
      >
        <button
          className="hover:bg-[#656262] text-xs m-2 px-3"
          onClick={() => {
            console.log('view song button clicked');
            navigate(`/album/${selectedSong.albumName}`);
          }}
        >
          View Song
        </button>
        <button
          className="hover:bg-[#656262] text-xs m-2 px-3"
          onClick={() => {
            console.log('play button clicked');
            setHideCard(true);
            localStorage.setItem('selectedSong', JSON.stringify(selectedSong));
            handleSongPlayed();
          }}
        >
          Play Song
        </button>
        {songIsLiked ? (
          <button
            className="hover:bg-[#656262] text-xs m-2 px-3"
            onClick={() => {
              console.log('unlike button clicked');
              handleUnlikeSong();
              setHideCard(true);
            }}
          >
            Unlike Song
          </button>
        ) : (
          <button
            className="hover:bg-[#656262] text-xs m-2 px-3"
            onClick={() => {
              console.log('like button clicked');
              handleLikeSong();
              setHideCard(true);
            }}
          >
            Like Song
          </button>
        )}
      </div>
      {showPlaylistPopup && (
        <SelectPlaylistPopup
          onClose={handleClosePopup}
          selectedSong={selectedSong}
        />
      )}
    </div>
  );
};

export default SongContextMenu;
