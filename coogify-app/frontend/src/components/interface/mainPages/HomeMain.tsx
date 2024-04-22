import React from 'react';
import { MusicRows } from '../musicRows/MusicRows';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import backendBaseUrl from '../../../apiConfig';
import axios from 'axios';
import { useState } from 'react';
import { Notifications } from '../elements/notificationsPopup';

interface User {
  userID: number;
  email: string;
  firstName: string;
  lastName: string;
  isArtist: number;
  isAdmin: number;
  dateCreated: string;
}

interface Song {
  trackID: number;
  songName: string;
  coverArtURL: string;
  songURL: string;
  albumName: string;
  artistName: string;
  isPopular: boolean;
}

export const HomeMain = () => {
  const [userCreds, setUserCreds] = useState<User[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserCredentials = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/user/userCredentials`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
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
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${backendBaseUrl}/api/notifications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Notifications: ', response.data);
      setNotifications(response.data);
      // Store notifications in localStorage
      // localStorage.setItem('notifications', JSON.stringify(response.data));
      setShowNotifications(true);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleDismiss = async () => {
    // Remove notifications from localStorage
    // localStorage.removeItem('notifications');
    const response = await axios.get(
      `${backendBaseUrl}/api/readNotifications`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    setShowNotifications(false);
  };

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      {notifications.length > 0 && showNotifications && (
        <Notifications
          notifications={notifications}
          onDismiss={handleDismiss}
        />
      )}
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto">
        <div className="flex flex-col text-[40px] gap-5 px-5 md:py-5 pb-20 pt-5">
          <span>
            Welcome Back
            {userCreds.length > 0 ? ` ${userCreds[0].firstName}` : ''}!
          </span>
          <div className="flex flex-row justify-between items-center overflow-x-auto ml-5">
            <Link to="/likedSongs">
              <button className="hover:bg-[#9E67E4] bg-[#656262] w-[270px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                Your Liked Music
              </button>
            </Link>
            <Link to="/library">
              <button className="hover:bg-[#9E67E4] bg-[#656262] w-[270px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                Your Library
              </button>
            </Link>
            {userCreds[0] &&
              userCreds[0].isArtist === 0 &&
              userCreds[0].isAdmin === 0 && (
                <Link to="/subscription">
                  <button className="hover:bg-[#9E67E4] bg-[#656262] w-[270px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                    Subscription
                  </button>
                </Link>
              )}
            {userCreds[0] &&
              userCreds[0].isArtist === 0 &&
              userCreds[0].isAdmin === 1 && (
                <Link to="/admin">
                  <button className="hover:bg-[#9E67E4] bg-[#656262] w-[270px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                    Admin Portal
                  </button>
                </Link>
              )}
            {userCreds[0] &&
              userCreds[0].isArtist === 1 &&
              userCreds[0].isAdmin === 0 && (
                <Link to="/analytics">
                  <button className="hover:bg-[#9E67E4] bg-[#656262] w-[270px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                    Analytics
                  </button>
                </Link>
              )}

            <Link to="/payment">
              <button className="hover:bg-[#9E67E4] bg-[#656262] w-[270px] h-[100px] text-2xl rounded-xl mr-10 shadow-md">
                Payments
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          <div className="w-full flex flex-col gap-8">
            <MusicRows
              title="New Songs"
              apiEndpoint="/api/home/fetchNewSongs"
              extendedPage="/newestSongs"
              songGenre=" "
            />
            <MusicRows
              title="Top Songs"
              apiEndpoint="/api/home/fetchTopSongs"
              extendedPage="/topSongs"
              songGenre=" "
            />
            <MusicRows
              title="Pop Pulse"
              apiEndpoint="/api/home/fetchSongs"
              extendedPage="/popSongs"
              songGenre="Pop"
            />
            <MusicRows
              title="Rap Mix"
              apiEndpoint="/api/home/fetchSongs"
              extendedPage="/rapSongs"
              songGenre="Hip Hop"
            />
            <MusicRows
              title="Electronic Beats"
              apiEndpoint="/api/home/fetchSongs"
              extendedPage="/electronicSongs"
              songGenre="Electronic"
            />
            <MusicRows
              title="R&B Hits"
              apiEndpoint="/api/home/fetchSongs"
              extendedPage="/rbSongs"
              songGenre="R&B"
            />
            <MusicRows
              title="K-Pop Kicks"
              apiEndpoint="/api/home/fetchSongs"
              extendedPage="/kpopSongs"
              songGenre="KPop"
            />
            <MusicRows
              title="Alternative Anthems"
              apiEndpoint="/api/home/fetchSongs"
              extendedPage="/alternativeSongs"
              songGenre="Alternative"
            />
            <MusicRows
              title="Jazz Songs"
              apiEndpoint="/api/home/fetchSongs"
              extendedPage="/jazzSongs"
              songGenre="Jazz"
            />
            <MusicRows
              title="Country Melodies"
              apiEndpoint="/api/home/fetchSongs"
              extendedPage="/countrySongs"
              songGenre="Country"
            />
            <MusicRows
              title="Latin Vibes"
              apiEndpoint="/api/home/fetchSongs"
              extendedPage="/latinSongs"
              songGenre="Latin"
            />
            <MusicRows
              title="Classical Cadences"
              apiEndpoint="/api/home/fetchSongs"
              extendedPage="/classicalSongs"
              songGenre="Classical"
            />

            <div className="mb-8">
              <MusicRows
                title="Rock Jams"
                apiEndpoint="/api/home/fetchSongs"
                extendedPage="/rockSongs"
                songGenre="Rock"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
