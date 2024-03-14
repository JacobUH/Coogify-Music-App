import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Home } from '../components/Home';
import { Player } from '../components/Player';

export const Layout = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <Home />
      <Outlet />
      <Player />
    </div>
  );
};
