import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';

interface Music {
  trackID: number;
  artistID: number;
  genreID: number;
  albumName: string;
  songName: string;
  coverArtURL: string;
  duration: string;
  releaseDate: string;
  songURL: string;
  isPopular: boolean;
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
}

interface Artist {
  artistID: number;
  userID: number;
  artistName: string;
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
      genreID ||
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
      artist.artistName.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  const renderTable = () => {
    switch (dataType) {
      case 'Music':
        return (
          <table className=" min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  trackID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  artistID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  genreID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  albumName
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  songName
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  releaseDate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-black">
              {filteredMusic.map((track) => (
                <tr key={track.trackID}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.trackID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.artistID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.genreID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.albumName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.songName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {track.releaseDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'User':
        return (
          <table className="min-w-full divide-y divide-gray-200 text-black">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  userID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  userPassword
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  firstName
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  lastName
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  dateOfBirth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  is_Artist
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  is_Admin
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
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Artist':
        return (
          <table className="min-w-full divide-y divide-gray-200 text-black">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  artistID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  userID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  artistName
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
                    {artist.artistName}
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

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto">
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
          {renderTable()}
        </div>
      </div>
    </div>
  );
};
