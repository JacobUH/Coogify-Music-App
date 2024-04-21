import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import BackButton from '/images/Back Button.svg';
import { ConfirmCancelScreen } from '../elements/ConfirmCancelScreen';

interface Album {
  albumName: string;
  coverArtURL: string;
  artistName: string;
  trackID: string;
}

interface Artist {
  artistID: number;
  artistName: string;
  totalLikes: number;
  totalPlays: number;
}
export const ArtistAlbumMain = () => {
  // USESTATES
  const [artistAlbums, setArtistAlbums] = useState<Album[]>([]);
  const [artistCreds, setArtistCreds] = useState<Artist[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [hideCard, setHideCard] = useState<boolean>(true);

  // FUNCTIONS
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('sessionToken');

  const handleBack = () => {
    navigate('/analytics');
  };
  const handleAlbumClick = (
    album: Album,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setSelectedAlbum(album);
    setClickPosition({ x: event.clientX, y: event.clientY });

    setHideCard(false);
  };

  useEffect(() => {
    const fetchArtistCredentials = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/artist/artistCredentials`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setArtistCreds(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error getting artist credentials:', err);
      }
    };
    fetchArtistCredentials();
  }, []);

  // API CALL TO FETCH ALBUMS
  useEffect(() => {
    const fetchArtistAlbums = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/artist/artistAlbums`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(response.data);
        setArtistAlbums(response.data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };
    fetchArtistAlbums();
  }, []);

  const handleMouseLeave = () => {
    setHideCard(true); // Hide the card when mouse leaves the song card
  };

  const [showDeleteScreen, setShowDeleteScreen] = useState(false);

  const handleDeleteAlbum = () => {
    setShowDeleteScreen(true);
  };

  const handleAddMusicBack = async () => {
    try {
      const response = await axios.get(
        `${backendBaseUrl}/api/artist/addDeletedMusic`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto">
        <div className="ml-10 mt-10 z-10">
          <img
            src={BackButton}
            alt="Back"
            onClick={handleBack}
            className="cursor-pointer"
          />
        </div>

        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          {/* Work in here */}
          <div className="w-full flex items-center">
            <div className="flex-col overflow-y-auto">
              <div className="flex-col pl-[30px] mb-10 ">
                {artistCreds[0] && ( // Check if artistCreds[0] exists
                  <>
                    <div className="font-extrabold text-[70px]">
                      {artistCreds[0].artistName}
                    </div>
                    <div className="font-semibold text-xl">
                      Review Music Collection
                    </div>
                    <button
                      className="hover:bg-[#9E67E4] bg-[#7b4bb9] py-1 px-6 rounded-lg"
                      onClick={() => {
                        handleAddMusicBack();
                        refreshPage();
                      }}
                    >
                      Add Unlisted Music Back
                    </button>
                  </>
                )}
              </div>
              <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
                {/* Work in here */}
                <div className="w-full flex items-center overflow-x-auto overflow-y-auto md:pb-0 pb-5">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {artistAlbums.map((album: Album) => {
                      return (
                        <div
                          key={album.albumName}
                          className="flex flex-col items-center gap-[6px] cursor-pointer"
                          style={{ minWidth: '200px' }}
                          onClick={(e) => handleAlbumClick(album, e)}
                        >
                          <div className="bg-[#656262] rounded-lg p-5 bg-center bg-cover relative">
                            <img
                              className="w-[140px] h-[140px] rounded-xl"
                              src={album.coverArtURL}
                              alt={album.albumName}
                            />

                            <div className="pt-2 text-white text-[15px] font-medium whitespace-nowrap">
                              {album.albumName.length >= 20
                                ? album.albumName.slice(0, 17) + '...'
                                : album.albumName}
                            </div>
                            <div className="pt-1 text-[#BA85FE] text-[13px]">
                              {album.artistName}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {selectedAlbum && clickPosition && !hideCard && (
                      <div
                        className="absolute"
                        style={{
                          top: clickPosition.y - 100,
                          left: clickPosition.x - 5,
                        }}
                      >
                        <div
                          className="text-center font-color-red-500 w-[100px] h-[150px] bg-[rgba(33,32,32,0.8)] p-1 rounded-lg"
                          onMouseLeave={handleMouseLeave}
                        >
                          <button
                            className="hover:bg-[#656262] text-xs m-2 px-3"
                            onClick={() => {
                              console.log('view song button clicked');
                              navigate(`/album/${selectedAlbum.albumName}`);
                            }}
                          >
                            View Album
                          </button>
                          <button
                            className="hover:bg-[#656262] text-xs m-2 px-3"
                            onClick={() => {
                              console.log('view song button clicked');
                              navigate(
                                `/album/edit/${selectedAlbum.albumName}`
                              );
                            }}
                          >
                            Edit Album
                          </button>

                          <button
                            className="hover:bg-[#656262] text-xs m-2  px-3"
                            onClick={() => {
                              handleDeleteAlbum();
                              setHideCard(true);
                            }}
                          >
                            Delete Album
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {showDeleteScreen && (
                    <ConfirmCancelScreen
                      onClose={() => setShowDeleteScreen(false)}
                      condition="deleteAlbum"
                      selectedSong={null}
                      selectedAlbum={selectedAlbum}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
