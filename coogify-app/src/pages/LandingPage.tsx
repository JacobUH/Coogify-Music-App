import { Outlet } from 'react-router-dom';
import AlbumBar from '../components/setup/AlbumBar';
import { MainPage } from '../components/setup/MainPage';

export const LandingPage = () => {
  return (
    <div className="w-full h-full inset-0 bg-gradient-to-tr from-[#9E67E4] via-transparent to-[#212121] text-white overflow-hidden">
      <div className="flex justify-center items-center h-full relative z-10">
        <MainPage className="md:ml-64" />
        <AlbumBar />
        <Outlet />
      </div>
    </div>
  );
};
