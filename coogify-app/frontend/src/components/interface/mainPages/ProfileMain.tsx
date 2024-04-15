import React from 'react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProfileIcon from '/images/Profile Icon.svg';
import BackButton from '/images/Back Button.svg';
import { useNavigate } from 'react-router-dom';
import backendBaseUrl from '../../../apiConfig';

interface Profile {
  email: string;
  userPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  profileImage: string;
  bio: string;
}


export const ProfileMain = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profile, setProfile] = useState<Profile[]>([]);

  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bio, setBio] = useState('');

  const storedToken = localStorage.getItem('sessionToken'); // Assuming you store the token in localStorage

  useEffect(() => {
    const handleRetrieve = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/profile/fetchProfile`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
    
        setProfile(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching profile data: ', error);
      }
    };
    handleRetrieve();
  }, []); 

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfilePic(event.target.files[0]);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto relative">
        <div className="absolute top-10 left-10">
          <img
            src={BackButton}
            alt="Back"
            onClick={handleBack}
            className="cursor-pointer"
          />
        </div>
        <div className="flex-col text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Profile
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          {/* Work in here */}
          <div className="w-full max-w-4xl mx-auto  rounded-xl p-8 flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <label className="w-[250px] h-[250px] bg-[#656262] rounded-lg flex justify-center items-center cursor-pointer mb-4">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg, image/jpg, image/png, image/svg+xml"
                    onChange={handleProfilePicChange}
                  />
                  <div>Profile Picture</div>
                </label>

            {/* Profile Form */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-row mt-4 gap-4">
                <div className="flex flex-col w-full">
                  <label className="text-sm font-bold">First Name</label>
                  <input
                    className="bg-[#656262] rounded-[20px] p-2 text-white"
                    type="text"
                    placeholder={profile[0]?.firstName || "First Name"}
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                    name="userFirstName"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-sm font-bold">Last Name</label>
                  <input
                    className="bg-[#656262] rounded-[20px] p-2 text-white"
                    type="text"
                    placeholder={profile[0]?.lastName || "Last Name"}
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                    name="userLastName"
                  />
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold">Email Address</label>
                <input
                  className="bg-[#656262] rounded-[20px] p-2 text-white"
                  type="email"
                  placeholder={profile[0]?.email || "example@domain.com"}
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  name="userEmail"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold">Password</label>
                <input
                  className="bg-[#656262] rounded-[20px] p-2 text-white"
                  type="password"
                  placeholder={profile[0]?.userPassword || "********"}
                  value={userPassword}
                    onChange={(e)=>setUserPassword(e.target.value)}
                  name="userPassword"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold">Profile Bio</label>
                <textarea
                  className="bg-[#656262] rounded-[20px] p-2 text-white"
                  placeholder={profile[0]?.bio || "Add a bio"}
                  value={bio}
                    onChange={(e)=>setBio(e.target.value)}
                  name="userBio"
                />
              </div>
              <div className="flex flex-row mt-4 gap-4">
                <div className="flex flex-col w-1/3">
                  <label className="text-sm font-bold">Month</label>
                  <input
                    className="bg-[#656262] rounded-[20px] p-2 text-white"
                    type="text"
                    placeholder={profile[0]?.dateOfBirth || "MM"}
                    value={dateOfBirth}
                    onChange={(e)=>setDateOfBirth(e.target.value)}
                    name="userBirthMonth"
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <label className="text-sm font-bold">Day</label>
                  <input
                    className="bg-[#656262] rounded-[20px] p-2 text-white"
                    type="text"
                    placeholder={profile[0]?.dateOfBirth || "DD"}
                    value={dateOfBirth}
                    onChange={(e)=>setDateOfBirth(e.target.value)}
                    name="userBirthDay"

                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <label className="text-sm font-bold">Year</label>
                  <input
                    className="bg-[#656262] rounded-[20px] p-2 text-white"
                    type="text"
                    placeholder={profile[0]?.dateOfBirth || "YYYY"}
                    value={dateOfBirth}
                    onChange={(e)=>setDateOfBirth(e.target.value)}
                    name="userBirthYear"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
