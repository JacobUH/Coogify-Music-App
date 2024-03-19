import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../public/images/Logo.svg';
import { Footer } from '../components/setup/Footer';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form data
    if (email && password) {
      // Form is valid, navigate to setup page
      window.location.href = '/home'; // Alternatively, use useHistory() from react-router-dom for programmatic navigation
    } else {
      // Form is not valid, display error message or handle accordingly
      console.error('Please fill out all required fields');
    }
  };

  return (
    <div className="w-full h-full absolute inset-0 bg-gradient-to-tr from-[#9E67E4] via-transparent to-[#212121] text-white overflow-hidden p-6">
      <Link to="/">
        <img src={Logo} alt="Coogify Logo" className="mx-auto pb-20 w-[70px]" />
      </Link>
      <h1 className="text-4xl text-white text-center mb-5 mt-20">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#3E3C3C] p-6 rounded-lg shadow-md md:w-[700px] mx-auto "
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#656262] rounded-[15px] px-3 py-5 focus:outline-none focus:border-purple-500"
            required
            title="Please enter an email."
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#656262] rounded-[15px] px-3 py-5 focus:outline-none focus:border-purple-500"
            required
            title="Please enter a password."
          />
        </div>
        {/* Use a regular button for form submission */}
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white text-2xl rounded-[15px] px-8 py-2 mt-16 block mx-auto"
        >
          Login
        </button>
      </form>
      <Link to="/signup">
        <h1 className="text-[#B67DFF] hover:text-[white] text-center underline pt-5">
          I Don't Have an Account
        </h1>
      </Link>
      <div className="pt-36">
        <Footer />
      </div>
    </div>
  );
};
