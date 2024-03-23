import {
  newSongs,
  topSongs,
  rapSongs,
  rbSongs,
} from '../../../public/data/songs';
import { MusicRows } from './MusicRows';

export const HomeMain = () => {
  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto">
        <div className="text-[40px] gap-5 px-5 md:py-5 pb-20 pt-5">
          <span>Welcome Back!</span>
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          <div className="w-full flex flex-col gap-8">
            <MusicRows title="Newest Songs" />
            <MusicRows title="Top Songs" />
            <MusicRows title="Rap Mix" />
            <div className="mb-8">
              <MusicRows title="Smooth R&B" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
