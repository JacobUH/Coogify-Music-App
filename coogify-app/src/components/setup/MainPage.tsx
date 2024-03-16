import titleLogo from '../../../public/images/Title.svg';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';

interface MainPageProps {
  className?: string; // Declare className prop
}

export const MainPage: React.FC<MainPageProps> = ({ className }) => {
  return (
    <div
      className={`main-page ${className} md:w-[1000px] h-screen flex flex-col justify-between`}
    >
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="text-center">
          <img src={titleLogo} alt="Your Logo" className="mb-4" />
          <div className="space-x-16 pt-10 items-center">
            <Link to="/login">
              <button className="bg-transparent bg-opacity-50 hover:bg-[#786194] border-2 border-white text-white text-xl px-12 py-2 rounded-lg">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-[#9E67E4] hover:bg-[#7d52b5] text-white text-xl px-12 py-2 rounded-lg">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
