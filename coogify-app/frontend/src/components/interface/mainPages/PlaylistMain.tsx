import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProfileIcon from '/images/Profile Icon.svg';
import BackButton from '/images/Back Button.svg';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import { addSongToPlaylist } from '../../../../../backend/routes/specificRoutes/playlistRoutes';

interface Playlist_Song {
  playlistTrackID: number;
  playlistID: number;
  userID: number;
  firstName: string;
  lastName: string;
  playlistName: string;
  playlistDescription: string;
  playlistArt: string;
  trackID: number;
  albumName: string;
  songName: string;
  coverArtURL: string;
  songURL: string;
  duration: string;
  artistID: number;
  artistName: string;
  dateAdded: string;
}

interface Song {
  trackID: number;
  songName: string;
  songURL: string;
  albumName: string;
  coverArtURL: string;
  isPopular: boolean;
  artistName: string;
}

export const PlaylistMain = () => {
  const [songs, setSongs] = useState<Playlist_Song[]>([]);
  const [playlistSong, setPlaylistSongs] = useState<Playlist_Song | null>(
    songs.length > 0 ? songs[0] : null
  );
  const [hidePlaylistSongCard, setHidePlaylistSongCard] =
    useState<boolean>(true);

  const [searchInput, setSearchInput] = useState('');
  const [searchSongs, setSearchSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [hideSongCard, setHideSongCard] = useState<boolean>(true);

  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/library');
  };

  const handleMouseSongLeave = () => {
    setHideSongCard(true); // Hide the card when mouse leaves the song card
  };

  const handleMousePlaylistSongLeave = () => {
    setHidePlaylistSongCard(true); // Hide the card when mouse leaves the song card
  };

  const handlePlaylistSongClick = (
    song: Playlist_Song,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setPlaylistSongs(song);
    setClickPosition({ x: event.clientX, y: event.clientY });
    setHidePlaylistSongCard(false); // Reset the hide flag when a song is clicked
  };

  const handleSongClick = (
    song: Song,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    console.log('Clicked song:', song); // Verify if the correct song is being clicked
    setSelectedSong(song); // Ensure that selectedSong is being set correctly
    setClickPosition({ x: event.clientX, y: event.clientY });
    setHideSongCard(false); // Reset the hide flag when a song is clicked
  };

  const formatDuration = (duration) => {
    // Check if duration is not null
    if (duration !== null) {
      // Split duration string into hours, minutes, and seconds
      const [hours, minutes, seconds] = duration.split(':');

      // Format hours, minutes, and seconds
      const formattedHours = parseInt(hours) > 0 ? `${parseInt(hours)}:` : '';
      const formattedMinutes =
        parseInt(minutes) > 0
          ? `${parseInt(minutes).toString().padStart(2, '0')}:`
          : '00:';
      const formattedSeconds = parseInt(seconds).toString().padStart(2, '0');

      // Concatenate formatted time
      return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
    } else {
      // Return empty string if duration is null
      return '';
    }
  };

  const storedToken = localStorage.getItem('sessionToken');
  const { playlistName } = useParams<{ playlistName: string }>(); // Get the albumName parameter from the URL

  // FETCH SONGS BACKEND CALL
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/search/fetchSongs`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        //console.log(response.data);
        setSearchSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  // FETCH SONGS BACKEND CALL
  const handleAddSong = async () => {
    console.log(
      JSON.stringify({
        selectedSong,
      })
    );
    if (selectedSong) {
      console.log('playlistID: ', songs[0].playlistID);
      console.log('trackID: ', selectedSong.trackID);
      try {
        const response = await axios.post(
          `${backendBaseUrl}/api/playlist/addSong`,
          {
            playlistID: songs[0].playlistID,
            trackID: selectedSong?.trackID,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (error) {
        console.error('Error adding song (frontend):', error);
      }
    }
  };

  // REMOVE SONG BACKEND CALL
  const handleRemoveSong = async () => {
    console.log(
      JSON.stringify({
        selectedSong,
      })
    );
    if (playlistSong) {
      console.log('playlistID: ', songs[0].playlistID);
      console.log('trackID: ', playlistSong.trackID);
      try {
        const response = await axios.post(
          `${backendBaseUrl}/api/playlist/removeSong`,
          {
            playlistID: songs[0].playlistID,
            trackID: playlistSong?.trackID,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (error) {
        console.error('Error adding song (frontend):', error);
      }
    }
  };

  // LIKE SONG BACKEND CALL
  const handleLikeSearchSong = async () => {
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
      } catch (error) {
        console.error('Error liking the song:', error);
      }
    }
  };

  // UNLIKE SONG BACKEND CALL
  const handleUnlikeSearchSong = async () => {
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

  const [searchSongIsLiked, setSearchSongIsLiked] = useState(false);

  useEffect(() => {
    const checkSearchSongLiked = async () => {
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
          console.log('search song is: ', response.data);

          const isSearchSongLiked = response.data;

          // Set the state based on the response
          setSearchSongIsLiked(isSearchSongLiked);
        } catch (error) {
          console.error('Error checking the song:', error);
          // Handle error, maybe show a notification to the user
        }
      }
    };

    checkSearchSongLiked();
  }, [selectedSong, storedToken]);

  // LIKE SONG BACKEND CALL
  const handleLikePlaylistSong = async () => {
    if (playlistSong) {
      try {
        await axios.post(
          `${backendBaseUrl}/api/song/likeSong`,
          {
            trackID: playlistSong.trackID,
            sessionToken: localStorage.getItem('sessionToken'),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('playlist song liked successfully');
      } catch (error) {
        console.error('Error liking the playlist song:', error);
      }
    }
  };

  // UNLIKE SONG BACKEND CALL
  const handleUnlikePlaylistSong = async () => {
    if (playlistSong) {
      try {
        await axios.post(
          `${backendBaseUrl}/api/song/unlikeSong`,
          {
            trackID: playlistSong.trackID,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('playlist song unliked successfully');
        // You can perform additional actions after liking the song here
      } catch (error) {
        console.error('Error unliking the playlist song:', error);
      }
    }
  };

  const [playlistSongIsLiked, setPlaylistSongIsLiked] = useState(false);

  useEffect(() => {
    const checkPlaylistSongLiked = async () => {
      if (playlistSong) {
        try {
          const response = await axios.post(
            `${backendBaseUrl}/api/song/checkSongLiked`,
            {
              trackID: playlistSong.trackID,
            },
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
              },
            }
          );

          // Assuming response.data is a boolean value
          console.log('playlist song is: ', response.data);
          const isPlaylistSongLiked = response.data;

          // Set the state based on the response
          setPlaylistSongIsLiked(isPlaylistSongLiked);
        } catch (error) {
          console.error('Error checking the playlist song:', error);
          // Handle error, maybe show a notification to the user
        }
      }
    };

    checkPlaylistSongLiked();
  }, [playlistSong, storedToken]);

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
  }, [playlistName, handleAddSong, handleRemoveSong]);

  const filteredSongs = searchSongs.filter((song) => {
    const songName = song.songName
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const albumName = song.albumName
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const artistName = song.artistName
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    return songName || albumName || artistName;
  });

  function refreshPage() {
    window.location.reload();
  }

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
        <div className="w-full rounded-xl  md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5 ">
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
                  {songs[0].firstName + ' ' + songs[0].lastName}
                </div>
                <div className="text-sm mt-3 text-[#8056b7]">
                  {songs[0].playlistDescription}
                </div>
                {songs[0].songName !== null && (
                  <div className="text-xl mt-1 text-[#BA85FE]">
                    {songs.length} {songs.length === 1 ? 'song' : 'songs'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Song list */}
          {songs && songs[0] && songs[0].songName !== null ? (
            <div className="w-full md:w-[85%] lg:w-[85%] mb-10">
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
                  onClick={(e) => handlePlaylistSongClick(song, e)}
                >
                  <div className="w-12 md:w-16 text-lg">{index + 1}</div>
                  <img
                    className="w-[50px] h-[50px] rounded-md"
                    src={song.coverArtURL}
                    alt={song.songName}
                  />
                  <div className="flex flex-col flex-grow">
                    <div className="text-lg">{song.songName}</div>
                    <div className="text-lg text-[#BA85FE]">
                      {song.artistName}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {formatDuration(song.duration)}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          <div className="w-full flex justify-center">
            <input
              type="text"
              placeholder="Looking for something specific?"
              className="w-full max-w-4xl bg-[#292828] rounded-full text-center px-1 py-3 text-xl focus:outline-none hover:ring hover:ring-[#9E67E4]"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          {searchInput && ( // Show songs only if there's something in the search input
            <div className="w-full max-w-3xl justify-center gap-5 bg-[#656262] flex flex-wrap ">
              {filteredSongs.slice(0, 8).map((song: Song) => {
                return (
                  <div
                    key={song.songName}
                    className="flex flex-col items-center gap-[6px] cursor-pointer"
                    style={{ minWidth: '150px' }}
                    onClick={(e) => {
                      handleSongClick(song, e);
                      setSelectedSong(song); // Update selectedSong state
                    }}
                  >
                    <div className="bg-[#656262] text-center rounded-lg p-5 bg-center bg-cover relative">
                      <img
                        className="w-[125px] h-[125px] rounded-xl"
                        src={song.coverArtURL}
                        alt={song.songName}
                      />
                      <div className="pt-2 text-white text-[12px] font-bold whitespace-nowrap">
                        {song.songName.length > 17
                          ? song.songName.slice(0, 17) + '...'
                          : song.songName}
                      </div>
                      <div className="pt-1 text-[#BA85FE] text-[12px]">
                        {song.artistName}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {selectedSong && clickPosition && !hideSongCard && (
        <div
          className="absolute"
          style={{ top: clickPosition.y - 195, left: clickPosition.x - 5 }}
        >
          <div
            className="text-center font-color-red-500 w-[100px] h-[200px] bg-[rgba(33,32,32,0.8)] p-1 rounded-lg"
            onMouseLeave={handleMouseSongLeave}
          >
            <button
              className="hover:bg-[#656262] text-xs m-2 px-3"
              onClick={() => {
                console.log('add to playlist button clicked');
                handleAddSong();
                setHideSongCard(true);
              }}
            >
              Add to Playlist
            </button>
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
                setHideSongCard(true);
                localStorage.setItem(
                  'selectedSong',
                  JSON.stringify(selectedSong)
                );
              }}
            >
              Play Song
            </button>
            {searchSongIsLiked ? (
              <button
                className="hover:bg-[#656262] text-xs m-2 px-3"
                onClick={() => {
                  console.log('unlike button clicked');
                  handleUnlikeSearchSong();
                  setHideSongCard(true);
                }}
              >
                Unlike Song
              </button>
            ) : (
              <button
                className="hover:bg-[#656262] text-xs m-2 px-3"
                onClick={() => {
                  console.log('like button clicked');
                  handleLikeSearchSong();
                  setHideSongCard(true);
                }}
              >
                Like Song
              </button>
            )}
          </div>
        </div>
      )}
      {playlistSong && clickPosition && !hidePlaylistSongCard && (
        <div
          className="absolute"
          style={{ top: clickPosition.y - 195, left: clickPosition.x - 5 }}
        >
          <div
            className="text-center font-color-red-500 w-[100px] h-[200px] bg-[rgba(33,32,32,0.8)] p-1 rounded-lg"
            onMouseLeave={handleMousePlaylistSongLeave}
          >
            <button
              className="hover:bg-[#656262] text-xs m-2 px-3"
              onClick={() => {
                console.log('view song button clicked');
                navigate(`/album/${playlistSong.albumName}`);
              }}
            >
              View Song
            </button>
            <button
              className="hover:bg-[#656262] text-xs m-2 px-3"
              onClick={() => {
                console.log('play button clicked');
                setHidePlaylistSongCard(true);
                localStorage.setItem(
                  'selectedSong',
                  JSON.stringify(playlistSong)
                );
              }}
            >
              Play Song
            </button>
            {playlistSongIsLiked ? (
              <button
                className="hover:bg-[#656262] text-xs m-2 px-3"
                onClick={() => {
                  console.log('unlike button clicked');
                  handleUnlikePlaylistSong();
                  setHidePlaylistSongCard(true);
                }}
              >
                Unlike Song
              </button>
            ) : (
              <button
                className="hover:bg-[#656262] text-xs m-2 px-3"
                onClick={() => {
                  console.log('like button clicked');
                  handleLikePlaylistSong();
                  setHidePlaylistSongCard(true);
                }}
              >
                Like Song
              </button>
            )}
            <button
              className="hover:bg-[#656262] text-xs m-2 px-3"
              onClick={() => {
                console.log('remove song button clicked');
                handleRemoveSong();
                setHidePlaylistSongCard(true);
              }}
            >
              Remove Song
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
