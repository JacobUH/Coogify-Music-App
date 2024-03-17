import HomeIcon from '../../../public/images/Home.png';
import SearchIcon from '../../../public/images/Search.png';
import UploadIcon from '../../../public/images/Upload.png';
import LibraryIcon from '../../../public/images/Library.png';
import { savedSongs } from '../../../public/data/songs';

export const Sidebar = () => {
  const sidebarItems = [
    { title: 'Home', icon: HomeIcon },
    { title: 'Search', icon: SearchIcon },
    { title: 'Upload', icon: UploadIcon },
  ];

  return (
    <div className="md:h-screen h-fit md:w-[400px] w-full md:absolute block md:left-0 top-0 p-5 z-30 hide-scrollbar overflow-auto ">
      {' '}
      {/* Added overflow-hidden */}
      <div className="bg-[#3E3C3C] rounded-md overflow-hidden p-4">
        <div className="w-full flex flex-col gap-7">
          {sidebarItems.map((item) => {
            return (
              <div
                key={item.title}
                className="flex item-center gap-3 cursor-pointer"
              >
                <img
                  className="w-[38px] h-[32px]"
                  src={item.icon}
                  alt={item.title}
                />
                <span className="pt-1 font-medium text-white text-[20px]">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="bg-[#3E3C3C] rounded-md overflow-auto py-5 my-5"
        style={{ maxHeight: 'calc(100vh - 330px)' }}
      >
        {' '}
        {/* Added overflow-auto and maxHeight */}
        <div className="w-full flex flex-col gap-7 px-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                className="w-[36px] h-[30px]"
                src={LibraryIcon}
                alt="Library"
              />
              <span className="font-medium text-white text-[20px]">
                Your Library
              </span>
            </div>
          </div>

          {savedSongs.map((song) => {
            return (
              <div
                key={song.id}
                className="w-full flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="rounded-md w-[60px]"
                  />
                  <div className="flex flex-col justify-center items-start">
                    <span className="font-medium text-white text-[16px]">
                      {song.title}
                    </span>
                    <span className="font-medium text-[#9E67E4] text-[14px]">
                      {song.artist}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
