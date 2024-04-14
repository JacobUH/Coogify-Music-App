import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProfileIcon from '/images/Profile Icon.svg';
import BackButton from '/images/Back Button.svg';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';

interface Music {
  playlistTrackID: number;
  playlistID: number;
  userID: number;
  playlistName: string;
  playlistDescription: string;
  playlistArt: string;
  trackID: number;
  songName: string;
  coverArtURL: string;
  songURL: string;
  duration: string;
  artistID: number;
  dateAdded: string;
}

export const PlaylistMain = () => {
  const [songs, setSongs] = useState<Music[]>([]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/library');
  };

  // Function to format duration
  const formatDuration = (duration) => {
    // Check if duration is not null
    if (duration !== null) {
      // Split duration string into hours, minutes, and seconds
      const [hours, minutes, seconds] = duration.split(':');

      // Format hours, minutes, and seconds
      const formattedHours = parseInt(hours) > 0 ? `${parseInt(hours)}:` : '';
      const formattedMinutes =
        parseInt(minutes) > 0 ? `${parseInt(minutes)}:` : '0:';
      const formattedSeconds = `${parseInt(seconds)}`;

      // Concatenate formatted time
      return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
    } else {
      // Return empty string if duration is null
      return '';
    }
  };

  const storedToken = localStorage.getItem('sessionToken');
  const { playlistName } = useParams<{ playlistName: string }>(); // Get the albumName parameter from the URL

  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      try {
        const response = await axios.post(
          `${backendBaseUrl}/api/playlist/fetchPlaylistSongs`,
          {
            sessionToken: storedToken,
            playlistName: playlistName,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        //console.log(response.data);
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching playlist songs:', error);
      }
    };

    fetchPlaylistSongs();
  }, [playlistName]);

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
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          {/* Album information */}
          {songs.length > 0 && (
            <div className="flex flex-col items-center gap-3">
              <img
                className="w-[325px] h-[325px] shadow-2xl"
                src={songs[0].playlistArt}
                alt="Playlist Cover"
              />
              <div className="text-center text-white">
                <div className="text-4xl mt-5 font-bold">
                  {songs[0].playlistName}
                </div>
                <div className="text-2xl mt-3 text-[#BA85FE]">
                  {songs[0].userID}
                </div>
                <div className="text-xl mt-1 text-[#BA85FE]">
                  {songs.length} {songs.length === 1 ? 'song' : 'songs'}
                </div>
              </div>
            </div>
          )}

          {/* Song list */}
          {songs && songs[0] && songs[0].songName !== null ? (
            <div className="w-full md:w-[85%] lg:w-[85%]">
              {/* Header */}
              <div className="flex items-center gap-3 rounded-lg px-14 py-4">
                <div className="w-12 md:w-16 text-lg">#</div>
                <div className="flex flex-col flex-grow">
                  <div className="text-lg">Title</div>
                </div>
                <div className="text-sm text-gray-400">Duration</div>
              </div>
              <div className="border-b border-gray-300"></div>

              {/* Song items */}
              {songs.map((song, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg px-14 py-4 hover:bg-[#656262] cursor-pointer"
                >
                  <div className="w-12 md:w-16 text-lg">{index + 1}</div>
                  <div className="flex flex-col flex-grow">
                    <div className="text-lg">{song.songName}</div>
                    <div className="text-lg text-[#BA85FE]">
                      {song.songName}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {formatDuration(song.duration)}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
