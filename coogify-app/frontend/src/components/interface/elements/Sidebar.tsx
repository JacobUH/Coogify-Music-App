import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

interface Song {
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
  }, []);

  return (
    <div
      className="md:h-screen h-fit md:w-[400px] z-30 w-full md:absolute block md:left-0 top-0 p-5 hide-scrollbar overflow-clip  "
      style={{ maxHeight: 'calc(100vh - 89px)' }}
    >
      {/* Sidebar Icons on top */}
      <div className="bg-[#3E3C3C] rounded-md overflow-hidden p-4">
        <div className="w-full flex flex-col gap-7">
          {sidebarItems.map((item) => (
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
          ))}
        </div>
      </div>

      {/* Scrollable Sidebar */}
      <div
        className="bg-[#3E3C3C] rounded-md overflow-auto py-5 my-5"
        style={{ maxHeight: 'calc(100vh - 330px)' }}
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
          {likedSongs.map((song: Song) => {
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
          style={{ top: clickPosition.y, left: clickPosition.x - 50 }}
        >
          <div
            className="flex flex-row text-center font-color-red-500 bg-[rgba(33,32,32,0.8)] p-1 rounded-lg"
            onMouseLeave={handleSongMouseLeave}
          >
            <button
              className="hover:bg-[#656262] text-xs m-2 p-1"
              onClick={() => {
                console.log('play button clicked');
                setHideCard(true);
              }}
            >
              Play Song
            </button>
            <button
              className="hover:bg-[#656262] text-xs m-2 p-1"
              onClick={() => {
                console.log('add to playlist button clicked');
                setHideCard(true);
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
