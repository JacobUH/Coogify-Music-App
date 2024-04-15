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

  const handleSongClick = (
    song: Song,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setSelectedSong(song);
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
  }, [playlistName, addSongToPlaylist]);

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
        <div className="w-full rounded-xl  h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5 ">
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
          <div className="w-full flex justify-center mb-5">
            <input
              type="text"
              placeholder="Looking for something specific?"
              className="w-full max-w-4xl bg-[#292828] rounded-full text-center px-4 py-3 text-2xl focus:outline-none hover:ring hover:ring-[#9E67E4]"
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
                    onClick={(e) => handleSongClick(song, e)}
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
              }}
            >
              Play Song
            </button>
            <button
              className="hover:bg-[#656262] text-xs m-2 px-3"
              onClick={() => {
                console.log('like button clicked');
                setHideSongCard(true);
              }}
            >
              Like Song
            </button>
            <button
              className="hover:bg-[#656262] text-xs m-2 px-3"
              onClick={() => {
                console.log('add to playlist button clicked');
                setHideSongCard(true);
              }}
            >
              Add to Playlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
