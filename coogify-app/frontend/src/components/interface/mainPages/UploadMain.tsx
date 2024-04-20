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

  const [genreName, setGenreName] = useState('');
  const [albumName, setAlbumName] = useState('');

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
          <MultipleFileUploader
            genreName={genreName}
            setGenreName={setGenreName}
            albumName={albumName}
            setAlbumName={setAlbumName}
          />
        </div>
      </div>
    </div>
  );
};

const MultipleFileUploader = ({
  genreName,
  setGenreName,
  albumName,
  setAlbumName,
}: {
  genreName: string;
  setGenreName: React.Dispatch<React.SetStateAction<string>>;
  albumName: string;
  setAlbumName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [mp3Files, setMp3Files] = useState<File[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    'initial' | 'uploading' | 'success' | 'fail'
  >('initial');

  const handleMp3FilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus('initial');
      setMp3Files([...mp3Files, ...Array.from(e.target.files)]);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus('initial');
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (mp3Files.length > 0 && imageFile) {
      setStatus('uploading');

      const formData = new FormData();
      mp3Files.forEach((file) => {
        formData.append('mp3Files', file);
      });
      formData.append('imageFile', imageFile);
      formData.append('genreName', genreName);
      formData.append('albumName', albumName);

      try {
        const storedToken = localStorage.getItem('sessionToken');
        if (!storedToken) {
          console.error('Session token not found');
          return;
        }

        const result = await fetch(`${backendBaseUrl}/api/upload/uploadSongs`, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const data = await result.json();

        console.log(data);
        setStatus('success');
      } catch (error) {
        console.error(error);
        setStatus('fail');
      }
    }
  };

  return (
    <>
      <div className="input-group">
        <label htmlFor="mp3Files" className="sr-only">
          Choose MP3 files
        </label>
        <input
          id="mp3Files"
          type="file"
          multiple
          onChange={handleMp3FilesChange}
          accept="audio/mpeg"
        />
      </div>
      <div className="input-group">
        <label htmlFor="imageFile" className="sr-only">
          Choose an image file
        </label>
        <input
          id="imageFile"
          type="file"
          onChange={handleImageFileChange}
          accept="image/jpeg, image/png"
        />
      </div>
      <div className="input-group">
        <label htmlFor="genreName">Genre Name:</label>
        <input
          id="genreName"
          type="text"
          value={genreName}
          onChange={(e) => setGenreName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="albumName">Album Name:</label>
        <input
          id="albumName"
          type="text"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />
      </div>
      {mp3Files.length > 0 &&
        mp3Files.map((file, index) => (
          <section key={file.name}>
            MP3 File number {index + 1} details:
            <ul>
              <li>Name: {file.name}</li>
              <li>Type: {file.type}</li>
              <li>Size: {file.size} bytes</li>
            </ul>
          </section>
        ))}
      {imageFile && (
        <section>
          Image File details:
          <ul>
            <li>Name: {imageFile.name}</li>
            <li>Type: {imageFile.type}</li>
            <li>Size: {imageFile.size} bytes</li>
          </ul>
        </section>
      )}
      {mp3Files.length > 0 && imageFile && (
        <button onClick={handleUpload} className="submit">
          Upload {mp3Files.length > 1 ? 'files' : 'a file'}
        </button>
      )}

      <Result status={status} />
    </>
  );
};

const Result = ({ status }: { status: string }) => {
  if (status === 'success') {
    return <p>✅ Uploaded successfully!</p>;
  } else if (status === 'fail') {
    return <p>❌ Upload failed!</p>;
  } else if (status === 'uploading') {
    return <p>⏳ Uploading started...</p>;
  } else {
    return null;
  }
};
