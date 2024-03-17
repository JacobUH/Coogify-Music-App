import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '../../../public/images/HomeIcon.svg';
import HomeIconHover from '../../../public/images/HomeIconHover.svg';
import SearchIcon from '../../../public/images/SearchIcon.svg';
import SearchIconHover from '../../../public/images/SearchIconHover.svg';
import UploadIcon from '../../../public/images/UploadIcon.svg';
import UploadIconHover from '../../../public/images/UploadIconHover.svg';
import LibraryIcon from '../../../public/images/LibraryIcon.svg';
import LibraryIconHover from '../../../public/images/LibraryIconHover.svg';
import { savedSongs } from '../../../public/data/songs';

export const Sidebar = () => {
  const location = useLocation();
  const [sidebarItems, setSidebarItems] = useState([
    {
      title: 'Home',
      icon: HomeIcon,
      hoverIcon: HomeIconHover,
      link: '/home',
      isHovered: false,
    },
    {
      title: 'Search',
      icon: SearchIcon,
      hoverIcon: SearchIconHover,
      link: '/search',
      isHovered: false,
    },
    {
      title: 'Upload',
      icon: UploadIcon,
      hoverIcon: UploadIconHover,
      link: '/upload',
      isHovered: false,
    },
  ]);
  const [isLibraryHovered, setLibraryHovered] = useState(false); // State for Library hover

  useEffect(() => {
    const updatedItems = sidebarItems.map((item) => ({
      ...item,
      isHovered: item.link === location.pathname,
    }));
    setSidebarItems(updatedItems);
    // Set Library hover state
    setLibraryHovered(location.pathname === '/library');
  }, [location.pathname, sidebarItems]);

  const handleMouseEnter = (title: string) => {
    const updatedItems = sidebarItems.map((item) =>
      item.title === title ? { ...item, isHovered: true } : item
    );
    setSidebarItems(updatedItems);
  };

  const handleMouseLeave = (title: string) => {
    const updatedItems = sidebarItems.map((item) =>
      item.title === title ? { ...item, isHovered: false } : item
    );
    setSidebarItems(updatedItems);
  };

  return (
    <div className="md:h-screen h-fit md:w-[400px] w-full md:absolute block md:left-0 top-0 p-5 z-30 hide-scrollbar overflow-auto ">
      <div className="bg-[#3E3C3C] rounded-md overflow-hidden p-4">
        <div className="w-full flex flex-col gap-7">
          {sidebarItems.map((item) => (
            <Link to={item.link} key={item.title}>
              <div
                className={`flex item-center gap-3 cursor-pointer ${
                  item.isHovered ? 'text-[#9E67E4]' : ''
                }`}
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={() => handleMouseLeave(item.title)}
              >
                <img
                  className="w-[38px] h-[32px]"
                  src={item.isHovered ? item.hoverIcon : item.icon}
                  alt={item.title}
                />
                <span className="pt-1 font-medium text-[20px]">
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div
        className="bg-[#3E3C3C] rounded-md overflow-auto py-5 my-5"
        style={{ maxHeight: 'calc(100vh - 330px)' }}
      >
        <div className="w-full flex flex-col gap-7 px-4">
          <div className="w-full flex items-center justify-between">
            <Link to="/library">
              <div
                className={`flex items-center gap-3 cursor-pointer ${
                  isLibraryHovered ? 'text-[#9E67E4]' : ''
                }`}
                onMouseEnter={() => setLibraryHovered(true)}
                onMouseLeave={() => setLibraryHovered(false)}
              >
                <img
                  className="w-[36px] h-[30px]"
                  src={isLibraryHovered ? LibraryIconHover : LibraryIcon}
                  alt="Library"
                />
                <span className="font-medium text-[20px]">Your Library</span>
              </div>
            </Link>
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
