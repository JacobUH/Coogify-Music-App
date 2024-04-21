import React, { useEffect, useState } from 'react';
import BackButton from '/images/Back Button.svg';
import { useNavigate } from 'react-router-dom';
import backendBaseUrl from '../../../apiConfig';
import DefeaultPlaylist from '../../../../public/images/DefaultPlaylist.svg';
import axios from 'axios';

interface Artist {
  artistID: number;
  artistName: string;
  totalLikes: number;
  totalPlays: number;
}

interface Song {
  trackID: number;
  songName: string;
  songURL: string;
  albumName: string;
  coverArtURL: string;
  duration: string;
  likes: number;
  plays: number;
  songStatus: string;
}

interface Album {
  albumName: string;
  coverArtURL: string;
  artistName: string;
  trackID: string;
}

interface Table {
  albumName: string;
  songName: string;
  genreName: string;
  releaseDate: string;
  plays: number;
  likes: number;
  totalPlaylists: number;
}

export const AnalyticsMain = () => {
  const navigate = useNavigate();

  const storedToken = localStorage.getItem('sessionToken');
  const [artistSongs, setArtistSongs] = useState<Song[]>([]);
  const [artistCreds, setArtistCreds] = useState<Artist[]>([]);
  const [artistTable, setArtistTable] = useState<Table[]>([]);

  const handleBack = () => {
    navigate('/home');
  };

  useEffect(() => {
    const fetchArtistCredentials = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/artist/artistCredentials`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setArtistCreds(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error getting artist credentials:', err);
      }
    };
    fetchArtistCredentials();
  }, []);

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/artist/artistTopSongs`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        //console.log(response.data);
        setArtistSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchTopSongs();
  }, []);

  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = async () => {
    console.log(
      'Request data:',
      JSON.stringify({
        albumName: albumName,
        songName: songName,
        genreName: genre,
        status: status,
        minPlays: minPlayCount,
        maxPlays: maxPlayCount,
        minLikes: minLikeCount,
        maxLikes: maxLikeCount,
        releaseStart: releaseStart,
        releaseEnd: releaseEnd,
      })
    );
    try {
      const response = await axios.post(
        `${backendBaseUrl}/api/artist/artistReport`,
        {
          albumName: albumName,
          songName: songName,
          genreName: genre,
          status: status,
          minPlays: minPlayCount,
          maxPlays: maxPlayCount,
          minLikes: minLikeCount,
          maxLikes: maxLikeCount,
          releaseStart: releaseStart,
          releaseEnd: releaseEnd,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      setArtistTable(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const [albumName, setAlbumName] = useState('');
  const [songName, setSongName] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState('');
  const [maxPlayCount, setMaxPlayCount] = useState('');
  const [minPlayCount, setMinPlayCount] = useState('');
  const [minLikeCount, setMinLikeCount] = useState('');
  const [maxLikeCount, setMaxLikeCount] = useState('');
  const [releaseStart, setReleaseStart] = useState('');
  const [releaseEnd, setReleaseEnd] = useState('');

  const [artistAlbums, setArtistAlbums] = useState<Album[]>([]);

  // API CALL TO FETCH ARTIST ALBUMS
  useEffect(() => {
    const fetchArtistAlbums = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/artist/artistAllAlbums`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('artist albums: ', response.data);
        setArtistAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };
    fetchArtistAlbums();
  }, []);

  const [artistSongsFromAlbum, setArtistSongsFromAlbum] = useState<Song[]>([]);
  // API CALL TO FETCH ARTIST SONGS BASED ON ALBUM
  useEffect(() => {
    const fetchArtistSongs = async () => {
      try {
        const response = await axios.post(
          `${backendBaseUrl}/api/artist/artistSongsFromAlbum`,
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
        console.log('artist songs: ', response.data);
        setArtistSongsFromAlbum(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };
    fetchArtistSongs();
  }, [albumName]);

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-x-hidden relative">
        <div className="absolute top-10 left-10">
          <img
            src={BackButton}
            alt="Back"
            onClick={handleBack}
            className="cursor-pointer"
          />
        </div>
        <div className="text-left text-4xl font-bold mb-10 mt-[45px] text-[50px] ml-28">
          Analytics
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh+480px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          {/* Work in here */}
          <div className="flex flex-row space-x-36">
            {artistCreds.length > 0 && (
              <div className="flex flex-col">
                <img
                  className="w-[400px] h-[400px] bg-[#6A6868] rounded-xl"
                  src={DefeaultPlaylist || ''}
                  alt="artist image"
                ></img>
                <div className="flex flex-row text-left text-xl mt-10">
                  <span className="mr-12">
                    {artistCreds[0].totalPlays} Total Listens
                  </span>
                  <span className="mr-12">
                    {artistCreds[0].totalLikes} Total Likes
                  </span>
                </div>
                <span className="text-6xl font-extrabold mt-8">
                  {artistCreds[0].artistName}
                </span>
              </div>
            )}
            <div className="flex flex-col text-center flex-grow">
              {' '}
              {/* Added flex-grow here */}
              <span className="font-extrabold text-3xl">Popular</span>
              <div className="flex flex-col flex-grow">
                {' '}
                {/* Added flex-grow here */}
                {artistSongs.map((song, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-24 rounded-lg px-14 py-4 text-left mt-3 hover:bg-[#656262] cursor-pointer"
                    onClick={() => {
                      navigate(`/album/${song.albumName}`);
                    }}
                  >
                    <div className="text-md font-bold flex-grow">
                      <div className="items-center flex flex-row flex-grow">
                        <img
                          className="w-[50px] h-[50px] rounded-md"
                          src={song.coverArtURL}
                          alt="Cover art"
                        />
                        <div className="text-lg ml-5">{song.songName}</div>
                      </div>
                    </div>
                    <div className="text-md">{song.plays} Plays</div>
                    <div className="text-md">{song.duration}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-3">
                <button
                  className="bg-[#9E67E4] w-[250px] px-16 py-2 rounded-md text-lg"
                  onClick={() => {
                    navigate('/artistAlbum');
                  }}
                >
                  Review Music
                </button>
              </div>
            </div>
          </div>
          <div className="text-left text-4xl font-bold mb-10 mt-32 text-[50px]">
            Song Activity Report
          </div>
          <div className="flex flex-row">
            <div className="grid grid-cols-4 gap-16 text-center justify-evenly">
              <div className="flex flex-col text-left text-sm justify-evenly">
                <div className="text-xs">Album Name</div>
                <select
                  className="bg-white text-black h-12 w-60 font-bold py-2 px-4 rounded"
                  onChange={(e) => setAlbumName(e.target.value)}
                >
                  <option
                    value=""
                    selected
                    hidden
                    disabled
                    className="text-[#979797] text-left"
                  >
                    Select an album
                  </option>
                  <option value="">Any</option>
                  {artistAlbums.map((album) => (
                    <option key={album.albumName}>{album.albumName}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col text-left text-xs justify-evenly">
                Song Name
                <select
                  className="bg-white text-black h-12 w-60 font-bold py-2 px-4 rounded"
                  onChange={(e) => setSongName(e.target.value)}
                >
                  <option
                    value=""
                    hidden
                    disabled
                    selected
                    className="text-[#979797] text-left"
                  >
                    Select a song
                  </option>
                  <option value="">Any</option>
                  {artistSongsFromAlbum.map((song) => (
                    <option key={song.trackID} value={song.songName}>
                      {song.songName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col text-left text-sm justify-evenly">
                <div className="text-xs">Genre</div>
                <select
                  className="bg-white text-black h-12 w-60 font-bold py-2 px-4 rounded"
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option
                    value=""
                    selected
                    className="text-[#979797] text-left"
                  >
                    Select a genre
                  </option>
                  <option value="">Any</option>
                  <option value="Rock">Rock</option>
                  <option value="Pop">Pop</option>
                  <option value="Hip Hop">Hip Hop</option>
                  <option value="R&B">R&B</option>
                  <option value="Country">Country</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Jazz">Jazz</option>
                  <option value="Classical">Classical</option>
                  <option value="Blues">Blues</option>
                  <option value="Reggae">Reggae</option>
                  <option value="Metal">Metal</option>
                  <option value="Indie">Indie</option>
                  <option value="Folk">Folk</option>
                  <option value="Alternative">Alternative</option>
                  <option value="Kpop">Kpop</option>
                  <option value="Latin">Latin</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col text-left text-sm justify-evenly">
                <div className="text-xs">Status</div>
                <select
                  className="bg-white text-black h-12 w-60 font-bold py-2 px-4 rounded"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option
                    value=""
                    selected
                    className="text-[#979797] text-left"
                  >
                    Select a status
                  </option>
                  <option value="">Any</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="grid grid-cols-4 gap-16 text-center justify-evenly">
              <div className="flex flex-col text-left text-xs justify-evenly">
                Min Play Count
                <input
                  type="text"
                  placeholder="Enter min count"
                  className="bg-white text-black text-sm h-12 w-60 font-bold py-3 px-4 rounded"
                  value={minPlayCount}
                  onChange={(e) => setMinPlayCount(e.target.value)}
                />
              </div>
              <div className="flex flex-col text-left text-xs justify-evenly">
                Max Play Count
                <input
                  type="text"
                  placeholder="Enter max count"
                  className="bg-white text-black text-sm h-12 w-60 font-bold py-3 px-4 rounded"
                  value={maxPlayCount}
                  onChange={(e) => setMaxPlayCount(e.target.value)}
                />
              </div>
              <div className="flex flex-col text-left text-xs justify-evenly">
                Min Like Count
                <input
                  type="text"
                  placeholder="Enter min count"
                  className="bg-white text-black text-sm h-12 w-60 font-bold py-3 px-4 rounded"
                  value={minLikeCount}
                  onChange={(e) => setMinLikeCount(e.target.value)}
                />
              </div>
              <div className="flex flex-col text-left text-xs justify-evenly">
                Max Like Count
                <input
                  type="text"
                  placeholder="Enter max count"
                  className="bg-white text-black text-sm h-12 w-60 font-bold py-3 px-4 rounded"
                  value={maxLikeCount}
                  onChange={(e) => setMaxLikeCount(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            {/* DATES */}
            <div className="grid grid-cols-4 gap-4 text-center ">
              <div className="flex flex-col text-left text-xs ">
                Release Period
                <input
                  type="date"
                  placeholder="Enter start date"
                  className="bg-white text-black text-sm h-12 w-60 font-bold py-3 px-4 rounded"
                  value={releaseStart}
                  onChange={(e) => setReleaseStart(e.target.value)}
                />
              </div>
              <div className="flex flex-col text-left text-xs justify-evenly ml-2 mr-7 relative">
                Release Period
                <input
                  type="date"
                  placeholder="Enter start date"
                  className="bg-white text-black text-sm h-12 w-60 font-bold py-3 px-4 rounded"
                  value={releaseEnd}
                  onChange={(e) => setReleaseEnd(e.target.value)}
                />
              </div>
              <div className="absolute right-20 flex text-center text-xs justify-evenly col-span-2 mt-5">
                <button
                  className="bg-[#9E67E4] text-white text-sm h-12 w-full font-bold py-2 px-52 rounded"
                  onClick={handleGenerate}
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          <div className="px-0.5 mt-12">
            <table className="border-collapse border-2 w-full table-fixed">
              {/* All 6 columns here */}
              <thead className="text-[#a4a4a4] bg-[#ffffff]">
                <tr>
                  <th className="border-black py-3 px-2 ">ALBUMNAME</th>
                  <th className="border-black py-3 px-2 ">SONGNAME</th>
                  <th className="border-black py-3 px-2 ">GENRE</th>
                  <th className="border-black py-3 px-1 ">PLAYS</th>
                  <th className="border-black py-3 px-1 ">LIKES</th>
                  <th className="border-black py-3 px-2 ">
                    TOTAL PLAYLISTS WITH SONG
                  </th>
                  <th className="border-black py-3 px-2 ">DATE RELEASED</th>
                </tr>
              </thead>
              {/* Row 1 */}
              <tbody className="text-black text-center">
                {artistTable.map((tuple: Table) => (
                  <tr key={tuple.songName}>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.albumName}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.songName}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.genreName}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.plays}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.likes}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {tuple.totalPlaylists}
                    </td>
                    <td className="border-black bg-[#F1F3F4] py-3 px-6">
                      {new Date(tuple.releaseDate).toLocaleDateString('en-US')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
