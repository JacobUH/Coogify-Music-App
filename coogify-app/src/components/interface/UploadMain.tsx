import React, { useState } from 'react';
import AddIcon from '../../../public/images/AddIcon.svg';
import AddBack from '../../../public/images/Back Button.svg';
import { useNavigate } from 'react-router-dom';

export const UploadMain = () => {
  const [songName, setSongName] = useState('');
  const [genre, setGenre] = useState('');
  const [artistName, setArtistName] = useState('');
  const [coverArt, setCoverArt] = useState<File | null>(null);
  const [songFile, setSongFile] = useState<File | null>(null);
  const [songFileName, setSongFileName] = useState(''); // Added state for the song file name
  const [isSongClicked, setIsSongClicked] = useState(false);
  const [isAlbumClicked, setIsAlbumClicked] = useState(false);
  const [songs, setSongs] = useState([{ name: '', file: "" }]);

  const handleCoverArtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCoverArt(event.target.files[0]);
    }
  };

  const handleSongFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSongFile(event.target.files[0]);
      setSongFileName(event.target.files[0].name); // Set file name when file is chosen
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle the submission logic here
  };

  const handleAlbumClick = () => {
    setIsAlbumClicked((prevState) => !prevState);
    setIsSongClicked(false);
  };

  const handleSongClick = () => {
    setIsSongClicked((prevState) => !prevState);
    setIsAlbumClicked(false);
  };

  const handleAddSong = () => {
    // Add a new object to the songs array state
    setSongs([...songs, { name: '', file: "" }]);
  };

  const handleSongFilesChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files;
    if (files) {
      const updatedSongs = [...songs];
      updatedSongs[index] = {
        ...updatedSongs[index],
        name: files[0].name,
        file: files[0],
      };
      setSongs(updatedSongs);
    }
  };

  const handleRemoveSong = (index: number) => {
    setSongs(songs.filter((_, i) => i !== index));
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5 overflow-hidden hide-scrollbar"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto hide-scrollbar">
        <div className="flex-col text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Upload
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          {/* everything above has been checked and is working properly */}
          <div className="w-full flex justify-between items-center px-5 md:px-10 py-4">
          <img src={AddBack} alt="Back" onClick={handleBack} className="cursor-pointer absolute mb-48"/>
        </div>
          <form
            className="flex items-center flex-col mt-[25px] "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-row ">
              <div className="flex flex-col mt-[-20px]">
                <label>Cover Art</label>
                <div className="flex flex-col justify-center items-center mb-4 mr-[75px]">
                  <label className="w-[250px] h-[250px] bg-[#656262] rounded-lg flex justify-center items-center cursor-pointer mb-4">
                    <input
                       type="file"
                       className="hidden"
                       accept="image/jpeg, image/jpg, image/png, image/svg+xml"
                       onChange={handleCoverArtChange}
                    />
                    <div>Upload Cover</div>
                  </label>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-[25px]">
                <button
                  className={`bg-[#292828] ${
                    isAlbumClicked ? 'bg-[#875ABE]' : 'hover:bg-[#875ABE]'
                  } text-white text-2xl py-4 px-16 rounded-full`}
                  onClick={handleAlbumClick}
                >
                  Album
                </button>
                <button
                  className={`bg-[#292828] ${
                    isSongClicked ? 'bg-[#875ABE]' : 'hover:bg-[#875ABE]'
                  } text-white text-2xl py-4 px-16 rounded-full`}
                  onClick={handleSongClick}
                >
                  Single
                </button>
              </div>
            </div>
            {isSongClicked && (
              <>
                <div className="flex flex-row space-x-[50px] mt-[25px]">
                  <div className="flex flex-col">
                    <label>Single</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[350px] h-[75px]"
                      type="text"
                      placeholder="Single Name"
                      value={songName}
                      onChange={(e) => setSongName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Genre</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[350px] h-[75px]"
                      type="text"
                      placeholder="Genre"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Artist</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[350px] h-[75px]"
                      type="text"
                      placeholder="Artist Name"
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col mr-[5px]">
                  <label>Song</label>
                  <div className="flex flex-col items-center mb-4">
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[1150px] h-[75px]"
                      type="text"
                      readOnly
                      placeholder="No song uploaded"
                      value={songFileName}
                    />
                    <label className="bg-[#292828] text-white px-4 py-2 rounded-[20px] cursor-pointer hover:bg-[#875ABE] transition-colors">
                      <span>Upload Song</span>
                      <input
                         type="file"
                         className="hidden"
                         accept="audio/mpeg, audio/wav, audio/mp4"
                         onChange={(e) => handleSongFilesChange(e, index)}
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
              </>
            )}
            {isAlbumClicked && (
              <>
                <div className="flex flex-row space-x-[50px] mt-[25px]">
                  <div className="flex flex-auto flex-col">
                    <label>Album</label>
                    <input
                      className=" bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[350px] h-[75px]"
                      type="text"
                      placeholder="Album Name"
                      value={songName}
                      onChange={(e) => setSongName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-auto flex-col">
                    <label>Genre</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[350px] h-[75px]"
                      type="text"
                      placeholder="Genre"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-auto flex-col">
                    <label>Artist</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[350px] h-[75px]"
                      type="text"
                      placeholder="Artist Name"
                      value={artistName}
                      onChange={(e) => setArtistName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col ">
                  <label>Song</label>
                  {songs.map((song, index) => (
                    <div key={index} className=" my-2 justify-center">
                      <input
                        className="bg-[#656262] rounded-[20px] p-2 mb-3 text-white flex-1 h-[75px] w-[1000px]"
                        type="text"
                        readOnly
                        placeholder={`Song ${index + 1} uploaded`}
                        value={song.name || ''}
                      />
                      <label className="bg-[#292828] text-white px-4 py-6 rounded-[20px] cursor-pointer hover:bg-[#875ABE] transition-colors ml-[20px] mb-[10px] h-[75px]">
                        <span className="inline-block align-middle">Upload Song</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="audio/mpeg, audio/wav, audio/mp4"
                          onChange={(e) => handleSongFilesChange(e, index)}
                        />
                      </label>
                      {songs.length > 1 && (
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
                    type="submit"
                    className="bg-[#875ABE] hover:bg-[#6d40a3] rounded-[20px] text-white font-bold py-2 px-4"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
