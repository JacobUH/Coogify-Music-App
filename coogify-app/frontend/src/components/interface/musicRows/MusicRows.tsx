import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SongContextMenu from '../elements/SongContextMenu';
import backendBaseUrl from '../../../apiConfig';

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
  apiEndpoint: string;
  extendedPage: string;
  songGenre: string;
}

export const MusicRows = ({
  title,
  apiEndpoint,
  extendedPage,
  songGenre,
}: Props) => {
  const [songs, setSongs] = useState<Song[]>([]);
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

  useEffect(() => {
    console.log('sending genre: ', songGenre);
    const fetchSongs = async () => {
      try {
        const response = await axios.post(
          `${backendBaseUrl}${apiEndpoint}`,
          {
            genre: songGenre,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, [apiEndpoint, songGenre]);

  //   const handleLikeSong = async () => {
  //     if (selectedSong) {
  //       try {
  //         await axios.post(
  //           `${backendBaseUrl}/api/song/likeSong`,
  //           {
  //             trackID: selectedSong.trackID,
  //             sessionToken: localStorage.getItem('sessionToken'),
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
  //               'Content-Type': 'application/json',
  //             },
  //           }
  //         );
  //         console.log('Song liked successfully');
  //         setHideCard(true);
  //         window.location.reload();
  //       } catch (error) {
  //         console.error('Error liking the song:', error);
  //       }
  //     }
  //   };

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="w-full flex flex-col md:gap-4 gap-6 px-2">
      <div className="w-full flex items-center justify-between">
        <span className="text-[22px]">{title}</span>
        <Link
          to={extendedPage}
          className="text-[#9E67E4] text-[15px] font-medium"
        >
          See More
        </Link>
      </div>
      <div className="w-full flex items-center overflow-x-auto overflow-y-auto md:pb-0 pb-5">
        <div className="flex items-center gap-2">
          {songs.map((song: Song) => (
            <div
              key={song.songName}
              className="flex flex-col items-center gap-[6px] cursor-pointer"
              style={{ minWidth: '200px' }}
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
                    ? `${song.songName.slice(0, 17)}...`
                    : song.songName}
                </div>
                <div className="pt-1 text-[#BA85FE] text-[13px]">
                  {song.artistName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedSong && clickPosition && !hideCard && (
        <SongContextMenu
          selectedSong={selectedSong}
          clickPosition={clickPosition}
          hideCard={hideCard}
          setHideCard={setHideCard}
        />
      )}
    </div>
  );
};
