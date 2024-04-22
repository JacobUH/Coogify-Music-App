import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProfileIcon from '/images/Profile Icon.svg';
import BackButton from '/images/Back Button.svg';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import { SelectPlaylistPopup } from '../elements/selectPlaylistPopup';

interface Music {
  trackID: number;
  genreID: number;
  genreName: string;
  artistID: number;
  artistName: string;
  albumName: string;
  songName: string;
  coverArtURL: string;
  duration: string;
  releaseDate: string;
  songURL: string;
  likes: number;
  plays: number;
}

export const AlbumMain = () => {
  const [songs, setSongs] = useState<Music[]>([]);
  const [selectedSong, setSelectedSong] = useState<Music | null>(
    songs.length > 0 ? songs[0] : null
  );
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [hideCard, setHideCard] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleMouseLeave = () => {
    setHideCard(true); // Hide the card when mouse leaves the song card
  };

  const handleSongClick = (
    song: Music,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setSelectedSong(song); // Set selectedSong to the clicked song
    setClickPosition({ x: event.clientX, y: event.clientY });
    setHideCard(false); // Reset the hide flag when a song is clicked
  };

  useEffect(() => {
    console.log(selectedSong);
  }, [selectedSong]);

  // Function to format duration
  const formatDuration = (duration: string) => {
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
  const { albumName } = useParams<{ albumName: string }>(); // Get the albumName parameter from the URL

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await axios.post(
          `${backendBaseUrl}/api/album`,
          {
            albumName: albumName,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response.data);
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching album songs:', error);
      }
    };

    fetchAlbumData();
  }, [albumName]);

  const [songIsLiked, setSongIsLiked] = useState(false);
  const [showPlaylistPopup, setShowPlaylistPopup] = useState<boolean>(false);

  const handleAddSong = () => {
    setShowPlaylistPopup(true);
  };

  const handleClosePopup = () => {
    setShowPlaylistPopup(false);
  };

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

  // LIKE SONG BACKEND CALL
  const handleLikeSong = async () => {
    if (selectedSong) {
      try {
        await axios.post(
          `${backendBaseUrl}/api/song/likeSong`,
          {
            trackID: selectedSong.trackID,
            sessionToken: storedToken,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Song liked successfully');
        // You can perform additional actions after liking the song here
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

  const handleSongPlayed = async () => {
    try {
      const response = await axios.post(
        `${backendBaseUrl}/api/song/playedSong`,
        {
          trackID: selectedSong?.trackID,
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

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto">
        <div className="fixed ml-10 mt-10 z-10">
          <img
            src={BackButton}
            alt="Back"
            onClick={handleBack}
            className="cursor-pointer"
          />
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5 relative">
          {/* Album information */}
          {songs.length > 0 && (
            <div className="flex flex-col items-center gap-3">
              <img
                className="w-[325px] h-[325px] shadow-2xl"
                src={songs[0].coverArtURL}
                alt="Album Cover"
              />
              <div className="text-center text-white">
                <div className="text-4xl mt-5 font-bold">
                  {songs[0].albumName}
                </div>
                <div className="text-2xl mt-3 text-[#BA85FE]">
                  {songs[0].artistName}
                </div>
              </div>
            </div>
          )}

          {/* Song list */}
          <div className="w-full md:w-[85%] lg:w-[85%]">
            {/* Header */}
            <div className="flex items-center gap-3 rounded-lg px-14 py-4">
              <div className="w-12 md:w-16 text-lg">#</div>
              <div className="flex flex-col flex-grow">
                <div className="text-lg">Title</div>
              </div>
              <div className="text-md text-gray-400 mr-24">Plays</div>

              <div className="text-md text-gray-400 mr-4">Likes</div>
            </div>
            <div className="border-b border-gray-300"></div>

            {/* Song items */}
            {songs.map((song, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg px-14 py-4 hover:bg-[#656262] cursor-pointer"
                onClick={(e) => handleSongClick(song, e)}
              >
                <div className="w-12 md:w-16 text-lg">{index + 1}</div>
                <div className="flex flex-col flex-grow">
                  <div className="text-lg">{song.songName}</div>
                  <div className="text-lg text-[#BA85FE]">
                    {song.artistName}
                  </div>
                </div>
                <div className="text-md text-gray-400 mr-32">{song.plays}</div>
                <div className="text-md text-gray-400 mr-6">{song.likes}</div>
              </div>
            ))}
          </div>
        </div>
        {songs && clickPosition && !hideCard && (
          <div
            className="absolute"
            style={{ top: clickPosition.y - 145, left: clickPosition.x - 5 }}
          >
            <div
              className="text-center font-color-red-500 w-[100px] h-[150px] bg-[rgba(33,32,32,0.8)] p-1 rounded-lg"
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="hover:bg-[#656262] text-xs m-2  px-3"
                onClick={() => {
                  console.log('play button clicked');
                  setHideCard(true);
                  localStorage.setItem(
                    'selectedSong',
                    JSON.stringify(selectedSong)
                  );
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
              <button
                className="hover:bg-[#656262] text-xs m-2 px-3"
                onClick={() => {
                  console.log('add to playlist button clicked');
                  setShowPlaylistPopup(true);
                  setHideCard(true);
                }}
              >
                Add to Playlist
              </button>
            </div>
            {showPlaylistPopup && (
              <SelectPlaylistPopup
                onClose={handleClosePopup}
                selectedSong={selectedSong}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
