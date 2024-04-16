import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';

interface handleCloseEdit {
  onClose: () => void; // Specify the type of onClose prop
}

interface Profile {
    email?: string;
    userPassword?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    profileImage?: string;
    bio?: string;
    artistName?: string;
    isArtist?: number;
  }
  

export const EditScreenPopUp: React.FC<handleCloseEdit> = ({
  onClose,
}) => {
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

    const [reload, setReload] = useState(0);
  
    const dateOfBirthHasValue = profile.length > 0 && profile[0].dateOfBirth !== '';
   // Assuming profile[0].dateOfBirth is something like "2001-07-28T05:00:00.000Z"
    const [birthYear, birthMonth, birthDay] = profile.length > 0 && profile[0].dateOfBirth
    ? profile[0].dateOfBirth.split('T')[0].split('-') // Split at 'T' to ignore time, then split the date
    : ['', '', ''];
  
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);  
    
  
    const storedToken = localStorage.getItem('sessionToken'); // Assuming you store the token in localStorage

    function refreshPage() {
        window.location.reload();
      }
    
  
      useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${backendBaseUrl}/api/profile/fetchProfile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
                        'Content-Type': 'application/json',
                    },
                });
                // Assuming the response data structure includes the user's profile data directly
                if (response.data) {
                    setProfile([response.data]); // Ensure this is an array if your state expects it
                    setOriginalProfile(response.data);
                    console.log("response:", response.data);
    
                    // Only handle the artistName setup here if the response actually includes the isArtist flag
                    if (response.data.isArtist) {
                        setArtistName(response.data.artistName || '');
                    }
                }
            } catch (error) {
                console.error('Error fetching profile data: ', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchProfile();
    }, [reload, storedToken, backendBaseUrl]);
    
  
  
    const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setProfilePic(event.target.files[0]);
      }
    };
  
    const handleBack = () => {
      navigate(-1);
    };

     // Updates profile state with only changed values
     const handleSave = async () => {
        setIsLoading(true);
      
        // Create an object with the updates
        const updates = {
            email: email ? email : originalProfile.email,
            userPassword: userPassword ? userPassword : originalProfile.userPassword,
            firstName: firstName ? firstName : originalProfile.firstName,
            lastName: lastName ? lastName : originalProfile.lastName,
            bio: bio ? bio : originalProfile.bio,
            ...(profile[0].isArtist === 1 && { artistName: artistName }),
            // ... add other fields similarly
          };
          

          const filteredUpdates = Object.entries(updates).reduce((acc, [key, val]) => {
            if (val !== undefined) {
              acc[key] = val;
            }
            return acc;
          }, {});

        console.log(updates);
        // Check if there are changes
        if (Object.keys(updates).length === 0) {
          console.error('No changes detected.');
          setIsLoading(false);
          return;
        }
      
        // Proceed with the API call to update the profile
        try {
          const response = await axios.post(`${backendBaseUrl}/api/profile/updateProfile`, updates, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
              'Content-Type': 'application/json',
            },
          });
      
        
            // Update local state to reflect changes
            setOriginalProfile(prev => ({ ...prev, ...updates }));
            setIsEditMode(false);
            setReload(prev => prev + 1);
            refreshPage();
          
        } catch (error) {
          console.error('Error updating profile data: ', error.response || error);
        } finally {
          setIsLoading(false);
        }
      };
  
    const handleNo = () => {
      onClose();
    };
  
    return (
      <>
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-60"></div>
          {/* Increased z-index to 60 */}
          <div className="md:ml-[400px] bg-[#3E3C3C] text-white rounded-lg p-5 w-[1100px] h-[700px] shadow-md z-50 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-5">
              <span className="text-[22px]">Edit Profile</span>
            </div>
            <div className="w-full max-w-6xl mx-auto  rounded-xl flex flex-col md:flex-row gap-6 items-center">
            {/* Profile Image */}
            <label className="w-[250px] h-[250px] bg-[#656262] rounded-lg flex justify-center items-center cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg, image/jpg, image/png, image/svg+xml"
                    onChange={handleProfilePicChange}
                  />
                  <div>Profile Picture</div>
                </label>

            {/* Profile Form */}
            <div className="flex flex-col gap-4 w-full flex-grow">
              <div className="flex flex-row gap-4">
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
                  placeholder={"********"}
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
                    value={birthMonth}
                    // onChange={(e)=>setDateOfBirth(e.target.value)}
                    name="userBirthMonth"
                    readOnly
                    disabled={dateOfBirthHasValue}
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
                    readOnly
                    disabled={dateOfBirthHasValue}
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
                {/* Conditional artistName input field */}
                
              </div>
              {profile[0] && profile[0].isArtist === 1 && (
                  <div className="flex flex-col mt-4">
                    <label className="text-sm font-bold">Artist Name</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white"
                      type="text"
                      placeholder="Artist Name"
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                    />
                  </div>
                )}
            </div>
          </div>
            <div className="w-full flex items-center justify-between mt-10">
              <div
                className="bg-[#212020] hover:bg-[#5e5c5c] text-white font-bold py-2 px-4 rounded cursor-pointer"
                onClick={handleNo}
              >
                Cancel
              </div>
              <div
                className="bg-[#683f9c] hover:bg-[#9E67E4] text-white font-bold py-2 px-4 rounded cursor-pointer"
                onClick={handleSave}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };