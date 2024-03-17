import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/Sidebar';
import { Navbar } from '../components/interface/Navbar';
import { Player } from '../components/interface/Player';
import { UploadMain } from '../components/interface/UploadMain';

export const Upload = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <UploadMain />
      <Player />
      <Outlet />
    </div>
  );
};
