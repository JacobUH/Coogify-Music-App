import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Setup } from './pages/Setup';
import { Signup } from './pages/Signup';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Upload } from './pages/Upload';
import { Library } from './pages/Library';
import { Profile } from './pages/Profile';
import { Subscription } from './pages/Subscription';
import { Payment } from './pages/Payment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/library" element={<Library />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
