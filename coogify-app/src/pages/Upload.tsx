import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/Sidebar';
import { Navbar } from '../components/interface/Navbar';
import { Player } from '../components/interface/Player';
import MainUpload from '../components/interface/MainUpload';

export const Upload = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <MainUpload />
      <Player />
      <Outlet />
    </div>
  );
};
