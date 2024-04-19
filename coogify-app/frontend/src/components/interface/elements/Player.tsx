import React, { useEffect, useRef, useState } from 'react';
import cover from '/images/8.png';
import LikeButton from '/images/LikeIcon.svg';
import LikeButtonActive from '/images/LikeIconActive.svg';
import { Link, useNavigate } from 'react-router-dom';

export const Player = () => {
  const [liked, setLiked] = useState(false);
  const [musicInfo, setMusicInfo] = useState<{
    trackID: number;
    songName: string;
    songURL: string;
    albumName: string;
    artistName: string;
    coverArtURL: string;
  } | null>(null);

  useEffect(() => {
    const storedMusicInfo = localStorage.getItem('selectedSong');
    if (storedMusicInfo) {
      setMusicInfo(JSON.parse(storedMusicInfo));
      console.log('current song: ', storedMusicInfo);
    }

    const interval = setInterval(() => {
      const updatedMusicInfo = localStorage.getItem('selectedSong');
      if (updatedMusicInfo) {
        setMusicInfo(JSON.parse(updatedMusicInfo));
      }
    }, 1000); // Rerender every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [localStorage.getItem('selectedSong')]);

  const navigate = useNavigate();

  return (
    <div className="w-full bottom h-20 md:py-[50px] py-2 px-6 flex items-center justify-between z-50">
      {musicInfo && (
        <div className="flex items-center gap-4">
          <Link
            to={`/album/${musicInfo.albumName}`}
            className="flex items-center gap-4"
          >
            <img
              src={musicInfo.coverArtURL || cover}
              className="rounded-md w-[65px] cursor-pointer"
              alt="music"
            />
            <div className="flex flex-col gap-1">
              <span className="text-[15px] font-medium opacity-85">
                {musicInfo.songName}
              </span>
              <span className="text-[13px] text-[#BA85FE]">
                {musicInfo.artistName}
              </span>
            </div>
          </Link>
        </div>
      )}
      <div className="flex items-center gap-4">
        <audio controls src={musicInfo?.songURL || ''}></audio>
      </div>
    </div>
  );
};
