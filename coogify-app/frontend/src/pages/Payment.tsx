import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/interface/Sidebar';
import { Navbar } from '../components/interface/Navbar';
import { PaymentMain } from '../components/interface/PaymentMain';
import { Player } from '../components/interface/Player';
export const Payment = () => {
  return (
    <div className="w-full h-full text-white relative">
      <Navbar />
      <Sidebar />
      <PaymentMain />
      <Player />
      <Outlet />
    </div>
  );
};
