import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/Sidebar';
import { Navbar } from '../components/interface/Navbar';
import { SubscriptionMain } from '../components/interface/SubscriptionMain';
import { Player } from '../components/interface/Player';
export const Subscription = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <SubscriptionMain />
      <Player />
      <Outlet />
    </div>
  );
};
