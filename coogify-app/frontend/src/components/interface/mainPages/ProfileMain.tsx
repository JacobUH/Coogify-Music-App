import React from 'react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProfileIcon from '/images/Profile Icon.svg';
import BackButton from '/images/Back Button.svg';
import { useNavigate } from 'react-router-dom';
import backendBaseUrl from '../../../apiConfig';

interface Profile {
  userEmail: string;
  userPassword: string;
  userFirstName: string;
  userLastName: string;
  userBirthDay: string;
  userBirthMonth: string;
  userBirthYear: string;
  userProfileImage: string;
  userBio: string;
}


export const ProfileMain = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profile, setProfile] = useState<Profile>({
    userEmail: '',
    userPassword: '',
    userFirstName: '',
    userLastName: '',
    userBirthDay: '',
    userBirthMonth: '',
    userBirthYear: '',
    userProfileImage: '',
    userBio: '',
  });

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
        const data = response.data;
        const { year, month, day } = data.userdateOfBirth
          ? {
              year: data.userdateOfBirth.split('-')[0],
              month: data.userdateOfBirth.split('-')[1],
              day: data.userdateOfBirth.split('-')[2],
            }
          : { year: '', month: '', day: '' };
  
        setProfile({
          ...data,
          userBirthDay: day,
          userBirthMonth: month,
          userBirthYear: year,
          // Assuming the API does not return these keys and you are transforming them here
        });
      } catch (error) {
        console.error('Error fetching profile data: ', error);
      }
    };
    handleRetrieve();
  }, [storedToken]); 

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfilePic(event.target.files[0]);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                    placeholder="First Name"
                    value={profile.userFirstName}
                    onChange={handleInputChange}
                    name="userFirstName"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-sm font-bold">Last Name</label>
                  <input
                    className="bg-[#656262] rounded-[20px] p-2 text-white"
                    type="text"
                    placeholder="Last Name"
                    value={profile.userLastName}
                    onChange={handleInputChange}
                    name="userLastName"
                  />
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold">Email Address</label>
                <input
                  className="bg-[#656262] rounded-[20px] p-2 text-white"
                  type="email"
                  placeholder="email@domain.com"
                  value={profile.userEmail}
                  onChange={handleInputChange}
                  name="userEmail"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold">Password</label>
                <input
                  className="bg-[#656262] rounded-[20px] p-2 text-white"
                  type="password"
                  placeholder="********"
                  value={profile.userPassword}
                  onChange={handleInputChange}
                  name="userPassword"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold">Profile Bio</label>
                <textarea
                  className="bg-[#656262] rounded-[20px] p-2 text-white"
                  placeholder="Add a bio"
                  value={profile.userBio}
                  onChange={handleInputChange}
                  name="userBio"
                />
              </div>
              <div className="flex flex-row mt-4 gap-4">
                <div className="flex flex-col w-1/3">
                  <label className="text-sm font-bold">Month</label>
                  <input
                    className="bg-[#656262] rounded-[20px] p-2 text-white"
                    type="text"
                    placeholder="MM"
                    value={profile.userBirthMonth}
                    onChange={handleInputChange}
                    name="userBirthMonth"
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <label className="text-sm font-bold">Day</label>
                  <input
                    className="bg-[#656262] rounded-[20px] p-2 text-white"
                    type="text"
                    placeholder="DD"
                    value={profile.userBirthDay}
                    onChange={handleInputChange}
                    name="userBirthDay"

                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <label className="text-sm font-bold">Year</label>
                  <input
                    className="bg-[#656262] rounded-[20px] p-2 text-white"
                    type="text"
                    placeholder="YYYY"
                    value={profile.userBirthYear}
                    onChange={handleInputChange}
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
