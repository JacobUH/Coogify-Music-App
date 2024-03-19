import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/Sidebar';
import { Navbar } from '../components/interface/Navbar';
import { HomeMain } from '../components/interface/HomeMain';
import { Player } from '../components/interface/Player';

export const Home = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <HomeMain />
      <Player />
      <Outlet />
    </div>
  );
};
