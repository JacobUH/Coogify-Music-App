import React, { useEffect, useState } from 'react';
import BackButton from '/images/Back Button.svg';
import { useNavigate } from 'react-router-dom';
import backendBaseUrl from '../../../apiConfig';
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
}

export const AnalyticsMain = () => {
  const navigate = useNavigate();

  const storedToken = localStorage.getItem('sessionToken');
  const [artistSongs, setArtistSongs] = useState<Song[]>([]);
  const [artistCreds, setArtistCreds] = useState<Artist[]>([]);

  const handleBack = () => {
    navigate(-1);
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

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-hidden">
        <div className="text-left text-4xl font-bold mb-10 mt-[45px] text-[50px] ml-10">
          Analytics
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          {/* Work in here */}
          <div className="flex flex-row space-x-36">
            {artistCreds.length > 0 && (
              <div className="flex flex-col">
                <img
                  className="w-[400px] h-[400px] bg-[#6A6868] rounded-xl"
                  src={''}
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
                    className="flex items-center gap-24 rounded-lg px-14 py-4 text-left mt-3"
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
                <button className="bg-[#9E67E4] w-[250px] px-16 py-2 rounded-md text-lg">
                  Review Music
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
