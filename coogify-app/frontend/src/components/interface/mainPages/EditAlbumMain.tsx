import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProfileIcon from '/images/Profile Icon.svg';
import BackButton from '/images/Back Button.svg';
import { ConfirmCancelScreen } from '../elements/ConfirmCancelScreen';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import { ChangeSong } from '../elements/ChangeSong';

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

export const EditAlbumMain = () => {
  const [songs, setSongs] = useState<Music[]>([]);
  const [selectedSong, setSelectedSong] = useState<Music | null>(
    songs.length > 0 ? songs[0] : null
  );
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [hideCard, setHideCard] = useState<boolean>(true);
  const [error, setError] = useState({ message: '', className: '' });

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/artistAlbum');
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

  // FETCH ALBUM INFO
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

  const [newAlbumName, setNewAlbumName] = useState(
    songs.length > 0 ? songs[0].albumName : ''
  );

  const handleInputClick = () => {
    const inputDiv = document.getElementById('albumName');
    inputDiv?.focus();
  };

  const currentAlbumName = songs.length > 0 ? songs[0].albumName : '';

  const handleInputChange = (e) => {
    const newInput = e.target.textContent.trim(); // Get the trimmed text content of the input
    const currentAlbumName = songs[0].albumName || ''; // Get the current album name, ensuring it's not undefined

    // Only update newAlbumName if there's a difference between the new input and the current album name
    if (newInput !== currentAlbumName) {
      setNewAlbumName(newInput); // Update newAlbumName only if it's different from the current album name
    }
  };

  // UPDATE ALBUM NAME CALL
  const updateAlbumName = async () => {
    if (newAlbumName.trim() !== '') {
      try {
        const response = await axios.post(
          `${backendBaseUrl}/api/update/updateAlbumName`,
          {
            newAlbumName: newAlbumName,
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
        setError({
          message: 'Album Name updated successfully',
          className: 'text-[#9E67E4]',
        });
        // Wait for 2 seconds before calling refreshPage()
        setTimeout(() => {
          navigate(`/album/edit/${newAlbumName}`);
        }, 2000);
      } catch (error) {
        console.error('Error fetching album songs:', error);
        setError({
          message: 'Album Name did not update.',
          className: 'text-red-500',
        });
      }
    } else if (newAlbumName.trim() === currentAlbumName) {
      setError({
        message: 'No Changes Found.',
        className: 'text-red-500',
      });
    } else {
      setError({
        message: 'No Changes Found or Empty Input.',
        className: 'text-red-500',
      });
    }
  };

  function refreshPage() {
    window.location.reload();
  }
  const [showEditScreen, setShowEditScreen] = useState(false);

  const handleEditSong = () => {
    setShowEditScreen(true);
  };

  const [showDeleteScreen, setShowDeleteScreen] = useState(false);

  const handleDeleteSong = () => {
    setShowDeleteScreen(true);
  };

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
                  <div
                    id="albumName"
                    className="p-2 w-full font-black border-none outline-none cursor-text relative animate-flash"
                    contentEditable={true}
                    onBlur={handleInputChange}
                    onClick={handleInputClick}
                    onFocus={handleInputClick}
                    suppressContentEditableWarning={true} // Suppress the warning about contentEditable
                  >
                    {songs[0].albumName}
                  </div>
                  {error && (
                    <div className={`error ${error.className} text-lg mb-4`}>
                      {error.message}
                    </div>
                  )}
                </div>
                <button
                  className="hover:bg-[#BA85FE] bg-[#6A6868] px-2 py-1 rounded-md"
                  onClick={updateAlbumName}
                >
                  Submit New Album Name
                </button>
                <div className="text-2xl mt-3 text-[#BA85FE]">
                  {songs[0].artistName}
                </div>
                <div className="text-xl mt-1 text-[#BA85FE]">
                  {songs.length} {songs.length === 1 ? 'song' : 'songs'}
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

              <div className="text-md text-gray-400 mr-16">Likes</div>

              <div className="text-md text-gray-400">Duration</div>
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
                <div className="text-md text-gray-400 mr-24">{song.likes}</div>
                <div className="text-md text-gray-400">
                  {formatDuration(song.duration)}
                </div>
              </div>
            ))}
          </div>
        </div>
        {songs && clickPosition && !hideCard && (
          <div
            className="absolute"
            style={{ top: clickPosition.y - 100, left: clickPosition.x - 5 }}
          >
            <div
              className="text-center font-color-red-500 w-[100px] h-[54px] bg-[rgba(33,32,32,0.8)] p-1 rounded-lg"
              onMouseLeave={handleMouseLeave}
            >
              {/* <button
                className="hover:bg-[#656262] text-xs m-2  px-3"
                onClick={() => {
                  console.log('edit song button clicked');
                  handleEditSong();
                  setHideCard(true);
                }}
              >
                Edit Song
              </button> */}
              <button
                className="hover:bg-[#656262] text-xs m-2  px-3"
                onClick={() => {
                  console.log('delete song button clicked');
                  handleDeleteSong();
                  setHideCard(true);
                }}
              >
                Delete Song
              </button>
            </div>
          </div>
        )}
        {showEditScreen && (
          <ChangeSong
            onClose={() => setShowEditScreen(false)}
            selectedSong={selectedSong}
          />
        )}
        {showDeleteScreen && (
          <ConfirmCancelScreen
            onClose={() => setShowDeleteScreen(false)}
            condition="deleteSong"
            selectedSong={selectedSong}
            selectedAlbum={null}
          />
        )}
      </div>
    </div>
  );
};
