import React from 'react';
import Logo from '/images/Logo.svg';
import { useNavigate } from 'react-router-dom';

interface Notification {
  notificationID: number;
  timeCreated: string;
  message: string;
  trackID: number | null;
}

interface NotificationsProps {
  notifications: Notification[];
  onDismiss: () => void;
}

export const Notifications: React.FC<NotificationsProps> = ({
  notifications,
  onDismiss,
}) => {
  const navigate = useNavigate();
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
          <div className="flex flex-row space-x-10">
            <button
              className="bg-[#656262] hover:bg-[#8e8d8d] text-white font-bold mt-4 py-2 px-10 rounded"
              onClick={onDismiss}
            >
              Dismiss
            </button>
            <button
              className="bg-[#7549ae] hover:bg-[#9E67E4] text-white font-bold mt-4 py-2 px-10 rounded"
              onClick={() => navigate('/subscription')}
            >
              Check It Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
