import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProfileIcon from '/images/Profile Icon.svg';
import BackButton from '/images/Back Button.svg';
import { useNavigate } from 'react-router-dom';
import backendBaseUrl from '../../../apiConfig';
import { EditScreenPopUp } from '../elements/editScreen';

interface Profile {
  email?: string;
  userPassword?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  profileImage?: string;
  bio?: string;
  isArtist?: number;
  isAdmin?: number;
  artistName?: string;
}


export const ProfileMain = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profile, setProfile] = useState<Profile[]>([]);
  const [originalProfile, setOriginalProfile] = useState<Profile>({});

  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bio, setBio] = useState('');
  const [artistName, setArtistName] = useState('');

  const dateOfBirthHasValue = profile.length > 0 && profile[0].dateOfBirth !== '';
 // Assuming profile[0].dateOfBirth is something like "2001-07-28T05:00:00.000Z"
  const [birthYear, birthMonth, birthDay] = profile.length > 0 && profile[0].dateOfBirth
  ? profile[0].dateOfBirth.split('T')[0].split('-') // Split at 'T' to ignore time, then split the date
  : ['', '', ''];

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  

  const storedToken = localStorage.getItem('sessionToken'); // Assuming you store the token in localStorage

     // Function to handle profile field updates
    const handleInputChange = (field: keyof Profile) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProfile({ ...profile, [field]: event.target.value });
    };

    useEffect(() => {
      const fetchProfile = async () => {
        if (!storedToken) return;
    
        setIsLoading(true);
        try {
          const response = await axios.get(`${backendBaseUrl}/api/profile/fetchProfile`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          });
    
          const profileData = Array.isArray(response.data) ? response.data : [response.data];
          setProfile(profileData);
    
          if (profileData.length > 0 && profileData[0].isArtist) {
            setArtistName(profileData[0].artistName || '');
          }
        } catch (error) {
          console.error('Error fetching profile data: ', error);
        } finally {
          setIsLoading(false);
        }
      };
    
      fetchProfile();
    }, [storedToken, backendBaseUrl]);
    

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfilePic(event.target.files[0]);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };
  
  const [showPopUp, setShowPopUp] = useState(false);

  const handleEdit = () => {
    setShowPopUp(true);
  };

  const handleCloseEdit = () => {
    setShowPopUp(false);
  };
  
  

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5 flex-grow"
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
        <div className="flex-col">
          <div>
        <div className="flex-col text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Profile
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          {/* Work in here */}
          <div className="w-full max-w-6xl mx-auto  rounded-xl p-8 flex flex-col md:flex-row gap-6 items-center">
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
                    name="userFirstName"
                    readOnly
                    disabled
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-sm font-bold">Last Name</label>
                  <input
                    className="bg-[#656262] rounded-[20px] p-2 text-white"
                    type="text"
                    placeholder={profile[0]?.lastName || "Last Name"}
                    value={lastName}
                    name="userLastName"
                    disabled
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
                  name="userEmail"
                  disabled
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold">Password</label>
                <input
                  className="bg-[#656262] rounded-[20px] p-2 text-white"
                  type="password"
                  placeholder={"********"}
                  value={userPassword}
                  name="userPassword"
                  disabled
                />
              </div>
              <div className="flex flex-col mt-4">
                <label className="text-sm font-bold">Profile Bio</label>
                <textarea
                  className="bg-[#656262] rounded-[20px] p-2 text-white  readOnly:text-white input-disabled"
                  placeholder={profile[0]?.bio || "Add a bio"}
                  value={bio}
                  name="userBio"
                  
                  disabled
                  style={{ color: 'white', opacity: 1 }}
                />
              </div>
              <div className="flex flex-row mt-4 gap-4">
                <div className="flex flex-col w-1/3">
                  <label className="text-sm font-bold">Month</label>
                  <input
                    className="bg-[#656262] rounded-[20px] p-2 text-white"
                    type="text"
                    placeholder={profile[0]?.dateOfBirth || "MM"}
                    value={birthMonth}
                    // onChange={(e)=>setDateOfBirth(e.target.value)}
                    name="userBirthMonth"
                    disabled
                    
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <label className="text-sm font-bold">Day</label>
                  <input
                    className="bg-[#656262] rounded-[20px] p-2 text-white"
                    type="text"
                    placeholder={profile[0]?.dateOfBirth || "DD"}
                    value={birthDay}
                    // onChange={(e)=>setDateOfBirth(e.target.value)}
                    name="userBirthDay"
                    disabled
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <label className="text-sm font-bold">Year</label>
                  <input
                    className="bg-[#656262] rounded-[20px] p-2 text-white"
                    type="text"
                    placeholder={profile[0]?.dateOfBirth || "YYYY"}
                    value={birthYear}
                    // onChange={(e)=>setDateOfBirth(e.target.value)}
                    name="userBirthYear"
                    readOnly
                    disabled={dateOfBirthHasValue}
                  />
                </div>
                </div>
                {
                  profile.length > 0 && profile[0].isArtist === 1 && (
                    <div className="flex flex-col mt-4">
                      <label className="text-sm font-bold">Artist Name</label>
                      <input
                        className="bg-[#656262] rounded-[20px] p-2 text-white"
                        type="text"
                        placeholder="Artist Name"
                        value={artistName}
                        disabled
                        // If in edit mode, allow changes to the artist name
                        onChange={isEditMode ? (e) => setArtistName(e.target.value) : undefined}
                      />
                    </div>
                  )
                }
                <div className="text-center mt-6">
                
                {!isEditMode && (
                  <button onClick={handleEdit} className="bg-[#875ABE] hover:bg-[#5f3c8b] rounded-[20px] text-white font-bold py-2 px-20">
                    Edit
                  </button>
                )}
                </div>
                </div>
                {/* Save Button */}
                {isEditMode && (
                  <button onClick={() => setIsEditMode(false)} className="button-class">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {showPopUp && <EditScreenPopUp onClose={handleCloseEdit} />}
      </div>
    </div>
  );
};
