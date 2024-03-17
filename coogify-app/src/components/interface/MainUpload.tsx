import React, { useState } from 'react';


const MainUpload = () => {
    // State hooks for each form input
    const [songName, setSongName] = useState('');
    const [genre, setGenre] = useState('');
    const [artistName, setArtistName] = useState('');
    const [coverArt, setCoverArt] = useState<File | null>(null);
    const [songFile, setSongFile] = useState<File | null>(null);
  
    const handleCoverArtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setCoverArt(event.target.files[0]);
      }
    };
  
    const handleSongFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setSongFile(event.target.files[0]);
      }
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      // Handle the submission logic here
      // You will need to use something like FormData to append the files and text fields
    };
  
    return (
      <div className="text-white md:pl-[250px] pl-20 pr-5 flex flex-col gap-5" style={{ maxHeight: 'calc(100vh - 211px)' }}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="bg-gradient-to-br from-[#5e5c5c] to-[#312e3d] p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">Upload</div>
              </div>
              <div className="flex gap-4">
                <button className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
                  Album
                </button>
                <button className="bg-purple-500 text-white font-bold py-2 px-4 rounded">
                  Song
                </button>
              </div>
            </div>
  
            <div className="flex flex-wrap gap-6 mt-6">
              {/* Cover Art */}
              <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center">
                <input type="file" className="opacity-0 w-full h-full" onChange={handleCoverArtChange} />
                <span className="text-center text-gray-300">Upload Cover</span>
              </div>
  
              {/* Form Fields */}
              <div className="flex flex-wrap gap-6">
                <input
                  className="bg-transparent border-b-2 border-gray-500 text-white w-60"
                  type="text"
                  placeholder="Single Name"
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                />
                <input
                  className="bg-transparent border-b-2 border-gray-500 text-white w-60"
                  type="text"
                  placeholder="Genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
                <input
                  className="bg-transparent border-b-2 border-gray-500 text-white w-60"
                  type="text"
                  placeholder="Artist Name"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                />
                <input
                  className="bg-transparent border-b-2 border-gray-500 text-white w-full"
                  type="file"
                  placeholder="Upload Song"
                  onChange={handleSongFileChange}
                />
              </div>
            </div>
  
            <div className="flex justify-end mt-6">
              <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

export default MainUpload
