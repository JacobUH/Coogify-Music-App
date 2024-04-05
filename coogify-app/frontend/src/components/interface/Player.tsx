import React from 'react';
import { useEffect, useState } from 'react';
import React from 'react';
import cover from '../../../public/images/8.png';
import playButton from '../../../public/images/Play.png';
import pauseButton from '../../../public/images/Pause.png';
import LikeButton from '../../../public/images/LikeIcon.svg';
import LikeButtonActive from '../../../public/images/LikeIconActive.svg';

export const Player = () => {
  const [play, setPlay] = useState(false);
  const isDragging = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 206; // Total Duration in Seconds (3 mins and 26 seconds)

  useEffect(() => {
    let intervalId: any;

    if (play) {
      intervalId = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= totalDuration) {
            clearInterval(intervalId);
            setPlay(false);
            return 0;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [play, totalDuration, isDragging]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const [liked, setLiked] = useState(false); // State to track whether the button is liked or not

  const handleLikeClick = () => {
    setLiked(!liked); // Toggle the liked state
  };

  return (
    <div className="w-full bottom h-20 md:py-[50px] py-2 px-6 flex items-center justify-between z-50">
      <div className="flex items-center gap-4">
        <img src={cover} className="rounded-md w-[65px]" alt="music" />
        <div className="flex flex-row">
          <div className="flex flex-col gap-1">
            <span className="text-[15px] font-medium opacity-85">
              Can I See You Tonight?
            </span>
            <span className="text-[13px] text-[#BA85FE]">Eyedress</span>
          </div>
          <button onClick={handleLikeClick}>
            {liked ? (
              <img
                className="w-[30px] ml-10"
                src={LikeButtonActive}
                alt="LikeButtonActive"
              />
            ) : (
              <img
                className="w-[30px] ml-10"
                src={LikeButton}
                alt="LikeButton"
              />
            )}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 w-full">
          {!play ? (
            <img
              className="w-[27px] h-[27px] cursor-pointer"
              src={playButton}
              alt="Play"
              onClick={() => setPlay(true)}
            />
          ) : (
            <img
              className="w-[27px] h-[27px] cursor-pointer"
              src={pauseButton}
              alt="Pause"
              onClick={() => setPlay(false)}
            />
          )}
          <div className="flex items-center w-full gap-2">
            <span className="text-white text-[14px] font-medium md:block hidden">
              {formatTime(currentTime)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
