import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import { useNavigate } from 'react-router-dom';

interface Song {
  trackID: number;
  songName: string;
  coverArtURL: string;
  songURL: string;
  albumName: string;
  artistName: string;
  isPopular: boolean;
}

interface Props {
  title: string;
}

export const ExtendedRapSongs = ({ title }: Props) => {
  const [rapSongs, setRapSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [hideCard, setHideCard] = useState<boolean>(true);

  const handleSongClick = (
    song: Song,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setSelectedSong(song);
    setClickPosition({ x: event.clientX, y: event.clientY });
    setHideCard(false); // Reset the hide flag when a song is clicked
  };

  const handleMouseLeave = () => {
    setHideCard(true); // Hide the card when mouse leaves the song card
  };

  const storedToken = localStorage.getItem('sessionToken');

  // FETCH TOP SONGS BACKEND CALL
  useEffect(() => {
    const fetchRapSongs = async () => {
      try {
        const response = await axios.post(
          `${backendBaseUrl}/api/home/fetchSongs`,
          {
            genre: 'Hip Hop',
            count: 100,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        //console.log(response.data);
        setRapSongs(response.data);
      } catch (error) {
        console.error('Error fetching new songs:', error);
      }
    };

    fetchRapSongs();
  }, []);

  // LIKE SONG BACKEND CALL
  const handleLikeSong = async () => {
    console.log(
      JSON.stringify({
        selectedSong,
      })
    );
    if (selectedSong) {
      console.log('trackID: ', selectedSong.trackID);
      console.log('storedToken: ', storedToken);
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
      } catch (error) {
        console.error('Error liking the song:', error);
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

  function refreshPage() {
    window.location.reload();
  }

  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col md:gap-4 gap-6 px-2">
      <div className="w-full flex items-center overflow-x-auto overflow-y-auto md:pb-0 pb-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {rapSongs.map((song: Song) => {
            return (
              <div
                key={song.songName}
                className="flex flex-col items-center gap-[6px] cursor-pointer"
                style={{ minWidth: '200px' }}
                onClick={(e) => handleSongClick(song, e)}
              >
                <div className="bg-[#656262] rounded-lg p-5 bg-center bg-cover relative">
                  {song.isPopular ? (
                    <div className="absolute bottom-1 right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                  ) : null}
                  <img
                    className="w-[140px] h-[140px] rounded-xl"
                    src={song.coverArtURL}
                    alt={song.songName}
                  />

                  <div className="pt-2 text-white text-[15px] font-medium whitespace-nowrap">
                    {song.songName.length > 20
                      ? song.songName.slice(0, 17) + '...'
                      : song.songName}
                  </div>
                  <div className="pt-1 text-[#BA85FE] text-[13px]">
                    {song.artistName}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {selectedSong && clickPosition && !hideCard && (
        <div
          className="absolute"
          style={{ top: clickPosition.y - 195, left: clickPosition.x - 5 }}
        >
          <div
            className="text-center font-color-red-500 w-[100px] h-[150px] bg-[rgba(33,32,32,0.8)] p-1 rounded-lg"
            onMouseLeave={handleMouseLeave}
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
                handleSongPlayed();
                localStorage.setItem(
                  'selectedSong',
                  JSON.stringify(selectedSong)
                );
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
            {/* <button
              className="hover:bg-[#656262] text-xs m-2 px-3"
              onClick={() => {
                console.log('add to playlist button clicked');
                setHideCard(true);
              }}
            >
              Add to Playlist
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};
