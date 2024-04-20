import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { Link } from 'react-router-dom';
import BackButton from '/images/Back Button.svg';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import { SelectPlaylistPopup } from '../elements/selectPlaylistPopup';

interface Music {
  trackID: number;
  songName: string;
  songURL: string;
  albumName: string;
  coverArtURL: string;
  isPopular: boolean;
  artistName: string;
}

const storedToken = localStorage.getItem('sessionToken');

export const SearchMain = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [searchInput, setSearchInput] = useState('');
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [songs, setSongs] = useState<Music[]>([]);
  const [selectedSong, setSelectedSong] = useState<Music | null>(null);
  const [hideSongCard, setHideSongCard] = useState<boolean>(true);

  const handleSongClick = (
    song: Music,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setSelectedSong(song);
    setClickPosition({ x: event.clientX, y: event.clientY });
    setHideSongCard(false); // Reset the hide flag when a song is clicked
  };

  const handleMouseSongLeave = () => {
    setHideSongCard(true); // Hide the card when mouse leaves the song card
  };

  const [albums, setAlbums] = useState<Music[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Music | null>(null);
  const [hideAlbumCard, setHideAlbumCard] = useState<boolean>(true);

  const handleAlbumClick = (
    album: Music,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setSelectedAlbum(album);
    setClickPosition({ x: event.clientX, y: event.clientY });
    setHideAlbumCard(false); // Reset the hide flag when a song is clicked
  };

  const handleMouseAlbumLeave = () => {
    setHideAlbumCard(true); // Hide the card when mouse leaves the song card
  };

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
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  // FETCH ALBUMS BACKEND CALL
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/search/fetchAlbums`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response.data);
        setAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  const [showPlaylistPopup, setShowPlaylistPopup] = useState(false);

  const handleAddSong = () => {
    setShowPlaylistPopup(true);
  };

  const handleClosePopup = () => {
    setShowPlaylistPopup(false);
  };

  const filteredSongs = songs.filter((song) => {
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

  const filteredAlbums = albums
    .filter((album, index, self) => {
      // Check if this album's name is the first occurrence in the array. If not, it's a duplicate and should be filtered out
      return index === self.findIndex((a) => a.albumName === album.albumName);
    })
    .filter((album) => {
      // Apply the search filter to albumName and artistName
      const albumName =
        album.albumName &&
        album.albumName.toLowerCase().includes(searchInput.toLowerCase());
      const artistName =
        album.artistName &&
        album.artistName.toLowerCase().includes(searchInput.toLowerCase());

      // Check if any song in the album matches the search input
      const songMatches = songs.some(
        (song) =>
          song.albumName === album.albumName &&
          song.songName.toLowerCase().includes(searchInput.toLowerCase())
      );

      return albumName || artistName || songMatches;
    });

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-y-auto relative">
        <div className="absolute top-10 left-10">
          <img
            src={BackButton}
            alt="Back"
            onClick={handleBack}
            className="cursor-pointer"
          />
        </div>
        <div className="text-center text-4xl font-bold mb-5 mt-[45px] text-[50px]">
          Search
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-315px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          <div className="w-full flex justify-center">
            <input
              type="text"
              placeholder="Search for songs, albums, artists"
              className="w-full max-w-5xl bg-[#292828] rounded-full text-center px-4 py-3 text-2xl focus:outline-none hover:ring hover:ring-[#9E67E4]"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="w-full item text-center">
            <h2 className="text-2xl font-semibold mb-3">Songs</h2>
            {/* Render songs here */}
            <div className="flex flex-wrap justify-center gap-5">
              {filteredSongs.slice(0, 6).map((song: Music) => {
                return (
                  <div
                    key={song.songName}
                    className="flex flex-col items-center gap-[6px] cursor-pointer"
                    style={{ minWidth: '150px' }}
                    onClick={(e) => handleSongClick(song, e)}
                  >
                    <div className="bg-[#656262] rounded-lg p-5 bg-center bg-cover relative">
                      {song.isPopular ? (
                        <div className="absolute bottom-1 right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                      ) : null}
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
          </div>
          <div className="w-full item text-center">
            <h2 className="text-2xl font-semibold mb-3">Albums</h2>
            {/* Render albums here */}
            <div className="flex flex-wrap justify-center gap-5">
              {filteredAlbums.slice(0, 6).map((album: Music) => {
                return (
                  <div
                    key={album.albumName}
                    className="flex flex-col items-center gap-[6px] cursor-pointer"
                    style={{ minWidth: '150px' }}
                    onClick={(e) => handleAlbumClick(album, e)}
                  >
                    <div className="bg-[#656262] rounded-lg p-5 bg-center bg-cover relative">
                      {album.isPopular ? (
                        <div className="absolute bottom-1 right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                      ) : null}
                      <img
                        className="w-[125px] h-[125px] rounded-xl"
                        src={album.coverArtURL}
                        alt={album.songName}
                      />

                      <div className="pt-2 text-white text-[12px] font-bold whitespace-nowrap">
                        {album.albumName.length > 17
                          ? album.albumName.slice(0, 17) + '...'
                          : album.albumName}
                      </div>
                      <div className="pt-1 text-[#BA85FE] text-[12px]">
                        {album.artistName}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
                  handleLikeSong();
                  setHideSongCard(true);
                }}
              >
                Like Song
              </button>
            )}
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
          </div>
        </div>
      )}
      {selectedAlbum && clickPosition && !hideAlbumCard && (
        <div
          className="absolute"
          style={{ top: clickPosition.y - 55, left: clickPosition.x - 5 }}
        >
          <div
            className="text-center font-color-red-500 w-[100px] h-[57px] bg-[rgba(33,32,32,0.8)] p-1 rounded-lg"
            onMouseLeave={handleMouseAlbumLeave}
          >
            <button
              className="hover:bg-[#656262] text-xs m-2 px-3"
              onClick={() => {
                console.log('view album button clicked');
                navigate(`/album/${selectedAlbum.albumName}`);
                setHideAlbumCard(true);
              }}
            >
              View Album
            </button>
          </div>
        </div>
      )}
      {showPlaylistPopup && (
        <SelectPlaylistPopup
          onClose={handleClosePopup}
          selectedSong={selectedSong}
        />
      )}
    </div>
  );
};
