import React, { useState } from 'react';

export const UploadMain = () => {
  const [songName, setSongName] = useState('');
  const [genre, setGenre] = useState('');
  const [artistName, setArtistName] = useState('');
  const [coverArt, setCoverArt] = useState<File | null>(null);
  const [songFile, setSongFile] = useState<File | null>(null);
  const [songFileName, setSongFileName] = useState(''); // Added state for the song file name
  const [isSongClicked, setIsSongClicked] = useState(false);
  const [isAlbumClicked, setIsAlbumClicked] = useState(false);

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

  return (
    <div
      className="text-white md:pl-[400px] pl-4 px-5 flex flex-col w-full gap-5 overflow-hidden"
      style={{ maxHeight: 'calc(100vh - 211px)' }}
    >
      <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto">
        <div className="text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">
          Upload
        </div>
        <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
          {/* everything above has been checked and is working properly */}

          <form
            className="flex items-center flex-col mt-[25px] "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-row ">
              <div className="flex flex-col mt-[-20px]">
                <label>Cover Art</label>
                <div className="flex flex-col justify-center items-center mb-4">
                  <label className="w-[250px] h-[250px] bg-[#656262] rounded-lg flex justify-center items-center cursor-pointer mb-4">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleCoverArtChange}
                    />
                    <div>Upload Cover</div>
                  </label>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-[25px]">
                <button
                  className="bg-[#292828] hover:bg-[#875ABE] text-white text-2xl py-4 px-16 rounded-full"
                  onClick={handleAlbumClick}
                >
                  Album
                </button>
                <button
                  className="bg-[#292828] hover:bg-[#875ABE] text-white text-2xl py-4 px-16 rounded-full"
                  onClick={handleSongClick}
                >
                  Single
                </button>
              </div>
            </div>
            {isSongClicked && (
              <>
                <div className="flex flex-row space-x-[50px] mt-[75px]">
                  <div className="flex flex-col">
                    <label>Single</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3  h-[75px]"
                      type="text"
                      placeholder="Single Name"
                      value={songName}
                      onChange={(e) => setSongName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Genre</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 h-[75px]"
                      type="text"
                      placeholder="Genre"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Artist</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3  h-[75px]"
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
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3  h-[75px]"
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
                        onChange={handleSongFileChange}
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
                <div className="flex flex-row space-x-[50px] mt-[75px]">
                  <div className="flex flex-col">
                    <label>Album</label>
                    <input
                      className=" bg-[#656262] rounded-[20px] p-2 text-white mb-3  h-[75px]"
                      type="text"
                      placeholder="Album Name"
                      value={songName}
                      onChange={(e) => setSongName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label>Genre</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 h-[75px]"
                      type="text"
                      placeholder="Genre"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label>Artist</label>
                    <input
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3  h-[75px]"
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
                      className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 h-[75px]"
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
                        onChange={handleSongFileChange}
                      />
                    </label>
                  </div>
                </div>
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
