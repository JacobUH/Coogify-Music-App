import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '/images/Back Button.svg';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import Component from '../elements/Dropdown';

// Import the Dropdown component here
const Dropdown = ({ label, children, dismissOnClick = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = () => {
    if (dismissOnClick) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 h-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-y-auto">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {React.Children.map(children, (child) =>
              React.cloneElement(child, {
                onClick: () => {
                  child.props.onClick();
                  handleItemClick();
                },
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ children, onClick }) => {
  return (
    <button
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      onClick={onClick}
      role="menuitem"
    >
      {children}
    </button>
  );
};

interface Music {
  trackID: number;
  artistID: number;
  artistName: string;
  genreID: number;
  genreName: string;
  albumName: string;
  songName: string;
  coverArtURL: string;
  duration: string;
  releaseDate: string;
  songURL: string;
  isPopular: boolean;
  likes: number;
  plays: number;
}

interface Users {
  userID: number;
  email: string;
  userPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  isArtist: boolean;
  isAdmin: boolean;
  dateCreated: string;
}

interface Artist {
  artistID: number;
  userID: number;
  email: string;
  artistName: string;
  firstName: string;
  lastName: string;
}

export const ReportMain = () => {
  const [dataType, setDataType] = useState('Music');
  const [music, setMusic] = useState<Music[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [searchInput, setSearchInput] = useState('');

  const storedToken = localStorage.getItem('sessionToken');

  useEffect(() => {
    const fetchAllMusic = async () => {
      try {
        const response = await axios.get(`${backendBaseUrl}/api/admin/music`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        });
        setMusic(response.data);
      } catch (error) {
        console.error('Error fetching music:', error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`${backendBaseUrl}/api/admin/users`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchAllArtists = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/admin/artists`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response.data);
        setArtists(response.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchAllMusic();
    fetchAllUsers();
    fetchAllArtists();
  }, [storedToken]);

  const filteredMusic = music.filter((track) => {
    const trackID = track.trackID && track.trackID.toString() === searchInput;
    const artistID =
      track.artistID && track.artistID.toString() === searchInput;
    const genreID = track.genreID && track.genreID.toString() === searchInput;
    const releaseDate =
      track.releaseDate && track.releaseDate.toString() === searchInput;
    return (
      trackID ||
      artistID ||
      track.artistName.toLowerCase().includes(searchInput.toLowerCase()) ||
      genreID ||
      track.genreName.toLowerCase().includes(searchInput.toLowerCase()) ||
      track.albumName.toLowerCase().includes(searchInput.toLowerCase()) ||
      track.songName.toLowerCase().includes(searchInput.toLowerCase()) ||
      releaseDate
    );
  });

  const filteredUsers = users.filter((user) => {
    const userID = user.userID && user.userID.toString() === searchInput;
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const dateOfBirth =
      user.dateOfBirth && user.dateOfBirth.includes(searchInput);
    const isArtist = user.isArtist && user.isArtist.toString() === searchInput;
    const isAdmin = user.isAdmin && user.isAdmin.toString() === searchInput;

    return (
      userID ||
      user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
      fullName.includes(searchInput.toLowerCase()) ||
      dateOfBirth ||
      isArtist ||
      isAdmin
    );
  });

  const filteredArtists = artists.filter((artist) => {
    const artistID =
      artist.artistID && artist.artistID.toString() === searchInput;
    const userID = artist.userID && artist.userID.toString() === searchInput;
    return (
      artistID ||
      userID ||
      artist.email.toLowerCase().includes(searchInput.toLowerCase()) ||
      artist.artistName.toLowerCase().includes(searchInput.toLowerCase()) ||
      artist.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
      artist.lastName.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [label, setLabel] = useState('Genre');

  const handleGenreClick = (genre) => {
    setGenreFilter(genre);
    setLabel(genre === '' ? 'All' : genre);
  };

  const genreFilteredMusic = genreFilter
    ? filteredMusic.filter((track) => track.genreName === genreFilter)
    : filteredMusic;

  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const sortedData = filteredMusic.sort((a, b) => {
    if (!sortConfig) {
      return 0;
    }
    const keyA = a[sortConfig.key as string];
    const keyB = b[sortConfig.key as string];
    if (typeof keyA === 'string' && typeof keyB === 'string') {
      if (sortConfig.direction === 'ascending') {
        return keyA.localeCompare(keyB);
      } else {
        return keyB.localeCompare(keyA);
      }
    } else if (typeof keyA === 'number' && typeof keyB === 'number') {
      if (sortConfig.direction === 'ascending') {
        return keyA - keyB;
      } else {
        return keyB - keyA;
      }
    }
    return 0;
  });

  const renderArrow = (name: string) => {
    if (!sortConfig || sortConfig.key !== name) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? (
      <span>&#9660;</span>
    ) : (
      <span>&#9650;</span>
    );
  };

  function truncateString(str, maxLen) {
    return str.length > maxLen ? str.slice(0, maxLen) + '...' : str;
  }

  // TABLE SECTIONS
  const renderTable = () => {
    switch (dataType) {
      case 'Music':
        return (
          <table className=" min-w-full divide-y divide-gray-200 overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className={`px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-[#E1DBDB] ${getClassNamesFor(
                    'trackID'
                  )}`}
                  onClick={() => requestSort('trackID')}
                >
                  <div className="flex flex-row">
                    TrackID
                    {renderArrow('trackID')}
                  </div>
                </th>
                <th
                  className={`px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-[#E1DBDB] ${getClassNamesFor(
                    'artistName'
                  )}`}
                  onClick={() => requestSort('artistName')}
                >
                  <div className="flex flex-row">
                    artistName
                    {renderArrow('artistName')}
                  </div>
                </th>
                <th
                  className={`px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-[#E1DBDB] ${getClassNamesFor(
                    'genreName'
                  )}`}
                  onClick={() => requestSort('genreName')}
                >
                  <div className="flex flex-row">
                    genreName
                    {renderArrow('genreName')}
                  </div>
                </th>
                <th
                  className={`px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-[#E1DBDB] ${getClassNamesFor(
                    'albumName'
                  )}`}
                  onClick={() => requestSort('albumName')}
                >
                  <div className="flex flex-row">
                    albumName
                    {renderArrow('albumName')}
                  </div>
                </th>
                <th
                  className={`px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-[#E1DBDB] ${getClassNamesFor(
                    'songName'
                  )}`}
                  onClick={() => requestSort('songName')}
                >
                  <div className="flex flex-row">
                    songName
                    {renderArrow('songName')}
                  </div>
                </th>
                <th
                  className={`px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-[#E1DBDB] ${getClassNamesFor(
                    'duration'
                  )}`}
                  onClick={() => requestSort('duration')}
                >
                  <div className="flex flex-row">
                    duration
                    {renderArrow('duration')}
                  </div>
                </th>
                <th
                  className={`px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-[#E1DBDB] ${getClassNamesFor(
                    'releaseDate'
                  )}`}
                  onClick={() => requestSort('releaseDate')}
                >
                  <div className="flex flex-row">
                    releaseDate
                    {renderArrow('releaseDate')}
                  </div>
                </th>
                <th
                  className={`px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-[#E1DBDB] ${getClassNamesFor(
                    'likes'
                  )}`}
                  onClick={() => requestSort('likes')}
                >
                  <div className="flex flex-row">
                    likes
                    {renderArrow('likes')}
                  </div>
                </th>
                <th
                  className={`px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-[#E1DBDB] ${getClassNamesFor(
                    'plays'
                  )}`}
                  onClick={() => requestSort('plays')}
                >
                  <div className="flex flex-row">
                    plays
                    {renderArrow('plays')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-black custom-smaller-text">
              {genreFilteredMusic.map((track) => (
                <tr key={track.trackID}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.trackID}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.artistName}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.genreName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {truncateString(track.albumName, 30)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {truncateString(track.songName, 23)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(track.releaseDate).toLocaleDateString('en-US')}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">{track.likes}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{track.plays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'User':
        return (
          <table className="min-w-full divide-y divide-gray-200 text-black custom-smaller-text">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider">
                  userID
                </th>
                <th className="px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider">
                  email
                </th>
                <th className="px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider">
                  userPassword
                </th>
                <th className="px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider">
                  firstName
                </th>
                <th className="px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider">
                  lastName
                </th>
                <th className="px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider">
                  dateOfBirth
                </th>
                <th className="px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider">
                  is_Artist
                </th>
                <th className="px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider">
                  is_Admin
                </th>
                <th className="px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider">
                  date_Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-black">
              {filteredUsers.map((user) => (
                <tr key={user.userID}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.userID}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="truncate w-[150px]">
                      {user.userPassword}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.dateOfBirth
                      ? new Date(user.dateOfBirth).toISOString().split('T')[0]
                      : ''}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isArtist}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isAdmin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.dateOfBirth
                      ? new Date(user.dateCreated).toISOString().split('T')[0]
                      : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Artist':
        return (
          <table className="min-w-full divide-y divide-gray-200 text-black custom-smaller-text">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider">
                  artistID
                </th>
                <th className="px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider">
                  userID
                </th>
                <th className="px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider">
                  email
                </th>
                <th className="px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider">
                  artistName
                </th>
                <th className="px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider">
                  firstName
                </th>
                <th className="px-6 py-3 text-left custom-smaller-text font-medium text-gray-500 uppercase tracking-wider">
                  lastName
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredArtists.map((artist) => (
                <tr key={artist.artistID}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {artist.artistID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {artist.userID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {artist.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {artist.artistName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {artist.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {artist.lastName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  // RENDERING MAIN
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
        <div className="text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Data Reports
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          <div className="w-full flex justify-center">
            <input
              type="text"
              placeholder="Looking for something specific?"
              className="w-full max-w-4xl bg-[#292828] rounded-full text-center px-4 py-3 text-2xl focus:outline-none hover:ring hover:ring-[#9E67E4]"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setDataType('Music')}
              className={`px-4 py-2 rounded-md ${
                dataType === 'Music'
                  ? 'bg-[#9E67E4] text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              Music
            </button>
            <button
              onClick={() => setDataType('User')}
              className={`px-4 py-2 rounded-md ${
                dataType === 'User'
                  ? 'bg-[#9E67E4] text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              User
            </button>
            <button
              onClick={() => setDataType('Artist')}
              className={`px-4 py-2 rounded-md ${
                dataType === 'Artist'
                  ? 'bg-[#9E67E4] text-white'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              Artist
            </button>
          </div>
          {/* DROPDOWNS */}
          {dataType === 'Music' && (
            <div className="flex flex-row space-x-4">
              <Dropdown label="Release Timeframe" dismissOnClick={false}>
                <DropdownItem onClick={() => setDataType('7Days')}>
                  Last 7 Days
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('30Days')}>
                  Last 30 Days
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('6Months')}>
                  Last 6 Months
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('1Year')}>
                  Last 1 Year
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('MoreThanYear')}>
                  More than 1 Year
                </DropdownItem>
              </Dropdown>
              <Dropdown label={label} dismissOnClick={false}>
                <DropdownItem onClick={() => handleGenreClick('')}>
                  All
                </DropdownItem>
                <DropdownItem onClick={() => handleGenreClick('Rock')}>
                  Rock
                </DropdownItem>
                <DropdownItem onClick={() => handleGenreClick('Pop')}>
                  Pop
                </DropdownItem>
                <DropdownItem onClick={() => handleGenreClick('Hip Hop')}>
                  Hip Hop
                </DropdownItem>

                <DropdownItem onClick={() => handleGenreClick('R&B')}>
                  R&B
                </DropdownItem>
                <DropdownItem onClick={() => handleGenreClick('Country')}>
                  Country
                </DropdownItem>
                <DropdownItem onClick={() => handleGenreClick('Electronic')}>
                  Electronic
                </DropdownItem>
                <DropdownItem onClick={() => handleGenreClick('Jazz')}>
                  Jazz
                </DropdownItem>
                <DropdownItem onClick={() => handleGenreClick('Classical')}>
                  Classical
                </DropdownItem>
                <DropdownItem onClick={() => handleGenreClick('Blues')}>
                  Blues
                </DropdownItem>
                <DropdownItem onClick={() => handleGenreClick('Reggae')}>
                  Reggae
                </DropdownItem>
                <DropdownItem onClick={() => handleGenreClick('Metal')}>
                  Metal
                </DropdownItem>
                <DropdownItem onClick={() => handleGenreClick('Indie')}>
                  Indie
                </DropdownItem>
                <DropdownItem onClick={() => handleGenreClick('Folk')}>
                  Folk
                </DropdownItem>
                <DropdownItem onClick={() => handleGenreClick('Alternative')}>
                  Alternative
                </DropdownItem>
                <DropdownItem onClick={() => handleGenreClick('Kpop')}>
                  Kpop
                </DropdownItem>
                <DropdownItem onClick={() => handleGenreClick('Latin')}>
                  Latin
                </DropdownItem>
              </Dropdown>
              <Dropdown label="Likes" dismissOnClick={false}>
                <DropdownItem onClick={() => setLikesRange('LessThan10')}>
                  No Likes
                </DropdownItem>
                <DropdownItem onClick={() => setLikesRange('LessThan10')}>
                  Less Than 10 Likes
                </DropdownItem>
                <DropdownItem onClick={() => setLikesRange('10To50')}>
                  10 - 50 Likes
                </DropdownItem>
                <DropdownItem onClick={() => setLikesRange('50To100')}>
                  50 - 100 Likes
                </DropdownItem>
                <DropdownItem onClick={() => setLikesRange('MoreThan100')}>
                  100+ Likes
                </DropdownItem>
              </Dropdown>
              <Dropdown label="Plays" dismissOnClick={false}>
                <DropdownItem onClick={() => setPlaysRange('NoPlays')}>
                  No Plays
                </DropdownItem>
                <DropdownItem onClick={() => setPlaysRange('LessThan10')}>
                  Less Than 10 Plays
                </DropdownItem>
                <DropdownItem onClick={() => setPlaysRange('10To50')}>
                  10 - 50 Plays
                </DropdownItem>
                <DropdownItem onClick={() => setPlaysRange('50To100')}>
                  50 - 100 Plays
                </DropdownItem>
                <DropdownItem onClick={() => setPlaysRange('MoreThan100')}>
                  100+ Plays
                </DropdownItem>
              </Dropdown>
            </div>
          )}
          {dataType === 'User' && (
            <div className="flex flex-row space-x-4">
              <Dropdown label="Account Created" dismissOnClick={false}>
                <DropdownItem onClick={() => setDataType('Music')}>
                  Music
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('User')}>
                  User
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('Artist')}>
                  Artist
                </DropdownItem>
              </Dropdown>
              <Dropdown label="Genre" dismissOnClick={false}>
                <DropdownItem onClick={() => setDataType('Music')}>
                  Music
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('User')}>
                  User
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('Artist')}>
                  Artist
                </DropdownItem>
              </Dropdown>
              <Dropdown label="Dropdown button" dismissOnClick={false}>
                <DropdownItem onClick={() => setDataType('Music')}>
                  Music
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('User')}>
                  User
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('Artist')}>
                  Artist
                </DropdownItem>
              </Dropdown>
            </div>
          )}
          {dataType === 'Artist' && (
            <div className="flex flex-row space-x-4">
              <Dropdown label="Dropdown button" dismissOnClick={false}>
                <DropdownItem onClick={() => setDataType('Music')}>
                  Music
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('User')}>
                  User
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('Artist')}>
                  Artist
                </DropdownItem>
              </Dropdown>
              <Dropdown label="Genre" dismissOnClick={false}>
                <DropdownItem onClick={() => setDataType('Music')}>
                  Music
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('User')}>
                  User
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('Artist')}>
                  Artist
                </DropdownItem>
              </Dropdown>
              <Dropdown label="Dropdown button" dismissOnClick={false}>
                <DropdownItem onClick={() => setDataType('Music')}>
                  Music
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('User')}>
                  User
                </DropdownItem>
                <DropdownItem onClick={() => setDataType('Artist')}>
                  Artist
                </DropdownItem>
              </Dropdown>
            </div>
          )}
          <div className="  w-full">{renderTable()}</div>
        </div>
      </div>
    </div>
  );
};
