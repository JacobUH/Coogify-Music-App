import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import { SubscriptionScreen } from './SubscriptionScreen';
import Logo from '/images/Logo.svg';

interface Playlist {
  playlistID: number;
  userID: number;
  firstName: string;
  lastName: string;
  playlistName: string;
  playlistArt: string;
}

interface Song {
  trackID: number;
  songName: string;
  coverArtURL: string;
  songURL: string;
  albumName: string;
  artistName: string;
}

interface HandleClose {
  onClose: () => void; // Specify the type of onClose prop
  selectedSong: Song | null;
}

export const SelectPlaylistPopup: React.FC<HandleClose> = ({
  onClose,
  selectedSong,
}) => {
  const navigate = useNavigate();

  const handleNo = () => {
    onClose();
  };

  const [addSongMessage, setAddSongMessage] = useState('');
  const handleAddSong = async () => {
    console.log(
      JSON.stringify({
        selectedSong,
        selectedPlaylist,
      })
    );
    if (selectedSong && selectedPlaylist) {
      console.log('playlistID: ', selectedPlaylist.playlistID);
      console.log('trackID: ', selectedSong.trackID);
      try {
        const response = await axios.post(
          `${backendBaseUrl}/api/playlist/selectAddSong`,
          {
            playlistID: selectedPlaylist.playlistID,
            trackID: selectedSong?.trackID,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const addSongMessage = response.data.message;
        setAddSongMessage(addSongMessage);
        setTimeout(() => {
          onClose();
        }, 2000);
      } catch (error) {
        console.error('Error adding song (frontend):', error);
        setAddSongMessage('Error adding song to playlist!');
      }
    }
  };

  const storedToken = localStorage.getItem('sessionToken');

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );

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

  function refreshPage() {
    window.location.reload();
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-60"></div>{' '}
        {/* Increased z-index to 60 */}
        <div className="md:ml-[400px] bg-[#3E3C3C] text-white rounded-lg px-14 pt-8 pb-14 shadow-md z-50 flex flex-col items-center">
          <img
            className="w-[35px] h-[35px] mb-8"
            src={Logo}
            alt="coogify logo"
          />
          <p className="text-4xl mb-10">Select A Playlist</p>
          <select
            className="bg-[#656262] hover:bg-[#9E67E4] text-white font-bold mt-4 py-2 px-4 rounded"
            onChange={(e) =>
              setSelectedPlaylist(
                playlists.find(
                  (p) => p.playlistID === parseInt(e.target.value)
                ) || null
              )
            }
          >
            <option value="">Select</option>
            {playlists.map((playlist) => (
              <option key={playlist.playlistID} value={playlist.playlistID}>
                {playlist.playlistName}
              </option>
            ))}
          </select>
          <div className="flex mt-14">
            <button
              className="bg-[#683f9c] hover:bg-[#9E67E4] text-white font-bold mr-2 py-2 px-10 rounded"
              onClick={handleAddSong}
            >
              Add Song
            </button>

            <button
              className="bg-[#656262] hover:bg-[#9E67E4] text-white font-bold py-2 px-10 rounded"
              onClick={handleNo}
            >
              Cancel
            </button>
          </div>
          {addSongMessage && (
            <div className="text-[#9E67E4] mt-5 font-extrabold">
              {addSongMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
