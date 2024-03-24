import React, { useState } from 'react';

interface Props {
  title: string;
  data: any[];
}

export const NewMusicRows: React.FC<Props> = ({ title, data }: Props) => {
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [hideCard, setHideCard] = useState<boolean>(true);

  const handleSongClick = (
    song: any,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setClickPosition({ x: event.clientX, y: event.clientY });
    setHideCard(false); // Reset the hide flag when a song is clicked
  };

  const handleMouseLeave = () => {
    setHideCard(true); // Hide the card when mouse leaves the song card
  };

  return (
    <div className="w-full flex flex-col md:gap-4 gap-6 px-2">
      <div className="w-full flex items-center justify-between">
        <span className="text-[22px]">{title}</span>
        <a href="#" className="text-[#9E67E4] text-[15px] font-medium">
          See More
        </a>
      </div>
      <div className="w-full flex items-center overflow-x-auto overflow-y-auto md:pb-0 pb-5">
        <div className="flex items-center gap-2">
          {data.map((song: any) => (
            <div
              key={song.title}
              className="flex flex-col items-center gap-[6px] cursor-pointer"
              style={{ minWidth: '200px' }}
              onClick={(e) => handleSongClick(song, e)}
            >
              <div className="bg-[#656262] rounded-lg p-5 bg-center bg-cover relative">
                {song.isPopular ? (
                  <div className="absolute bottom-1 right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                ) : null}
                <img
                  className="w-[140px] h-[140px] rounded-xl"
                  src={song.cover}
                  alt={song.title}
                />
                <div className="pt-2 text-white text-[15px] font-medium whitespace-nowrap">
                  {song.title.length > 20
                    ? `${song.title.slice(0, 17)}...`
                    : song.title}
                </div>
                <div className="pt-1 text-[#BA85FE] text-[13px]">
                  {song.artist}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {clickPosition && !hideCard && (
        <div
          className="absolute"
          style={{ top: clickPosition.y - 10, left: clickPosition.x - 50 }}
        >
          <div
            className="text-center font-color-red-500 w-[100px] h-[150px] bg-[rgba(33,32,32,0.8)] p-1 rounded-lg"
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:bg-[#656262] text-xs m-2 px-3">
              Play Song
            </button>
            <button className="hover:bg-[#656262] text-xs m-2 px-3">
              Like Song
            </button>
            <button className="hover:bg-[#656262] text-xs m-2 px-3">
              Add to Playlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
