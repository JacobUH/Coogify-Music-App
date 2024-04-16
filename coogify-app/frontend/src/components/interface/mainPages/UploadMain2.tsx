import React, { useState } from 'react';
import AddIcon from '/images/AddIcon.svg';
import BackButton from '/images/Back Button.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';

interface Song {
  songName: string;
  albumName: string;
  genreName: string;
  artistName: string;
  coverArtURL: string;
  songURL: string;
}

export const UploadMain2 = () => {
  const [isSongClicked, setIsSongClicked] = useState(false);
  const [isAlbumClicked, setIsAlbumClicked] = useState(false);
  const [singleSong, setSingleSong] = useState<Song[]>();
  const [albumSongs, setAlbumSongs] = useState<Song[]>([]);

  const [coverArtURL, setCoverArtURL] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [songName, setSongName] = useState('');
  const [genreName, setGenreName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [songURL, setSongURL] = useState('');

  const navigate = useNavigate();

  const storedToken = localStorage.getItem('sessionToken');

  const handleSongSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Log the singleSong state
    e.preventDefault();
    console.log(
      JSON.stringify({
        coverArtURL,
        albumName: songName,
        songName,
        genreName,
        artistName,
        songURL,
      })
    );
    console.log('calling song submit api');

    try {
      const response = await axios.post(
        `${backendBaseUrl}/api/upload`, // Use backendBaseUrl here
        {
          coverArtURL,
          albumName: songName,
          songName,
          genreName,
          artistName,
          songURL,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      // Assuming successful login, you can redirect the home page
      navigate('/home');
    } catch (err) {
      console.error('Error uploading the song:', err);
    }
  };

  const handleAlbumSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Handle the album submission logic here (e.g., API call)
    console.log('calling album submit api');
  };

  const handleAlbumClick = () => {
    setIsAlbumClicked(true);
    setIsSongClicked(false);
  };

  const handleSongClick = () => {
    setIsSongClicked(true);
    setIsAlbumClicked(false);
  };

  const handleAddSong = () => {
    // Add a new object to the songs array state
  };

  const handleRemoveSong = (index: number) => {};

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5 overflow-hidden hide-scrollbar"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto hide-scrollbar relative">
        <div className="absolute top-10 left-10">
          <img
            src={BackButton}
            alt="Back"
            onClick={handleBack}
            className="cursor-pointer"
          />
        </div>
        <div className="flex-col text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Upload
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          <div className="flex items-center flex-col mt-[25px]">
            <div className="flex flex-row ">
              <div className="flex flex-col mt-[-20px]">
                <label>Cover Art</label>
                <div className="flex flex-col justify-center items-center mb-4 mr-[75px]">
                  <label className="w-[250px] h-[250px] bg-[#656262] rounded-lg flex justify-center items-center cursor-pointer mb-4">
                    <input
                      className="hidden"
                      type="file"
                      id="coverArtURL"
                      name="coverArtURL"
                      value={coverArtURL}
                      onChange={(e) => setCoverArtURL(e.target.value)}
                      accept="image/jpeg, image/jpg, image/png, image/svg+xml"
                      required
                      title="Please enter a cover art."
                    />
                    <div>Upload Cover</div>
                  </label>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-[25px]">
                <button
                  className={`bg-[#292828] ${
                    isSongClicked ? 'bg-[#875ABE]' : 'hover:bg-[#875ABE]'
                  } text-white text-2xl py-4 px-16 rounded-full`}
                  onClick={handleSongClick}
                >
                  Single
                </button>
                <button
                  className={`bg-[#292828] ${
                    isAlbumClicked ? 'bg-[#875ABE]' : 'hover:bg-[#875ABE]'
                  } text-white text-2xl py-4 px-16 rounded-full`}
                  onClick={handleAlbumClick}
                >
                  Album
                </button>
              </div>
            </div>
            {/* SONG CLICKED */}
            {isSongClicked && (
              <form onSubmit={handleSongSubmit} className="flex flex-col">
                <div className="flex flex-row space-x-[50px] mt-[25px]">
                  <div className="flex flex-col">
                    <label>Single</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[350px] h-[75px]"
                      id="songName"
                      name="songName"
                      value={songName}
                      onChange={(e) => setSongName(e.target.value)}
                      placeholder="Song Name"
                      required
                      title="Please enter a song name."
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Genre</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[350px] h-[75px]"
                      id="genreName"
                      name="genreName"
                      value={genreName}
                      onChange={(e) => setGenreName(e.target.value)}
                      placeholder="Genre"
                      required
                      title="Please enter a selected genre."
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Artist</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[350px] h-[75px]"
                      id="artistName"
                      name="artistName"
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                      placeholder="Artist Name"
                      required
                      title="Please enter an artist."
                    />
                  </div>
                </div>
                <div className="flex flex-col mr-[5px]">
                  <label>Song</label>
                  <div className="flex flex-col items-center mb-4">
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[1150px] h-[75px]"
                      name="fileName"
                      placeholder="No song uploaded"
                      readOnly
                    />
                    <label className="bg-[#292828] text-white px-4 py-2 rounded-[20px] cursor-pointer hover:bg-[#875ABE] transition-colors">
                      <span className="flex items-center justify-center">
                        Upload Song
                      </span>
                      <input
                        className="hidden"
                        type="file"
                        id="songURL"
                        name="songURl"
                        value={songURL}
                        onChange={(e) => setSongURL(e.target.value)}
                        accept="audio/mpeg, audio/wav, audio/mp4"
                        required
                      />
                    </label>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <button
                    type="submit"
                    className="bg-[#875ABE] hover:bg-[#5f3c8b] rounded-[20px] text-white font-bold py-2 px-4"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
            {/* ALBUM CLICKED */}
            {isAlbumClicked && (
              <>
                <div className="flex flex-row space-x-[50px] mt-[25px]">
                  <div className="flex flex-auto flex-col">
                    <label>Album</label>
                    <input
                      className=" bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[350px] h-[75px]"
                      type="text"
                      placeholder="Album Name"
                      //value={songName}
                      //onChange={(e) => setSongName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-auto flex-col">
                    <label>Genre</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[350px] h-[75px]"
                      type="text"
                      placeholder="Genre"
                      //value={genre}
                      //onChange={(e) => setGenre(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-auto flex-col">
                    <label>Artist</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[350px] h-[75px]"
                      type="text"
                      placeholder="Artist Name"
                      //value={artistName}
                      //onChange={(e) => setArtistName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col ">
                  <label>Song</label>
                  {albumSongs.map((song, index) => (
                    <div key={index} className=" my-2 justify-center">
                      <input
                        className="bg-[#656262] rounded-[20px] p-2 mb-3 text-white flex-1 h-[75px] w-[1000px]"
                        type="text"
                        readOnly
                        placeholder={`Song ${index + 1} uploaded`}
                        value={song.songName || ''}
                      />
                      <label className="bg-[#292828] text-white px-4 py-6 rounded-[20px] cursor-pointer hover:bg-[#875ABE] transition-colors ml-[20px] mb-[10px] h-[75px]">
                        <span className="inline-block align-middle">
                          Upload Song
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="audio/mpeg, audio/wav, audio/mp4"
                        />
                      </label>
                      {albumSongs.length > 1 && (
                        <button
                          type="button"
                          className="ml-2 bg-red-600 text-white px-2 py-1 rounded-[20px] hover:bg-red-700"
                          onClick={() => handleRemoveSong(index)}
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddSong}
                  className="bg-[#292828] text-white rounded-[20px] mt-2 "
                >
                  <img
                    src={AddIcon}
                    className="w-[20px] pb-1 cursor-pointer"
                    onClick={handleAddSong}
                  />
                </button>
                <div className="text-center mt-6">
                  <button
                    className="bg-[#875ABE] hover:bg-[#6d40a3] rounded-[20px] text-white font-bold py-2 px-4"
                    onClick={handleAlbumSubmit}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
