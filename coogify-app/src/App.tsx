import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Setup } from './pages/Setup';
import { Signup } from './pages/Signup';
import { Upload } from './pages/Upload';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Upload" element={<Upload />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
