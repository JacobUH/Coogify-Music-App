import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import Logo from '/images/Logo.svg';

interface Notification {
  notificationID: number;
  timeCreated: string;
  message: string;
  trackID: number | null;
}

const storedToken = localStorage.getItem('sessionToken');

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
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
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleDismiss = () => {
    // Close the notifications popup or handle dismiss logic here
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-60"></div>
        <div className="md:ml-[400px] bg-[#3E3C3C] text-white rounded-lg px-14 pt-8 pb-14 shadow-md z-50 flex flex-col items-center">
          <img
            className="w-[35px] h-[35px] mb-8"
            src={Logo}
            alt="coogify logo"
          />
          <p className="text-4xl mb-10">Notifications</p>
          <div className="flex flex-col items-center">
            {notifications.map((notification, index) => (
              <div key={index} className="mb-4">
                <p>{notification.message}</p>
              </div>
            ))}
          </div>
          <button
            className="bg-[#656262] hover:bg-[#9E67E4] text-white font-bold mt-4 py-2 px-10 rounded"
            onClick={handleDismiss}
          >
            Dismiss
          </button>
        </div>
      </div>
    </>
  );
};
