import React from 'react';
import LogoIcon from '../../../public/images/Logo.png';
import { AccountDropdown } from './AccountDropdown';

export const Navbar = () => {
  return (
    <div className=" w-full h-12 px-5 py-14 relative top-0 pl-[400px] md:flex items-center justify-between">
      {/* Logo on the top left */}
      <div>
        <img src={LogoIcon} alt="Logo" className="h-14 cursor-pointer" />
      </div>

      {/* Profile icon on the top right */}
      <div>
        <div className=" flex items-center justify-center cursor-pointer">
          <AccountDropdown />
        </div>
      </div>
    </div>
  );
};
