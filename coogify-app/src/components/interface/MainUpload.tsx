import React, { useState } from 'react';

const MainUpload = () => {
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
    setIsAlbumClicked(prevState => !prevState);
    setIsSongClicked(false);
  };

  const handleSongClick = () => {
    setIsSongClicked(prevState => !prevState);
    setIsAlbumClicked(false);
  };

  return (
    <div className="text-white md:pl-[400px] md:pr-[50px] pl-4 px-5 flex flex-col w-full gap-5 rounded-md hide-scrollbar overflow-auto" style={{ maxHeight: 'calc(100vh - 211px)' }}>
       <div className="bg-gradient-to-t from-[#3E3C3C] from-85% to-[#9E67E4] to-100% rounded-md overflow-auto mb-[30px] hide-scrollbar">
       <div className="w-full rounded-xl md:h-[calc(100vh-140px)] h-auto flex flex-col items-center gap-5 px-5 md:py-5 pb-20 pt-5">
        <div className="text-center text-4xl font-bold mb-10 mt-[45px] text-[50px]">Upload</div>
        <form className="flex items-center flex-col mt-[50px] "onSubmit={handleSubmit}>
        <div className="flex flex-row space-x-[1600px]">
            <div className="flex flex-col mt-[-20px]">
                <label>Cover Art</label>
                <div className="flex flex-col justify-center items-center mb-4">
                <label className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center cursor-pointer mb-4">
                <input type="file" className="hidden" onChange={handleCoverArtChange} />
                <div>Upload Cover</div>
                </label>
                </div>
            </div>
            <div className="flex flex-col space-y-[25px]">
            <button className="bg-gray-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full h-[70px] w-[225px]" onClick={handleAlbumClick}>
                Album
            </button>
            <button className="bg-gray-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full h-[70px] w-[225px]" onClick={handleSongClick}>
                Song
            </button>
            </div>
        </div>
        {isSongClicked &&  (
          <><div className="flex flex-row space-x-[50px] mt-[75px]">
                              <div className="flex flex-col">
                                  <label>Single Name</label>
                                  <input
                                      className=" bg-gray-500 border-b-2 border-gray-500 rounded-[20px] p-2 text-white mb-3 w-[650px] h-[75px]"
                                      type="text"
                                      placeholder="Single Name"
                                      value={songName}
                                      onChange={(e) => setSongName(e.target.value)} />
                              </div>
                              <div className="flex flex-col">
                                  <label>Genre</label>
                                  <input
                                      className="bg-gray-500 border-b-2 border-gray-500 rounded-[20px] p-2 text-white mb-3 w-[650px] h-[75px]"
                                      type="text"
                                      placeholder="Genre"
                                      value={genre}
                                      onChange={(e) => setGenre(e.target.value)} />
                              </div>
                              <div className="flex flex-col">
                                  <label>Artist Name</label>
                                  <input
                                      className="bg-gray-500 border-b-2 border-gray-500 rounded-[20px] p-2 text-white mb-3 w-[600px] h-[75px]"
                                      type="text"
                                      placeholder="Artist Name"
                                      value={artistName}
                                      onChange={(e) => setArtistName(e.target.value)} />
                              </div>
                          </div><div className="flex flex-col mr-[5px]">
                                  <label>Song</label>
                                  <div className="flex flex-col items-center mb-4">
                                      <input
                                          className="bg-gray-500 border-b-2 border-gray-500 rounded-[20px] p-2 text-white mb-3 w-[2000px] h-[75px]"
                                          type="text"
                                          readOnly
                                          placeholder="No song uploaded"
                                          value={songFileName} />
                                      <label className="bg-purple-500 text-white px-4 py-2 rounded-[20px] cursor-pointer hover:bg-purple-700 transition-colors">
                                          <span>Upload Song</span>
                                          <input
                                              type="file"
                                              className="hidden"
                                              onChange={handleSongFileChange} />
                                      </label>
                                  </div>
                              </div><div className="text-center mt-6">
                                  <button type="submit" className="bg-purple-500 hover:bg-purple-700 rounded-[20px] text-white font-bold py-2 px-4">
                                      Submit
                                  </button>
                              </div></>
        )}
        {isAlbumClicked &&(
          <><div className="flex flex-row space-x-[50px] mt-[75px]">

                              <div className="flex flex-col">
                                  <label>Album Name</label>
                                  <input
                                      className=" bg-gray-500 border-b-2 border-gray-500 rounded-[20px] p-2 text-white mb-3 w-[650px] h-[75px]"
                                      type="text"
                                      placeholder="Single Name"
                                      value={songName}
                                      onChange={(e) => setSongName(e.target.value)} />
                              </div>

                              <div className="flex flex-col">
                                  <label>Genre</label>
                                  <input
                                      className="bg-gray-500 border-b-2 border-gray-500 rounded-[20px] p-2 text-white mb-3 w-[650px] h-[75px]"
                                      type="text"
                                      placeholder="Genre"
                                      value={genre}
                                      onChange={(e) => setGenre(e.target.value)} />
                              </div>

                              <div className="flex flex-col">
                                  <label>Artist Name</label>
                                  <input
                                      className="bg-gray-500 border-b-2 border-gray-500 rounded-[20px] p-2 text-white mb-3 w-[600px] h-[75px]"
                                      type="text"
                                      placeholder="Artist Name"
                                      value={artistName}
                                      onChange={(e) => setArtistName(e.target.value)} />
                              </div>
                          </div><div className="flex flex-col mr-[5px]">
                                  <label>Song</label>
                                  <div className="flex flex-col items-center mb-4">
                                      <input
                                          className="bg-gray-500 border-b-2 border-gray-500 rounded-[20px] p-2 text-white mb-3 w-[2000px] h-[75px]"
                                          type="text"
                                          readOnly
                                          placeholder="No song uploaded"
                                          value={songFileName} />
                                      <label className="bg-purple-500 text-white px-4 py-2 rounded-[20px] cursor-pointer hover:bg-purple-700 transition-colors">
                                          <span>Upload Song</span>
                                          <input
                                              type="file"
                                              className="hidden"
                                              onChange={handleSongFileChange} />
                                      </label>
                                  </div>
                              </div><div className="text-center mt-6">
                                  <button type="submit" className="bg-purple-500 hover:bg-purple-700 rounded-[20px] text-white font-bold py-2 px-4">
                                      Submit
                                  </button>
                              </div></>
        )}
          
        </form>
      </div>
      </div>
    </div>
  );
};

export default MainUpload;
