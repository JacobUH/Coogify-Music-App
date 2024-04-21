import React from 'react';
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
import { Playlist } from './pages/Playlist';
import { Profile } from './pages/Profile';
import { Subscription } from './pages/Subscription';
import { Payment } from './pages/Payment';
import { Report } from './pages/Reports';
import { LikedSongs } from './pages/LikedSongs';
import { NewestSongs } from './pages/NewestSongs';
import { TopSongs } from './pages/TopSongs';
import { RapSongs } from './pages/RapSongs';
import { RBSongs } from './pages/RBSongs';
import { PopSongs } from './pages/PopSongs';
import { KPopSongs } from './pages/KPopSongs';
import { LatinSongs } from './pages/LatinSongs';
import { AlternativeSongs } from './pages/AlternativeSongs';
import { ClassicalSongs } from './pages/ClassicalSongs';
import { JazzSongs } from './pages/JazzSongs';
import { ElectronicSongs } from './pages/ElectronicSongs';
import { CountrySongs } from './pages/CountrySongs';
import { HipHopSongs } from './pages/HipHopSongs';
import { RockSongs } from './pages/RockSongs';
import { AddCard } from './pages/AddCard';
import { PrevTransactions } from './pages/PrevTransactions';
import { Analytics } from './pages/Analytics';
import { ArtistAlbum } from './pages/ArtistAlbum';
import { EditAlbumPage } from './pages/EditAlbum';
import { AdminLogin } from './pages/AdminLogin';
import { Admin } from './pages/Admin';
import { AdminCreate } from './pages/AdminCreate';
import { AdminSetup } from './pages/AdminSetup';
import { AdminUserReport } from './pages/AdminUserReport';
import { AdminFinanceReport } from './pages/AdminFinanceReport';
import { AdminEditAccount } from './pages/AdminEditAccount';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminCreate" element={<AdminCreate />} />
          <Route path="/adminSetup" element={<AdminSetup />} />
          <Route path="/editAccount" element={<AdminEditAccount />} />
          <Route path="/userReport" element={<AdminUserReport />} />
          <Route path="/financialReport" element={<AdminFinanceReport />} />
          {/*<Route path="/adminLogin" element={<AdminLogin />} />*/}
          <Route path="/signup" element={<Signup />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/artistSetup" element={<ArtistSetup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/album/:albumName" element={<AlbumPage />} />
          <Route path="/album/edit/:albumName" element={<EditAlbumPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/library" element={<Library />} />
          <Route path="/playlist/:playlistName" element={<Playlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/likedSongs" element={<LikedSongs />} />
          <Route path="/newestSongs" element={<NewestSongs />} />
          <Route path="/topSongs" element={<TopSongs />} />
          <Route path="/rapSongs" element={<RapSongs />} />
          <Route path="/rbSongs" element={<RBSongs />} />
          <Route path="/popSongs" element={<PopSongs />} />
          <Route path="/kpopSongs" element={<KPopSongs />} />
          <Route path="/LatinSongs" element={<LatinSongs />} />
          <Route path="/alternativeSongs" element={<AlternativeSongs />} />
          <Route path="/classicalSongs" element={<ClassicalSongs />} />
          <Route path="/jazzSongs" element={<JazzSongs />} />
          <Route path="/electronicSongs" element={<ElectronicSongs />} />
          <Route path="/countrySongs" element={<CountrySongs />} />
          <Route path="/rockSongs" element={<RockSongs />} />
          <Route path="/AddCard" element={<AddCard />} />
          <Route path="/PrevTransactions" element={<PrevTransactions />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/artistAlbum" element={<ArtistAlbum />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
