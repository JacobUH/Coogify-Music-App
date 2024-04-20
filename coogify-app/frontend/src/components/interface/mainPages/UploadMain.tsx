import React, { useState } from 'react';
import AddIcon from '../../../../public/images/AddIcon.svg';
import BackButton from '../../../../public/images/Back Button.svg';
import { useNavigate } from 'react-router-dom';
import backendBaseUrl from '../../../apiConfig';

export const UploadMain = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [albumName, setAlbumName] = useState('');
  const [genreName, setGenreName] = useState('');
  const [coverArt, setCoverArt] = useState<File | null>(null);
  const [mp3Files, setMp3Files] = useState<File[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [successPrompt, setSuccessPrompt] = useState(false); // State for success prompt

  //  const handleCoverArtChange = (
  //    event: React.ChangeEvent<HTMLInputElement>
  //  ) => {
  //    if (event.target.files) {
  //      setCoverArt(event.target.files[0]);
  //    }
  //  };
  const handleCoverArtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCoverArt(event.target.files[0]);
      console.log('Cover Art File Path:', event.target.files[0]?.name);
    }
  };

  const handleMp3FilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setMp3Files([...mp3Files, event.target.files[0]]);
    }
  };

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const storedToken = localStorage.getItem('sessionToken');
    if (!storedToken) {
      console.error('Session token not found');
      return;
    }

    const formData = new FormData();
    formData.append('albumName', albumName);
    formData.append('genreName', genreName);
    formData.append('imageFile', coverArt as Blob);
    mp3Files.forEach((mp3File) => {
      formData.append('mp3Files', mp3File);
    });
    formData.append('imageFile', imageFile as Blob);

    console.log('FormData:', formData);

    fetch(`${backendBaseUrl}/api/upload/uploadSongs`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        console.log('Response:', data);
        setSuccessPrompt(true); // Set success prompt to true on successful upload
        setTimeout(() => setSuccessPrompt(false), 3000); // Hide success prompt after 3 seconds
      })
      .catch((error) => {
        console.error('Error uploading songs:', error);
      });
  };

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const storedToken = localStorage.getItem('sessionToken');
  //   if (!storedToken) {
  //     console.error('Session token not found');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('albumName', albumName);
  //   formData.append('genreName', genreName);
  //   formData.append('imageFile', imageFile as Blob);
  //   mp3Files.forEach((mp3File) => {
  //     formData.append('mp3Files', mp3File);
  //   });

  //   // Log file paths
  //   console.log('Album Name:', albumName);
  //   console.log('Genre Name:', genreName);
  //   console.log('Cover Art File Path:', coverArt?.name);
  //   console.log('Image File Path:', imageFile?.name);
  //   console.log('MP3 Files:');
  //   mp3Files.forEach((mp3File) => {
  //     console.log(mp3File.name);
  //   });

  //   console.log('FormData:', formData);

  //   fetch(`${backendBaseUrl}/api/upload/uploadSongs`, {
  //     method: 'POST',
  //     body: formData,
  //     headers: {
  //       Authorization: `Bearer ${storedToken}`,
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.text();
  //     })
  //     .then((data) => {
  //       console.log('Response:', data);
  //       setSuccessPrompt(true); // Set success prompt to true on successful upload
  //       setTimeout(() => setSuccessPrompt(false), 3000); // Hide success prompt after 3 seconds
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading songs:', error);
  //     });
  // };

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
          <form
            className="flex items-center flex-col mt-[25px]"
            onSubmit={handleSubmit}
          >
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
            <div className="flex flex-row mt-[25px]">
              <div className="flex flex-col">
                <label>Album</label>
                <input
                  className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[350px] h-[75px]"
                  type="text"
                  placeholder="Album Name"
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Genre</label>
                <input
                  className="bg-[#656262] rounded-[20px] p-2 text-white mb-3 w-[350px] h-[75px]"
                  type="text"
                  placeholder="Genre"
                  value={genreName}
                  onChange={(e) => setGenreName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col mr-[5px]">
              <label>Songs</label>
              <div className="flex flex-col items-center mb-4">
                <input
                  className="bg-[#656262] rounded-[20px] p-2 mb-3 text-white flex-1 h-[75px] w-[1000px]"
                  type="text"
                  readOnly
                  placeholder={`No song uploaded`}
                  value={
                    mp3Files.length > 0
                      ? `${mp3Files.length} song${
                          mp3Files.length > 1 ? 's' : ''
                        } uploaded`
                      : ''
                  }
                />
                <label className="bg-[#292828] text-white px-4 py-2 rounded-[20px] cursor-pointer hover:bg-[#875ABE] transition-colors">
                  <span className="inline-block align-middle">Upload Song</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="audio/mpeg, audio/wav, audio/mp4"
                    onChange={handleMp3FilesChange}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <label>Image File</label>
              <div className="flex flex-col items-center mb-4">
                <input
                  className="bg-[#656262] rounded-[20px] p-2 mb-3 text-white flex-1 h-[75px] w-[1000px]"
                  type="text"
                  readOnly
                  placeholder={`No image uploaded`}
                  value={imageFile ? 'Image uploaded' : ''}
                />
                <label className="bg-[#292828] text-white px-4 py-2 rounded-[20px] cursor-pointer hover:bg-[#875ABE] transition-colors">
                  <span className="inline-block align-middle">
                    Upload Image
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg, image/jpg, image/png, image/svg+xml"
                    onChange={handleImageFileChange}
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
        </div>
      </div>
      {successPrompt && (
        <div className="bg-green-500 text-white p-5 fixed bottom-10 right-10 rounded-lg">
          Songs uploaded successfully!
        </div>
      )}
    </div>
  );
};
