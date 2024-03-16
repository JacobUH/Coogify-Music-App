import ProfileIcon from '../../../public/images/Profile.png';
import LogoIcon from '../../../public/images/Logo.png';

export const Navbar = () => {
  return (
    <div className="w-full h-12 px-5 py-14 relative top-0 pl-[400px] md:flex items-center justify-between z-20 cursor-pointer">
      {/* Logo on the top left */}
      <div>
        <img src={LogoIcon} alt="Logo" className="h-14" />
      </div>

      {/* Profile icon on the top right */}
      <div>
        <div className="flex items-center justify-center cursor-pointer">
          <img src={ProfileIcon} alt="Profile" className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
};
