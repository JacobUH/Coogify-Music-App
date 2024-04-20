import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '/images/HomeIcon.svg';
import HomeIconHover from '/images/HomeIconHover.svg';
import SearchIcon from '/images/SearchIcon.svg';
import SearchIconHover from '/images/SearchIconHover.svg';
import UploadIcon from '/images/UploadIcon.svg';
import UploadIconHover from '/images/UploadIconHover.svg';
import LibraryIcon from '/images/LibraryIcon.svg';
import LibraryIconHover from '/images/LibraryIconHover.svg';
import backendBaseUrl from '../../../apiConfig';
import axios from 'axios';
import { SelectPlaylistPopup } from './selectPlaylistPopup';

interface User {
  userID: number;
  email: string;
  firstName: string;
  lastName: string;
  isArtist: number;
  isAdmin: number;
  dateCreated: string;
}

interface Song {
  trackID: number;
  songName: string;
  coverArtURL: string;
  songURL: string;
  albumName: string;
  artistName: string;
  isPopular: boolean;
}

export const Sidebar = () => {
  const location = useLocation();
  const [sidebarItems, setSidebarItems] = useState([
    {
      title: 'Home',
      icon: HomeIcon,
      hoverIcon: HomeIconHover,
      link: '/home',
      isHovered: false,
    },
    {
      title: 'Search',
      icon: SearchIcon,
      hoverIcon: SearchIconHover,
      link: '/search',
      isHovered: false,
    },
    {
      title: 'Upload',
      icon: UploadIcon,
      hoverIcon: UploadIconHover,
      link: '/upload',
      isHovered: false,
    },
  ]);

  const [currentHoveredItem, setCurrentHoveredItem] = useState<string | null>(
    null
  );

  useEffect(() => {
    const updatedItems = sidebarItems.map((item) => ({
      ...item,
      isHovered:
        item.link === currentHoveredItem || item.link === location.pathname,
    }));
    setSidebarItems(updatedItems);
  }, [location.pathname, currentHoveredItem]);

  const handleMouseEnter = (title: string) => {
    setCurrentHoveredItem(title);
  };

  const handleMouseLeave = () => {
    setCurrentHoveredItem(null);
  };

  // song card feature
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
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

  const handleSongMouseLeave = () => {
    setHideCard(true); // Hide the card when mouse leaves the song card
  };

  const storedToken = localStorage.getItem('sessionToken');

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

  useEffect(() => {
    const fetchUserLikedSongs = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/home/fetchUserLikedSongs`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        //console.log(response.data);
        setLikedSongs(response.data);
      } catch (error) {
        console.error('Error fetching new songs:', error);
      }
    };

    fetchUserLikedSongs();
    //}, [handleUnlikeSong, handleLikeSong]);
  }, []);

  const [userCreds, setUserCreds] = useState<User[]>([]);

  useEffect(() => {
    const fetchUserCredentials = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/user/userCredentials`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setUserCreds(response.data);
        //localStorage.setItem('artist?', response.data[0].isArtist);
        //localStorage.setItem('artist?', response.data[0].isArtist);

        // Check if userCreds meet the conditions to hide the "Upload" sidebar item
        if (
          response.data.length > 0 &&
          response.data[0].isArtist === 0 &&
          response.data[0].isAdmin === 0
        ) {
          // Filter out the "Upload" item from the sidebarItems array
          setSidebarItems((prevItems) =>
            prevItems.filter((item) => item.title !== 'Upload')
          );
        }

        //console.log(response.data);
      } catch (err) {
        console.error('Error fetching new songs:', err);
      }
    };
    fetchUserCredentials();
  }, []);

  const [showPlaylistPopup, setShowPlaylistPopup] = useState(false);
  const handleAddSong = () => {
    setShowPlaylistPopup(true);
  };

  const handleClosePopup = () => {
    setShowPlaylistPopup(false);
  };

  const userStyles = {
    maxHeight: 'calc(100vh - 267px)',
  };

  const artistStyles = {
    // Add your special styles here
    maxHeight: 'calc(100vh - 330px)',
  };

  const navigate = useNavigate();

  return (
    <div
      className="md:h-screen h-fit md:w-[400px] z-30 w-full md:absolute block md:left-0 top-0 p-5 hide-scrollbar overflow-clip  "
      style={{ maxHeight: 'calc(100vh - 89px)' }}
    >
      {/* Sidebar Icons on top */}
      <div className="bg-[#3E3C3C] rounded-md overflow-hidden p-4">
        <div className="w-full flex flex-col gap-7">
          {sidebarItems.map(
            (item) =>
              // Only render the sidebar item if it should be displayed
              (item.title !== 'Upload' ||
                !(
                  userCreds.length > 0 &&
                  userCreds[0].isArtist === 0 &&
                  userCreds[0].isAdmin === 0
                )) && (
                <Link to={item.link} key={item.title}>
                  <div
                    className={`flex item-center gap-3 cursor-pointer ${
                      item.isHovered ? 'text-[#9E67E4]' : ''
                    }`}
                    onMouseEnter={() => handleMouseEnter(item.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      className="w-[38px] h-[32px]"
                      src={item.isHovered ? item.hoverIcon : item.icon}
                      alt={item.title}
                    />
                    <span className="pt-1 font-medium text-[20px]">
                      {item.title}
                    </span>
                  </div>
                </Link>
              )
          )}
        </div>
      </div>

      {/* Scrollable Sidebar */}

      <div
        className="bg-[#3E3C3C] md:h-[calc(100vh-140px)] rounded-md overflow-auto py-5 my-5"
        style={{
          ...userStyles,
          ...(userCreds.length > 0 &&
          userCreds[0].isArtist === 1 &&
          userCreds[0].isAdmin === 0
            ? artistStyles
            : {}),
        }}
      >
        <div className="w-full flex flex-col gap-7 px-4">
          {/* Library Icon */}
          <div className="w-full flex items-center justify-between">
            <Link to="/library">
              <div
                className={`flex items-center gap-3 cursor-pointer ${
                  currentHoveredItem === 'Your Library' ||
                  location.pathname === '/library'
                    ? 'text-[#9E67E4]'
                    : ''
                }`}
                onMouseEnter={() => setCurrentHoveredItem('Your Library')}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  className="w-[36px] h-[30px]"
                  src={
                    currentHoveredItem === 'Your Library' ||
                    location.pathname === '/library'
                      ? LibraryIconHover
                      : LibraryIcon
                  }
                  alt="Library"
                />
                <span className="font-medium text-[20px]">Your Library</span>
              </div>
            </Link>
          </div>
          {/* Every Song Icon */}
          {likedSongs
            .slice()
            .reverse()
            .map((song: Song) => {
              return (
                <div
                  key={song.songName}
                  className="w-full flex items-center justify-between cursor-pointer hover:bg-[#494646]"
                  onClick={(e) => handleSongClick(song, e)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={song.coverArtURL}
                      alt={song.songName}
                      className="rounded-md w-[60px]"
                    />
                    <div className="flex flex-col justify-center items-start">
                      <span className="font-medium text-white text-[16px]">
                        {song.songName}
                      </span>
                      <span className="font-medium text-[#9E67E4] text-[14px]">
                        {song.artistName}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {selectedSong && clickPosition && !hideCard && (
        <div
          className="absolute z-60"
          style={{ top: clickPosition.y - 195, left: clickPosition.x - 5 }}
        >
          <div
            className="text-center font-color-red-500 w-[100px] h-[200px] bg-[rgba(33,32,32,0.8)] p-1 rounded-lg"
            onMouseLeave={handleSongMouseLeave}
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
              className="hover:bg-[#656262] text-xs m-2  px-3"
              onClick={() => {
                console.log('play button clicked');
                setHideCard(true);
              }}
            >
              Play Song
            </button>
            <button
              className="hover:bg-[#656262] text-xs m-2  px-3"
              onClick={() => {
                console.log('like button clicked');
                handleUnlikeSong();
                setHideCard(true);
              }}
            >
              Unlike Song
            </button>
            <button
              className="hover:bg-[#656262] text-xs m-2  px-3"
              onClick={() => {
                console.log('add to playlist button clicked');
                handleAddSong();
                setHideCard(true);
              }}
            >
              Add to Playlist
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
