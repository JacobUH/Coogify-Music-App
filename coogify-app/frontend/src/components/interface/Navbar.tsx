import LogoIcon from '../../../public/images/Logo.png';
import { AccountDropdown } from './AccountDropdown';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className=" w-full h-12 px-5 py-14 relative top-0 pl-[400px] md:flex items-center justify-between">
      {/* Logo on the top left */}
      <Link to="/home">
        <img src={LogoIcon} alt="Logo" className="h-14 cursor-pointer" />
      </Link>

      {/* Profile icon on the top right */}
      <div>
        <div className=" flex items-center justify-center cursor-pointer">
          <AccountDropdown />
        </div>
      </div>
    </div>
  );
};
