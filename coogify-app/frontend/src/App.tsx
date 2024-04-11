import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Setup } from './pages/Setup';
import { ArtistSetup } from './pages/artistSetup';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { AlbumPage } from './pages/AlbumPage';
import { Upload } from './pages/Upload';
import { Library } from './pages/Library';
import { Profile } from './pages/Profile';
import { Subscription } from './pages/Subscription';
import { Payment } from './pages/Payment';
import { Report } from './pages/Reports';
import { LikedSongs } from './pages/LikedSongs';
import { NewestSongs } from './pages/NewestSongs';
import { TopSongs } from './pages/TopSongs';
import { RapSongs } from './pages/RapSongs';
import { RBSongs } from './pages/RBSongs';
import React from 'react';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/artistSetup" element={<ArtistSetup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/album/:albumName" element={<AlbumPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/likedSongs" element={<LikedSongs />} />
          <Route path="/newestSongs" element={<NewestSongs />} />
          <Route path="/topSongs" element={<TopSongs />} />
          <Route path="/rapSongs" element={<RapSongs />} />
          <Route path="/rbSongs" element={<RBSongs />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
