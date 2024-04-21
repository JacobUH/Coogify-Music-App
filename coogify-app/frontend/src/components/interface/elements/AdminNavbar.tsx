import LogoIcon from '/images/Logo.png';
import { AccountDropdown } from './AccountDropdown';
import { Link } from 'react-router-dom';

export const AdminNavbar = () => {
  return (
    <div className=" w-full h-12 px-5 py-14 relative top-0 flex items-center justify-between">
      <Link to="/home">
        <img src={LogoIcon} alt="Logo" className="h-14 cursor-pointer" />
      </Link>
      <div className=" flex items-center justify-center cursor-pointer">
        <AccountDropdown />
      </div>
    </div>
  );
};
