import React from 'react';
import { NewMusicRows } from '../musicRows/NewMusicRows';
import { TopMusicRows } from '../musicRows/TopMusicRows';
import { PopMusicRows } from '../musicRows/PopMusicRows';
import { RapMusicRows } from '../musicRows/RapMusicRows';
import { RBMusicRows } from '../musicRows/RBMusicRows';
import { KPopMusicRows } from '../musicRows/KPopMusicRows';
import { LatinMusicRows } from '../musicRows/LatinMusicRows';
import { AlternativeMusicRows } from '../musicRows/AlternativeMusicRows';
import { ClassicalMusicRows } from '../musicRows/ClassicalMusicRows';
import { JazzMusicRows } from '../musicRows/JazzMusicRows';
import { ElectronicMusicRows } from '../musicRows/ElectronicMusicRows';
import { CountryMusicRows } from '../musicRows/CountryMusicRows';
import { RockMusicRows } from '../musicRows/RockMusicRows';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import backendBaseUrl from '../../../apiConfig';
import axios from 'axios';
import { useState } from 'react';

interface User {
  userID: number;
  email: string;
  firstName: string;
  lastName: string;
  isArtist: number;
  isAdmin: number;
  dateCreated: string;
}

export const HomeMain = () => {
  const [userCreds, setUserCreds] = useState<User[]>([]);

  const storedToken = localStorage.getItem('sessionToken');

  useEffect(() => {
    const fetchUserCredentials = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/user/userCredentials`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setUserCreds(response.data);
        //console.log(response.data);
      } catch (err) {
        console.error('Error fetching new songs:', err);
      }
    };
    fetchUserCredentials();
  }, []);

  console.log('outside', userCreds); // Log inside the component

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto">
        <div className="flex flex-col text-[40px] gap-5 px-5 md:py-5 pb-20 pt-5">
          <span>
            Welcome Back
            {userCreds.length > 0 ? ` ${userCreds[0].firstName}` : ''}!
          </span>
          <div className="flex flex-row justify-between items-center overflow-x-auto ml-5">
            <Link to="/likedSongs">
              <button className="bg-[#656262] w-[270px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                Your Liked Music
              </button>
            </Link>
            <Link to="/library">
              <button className="bg-[#656262] w-[270px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                Your Library
              </button>
            </Link>
            {userCreds[0] &&
              userCreds[0].isArtist === 0 &&
              userCreds[0].isAdmin === 0 && (
                <Link to="/subscription">
                  <button className="bg-[#656262] w-[270px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                    Subscription
                  </button>
                </Link>
              )}
            {userCreds[0] &&
              userCreds[0].isArtist === 0 &&
              userCreds[0].isAdmin === 1 && (
                <Link to="/reports">
                  <button className="bg-[#656262] w-[270px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                    Data Reports
                  </button>
                </Link>
              )}
            {userCreds[0] &&
              userCreds[0].isArtist === 1 &&
              userCreds[0].isAdmin === 0 && (
                <Link to="/reports">
                  <button className="bg-[#656262] w-[270px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                    Analytics
                  </button>
                </Link>
              )}

            <Link to="/payment">
              <button className="bg-[#656262] w-[270px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                Payments
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          <div className="w-full flex flex-col gap-8">
            <NewMusicRows title="Newest Songs" />
            <TopMusicRows title="Top Songs" />
            <PopMusicRows title="Pop Pulse" />
            <RapMusicRows title="Rap Mix" />
            <ElectronicMusicRows title="Electronic Beats" />
            <KPopMusicRows title="K-Pop Kicks" />
            <RBMusicRows title="R&B Hits" />
            <AlternativeMusicRows title="Alternative Anthems" />
            <CountryMusicRows title="Country Melodies" />
            <LatinMusicRows title="Latin Vibes" />
            <RockMusicRows title="Rock Jams" />
            <div className="mb-8">
              <ClassicalMusicRows title="Classical Cadence" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
