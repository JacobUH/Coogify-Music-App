import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import { Link } from 'react-router-dom';

interface Song {
  trackID: number;
  songName: string;
  coverArtURL: string;
  songURL: string;
  albumName: string;
  artistName: string;
  isPopular: boolean;
}

interface Props {
  title: string;
}

export const AlternativeMusicRows = ({ title }: Props) => {
  const [AlternativeSongs, setAlternativeSongs] = useState<Song[]>([]);
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

  const handleMouseLeave = () => {
    setHideCard(true); // Hide the card when mouse leaves the song card
  };

  const storedToken = localStorage.getItem('sessionToken');

  useEffect(() => {
    // Fetch data from backend API for rap songs
    const fetchAlternativeSongs = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/home/fetchAlternativeSongs`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setAlternativeSongs(response.data);
      } catch (error) {
        console.error('Error fetching alternative songs:', error);
      }
    };

    fetchAlternativeSongs();
  }, []);

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

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="w-full flex flex-col md:gap-4 gap-6 px-2">
      <div className="w-full flex items-center justify-between">
        <span className="text-[22px]">{title}</span>
        <Link to="/AlternativeSongs" className="text-[#9E67E4] text-[15px] font-medium">
          See More
        </Link>
      </div>
      <div className="w-full flex items-center overflow-x-auto overflow-y-auto md:pb-0 pb-5">
        <div className="flex items-center gap-2">
          {AlternativeSongs.map((song: Song) => {
            return (
              <div
                key={song.songName}
                className="flex flex-col items-center gap-[6px] cursor-pointer"
                style={{ minWidth: '200px' }} // Adjust the minimum width of each song item
                onClick={(e) => handleSongClick(song, e)}
              >
                <div className=" bg-[#656262] rounded-lg p-5 bg-center bg-cover">
                  <img
                    className="w-[140px] h-[140px] rounded-xl"
                    src={song.coverArtURL}
                    alt={song.songName}
                  />
                  <div className="pt-2 text-white text-[15px] font-medium whitespace-nowrap">
                    {song.songName.length > 20
                      ? song.songName.slice(0, 17) + '...'
                      : song.songName}
                  </div>
                  <div className="pt-1 text-[#BA85FE] text-[13px]">
                    {song.artistName}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {selectedSong && clickPosition && !hideCard && (
        <div
          className="absolute"
          style={{ top: clickPosition.y - 10, left: clickPosition.x - 50 }}
        >
          <div
            className="text-center font-color-red-500 w-[100px] h-[150px] bg-[rgba(33,32,32,0.8)] p-1 rounded-lg"
            onMouseLeave={handleMouseLeave}
          >
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
                handleLikeSong();
                setHideCard(true);
                refreshPage();
              }}
            >
              Like Song
            </button>
            <button
              className="hover:bg-[#656262] text-xs m-2  px-3"
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
