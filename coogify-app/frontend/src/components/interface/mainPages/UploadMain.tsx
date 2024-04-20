import React, { useState } from 'react';
import AddIcon from '../../../../public/images/AddIcon.svg';
import BackButton from '../../../../public/images/Back Button.svg';
import { useNavigate } from 'react-router-dom';
import backendBaseUrl from '../../../apiConfig';

const UploadMain: React.FC = () => {
  const [songFile, setSongFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const storedToken = localStorage.getItem('sessionToken');
  if (!storedToken) {
    console.error('Session token not found');
    return null; // or render a message to the user
  }

  const handleSongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSongFile(e.target.files[0]);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const cover = e.target.files[0];
      setCoverFile(cover);
      setCoverPreview(URL.createObjectURL(cover));
    }
  };

  const handleUpload = () => {
    if (!songFile || !coverFile) return;

    const formData = new FormData();
    formData.append('song', songFile);
    formData.append('cover', coverFile);

    fetch(`${backendBaseUrl}/api/upload/uploadSongs`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // handle success
        } else {
          // handle error
          console.error('Upload failed');
        }
      })
      .catch((error) => {
        console.error('Error occurred during upload:', error);
      });
  };

  return (
    <div>
      <h2>Upload a Song</h2>
      <div>
        <label htmlFor="songFile">Select Song:</label>
        <input
          type="file"
          id="songFile"
          accept=".mp3,.wav,.ogg"
          onChange={handleSongChange}
        />
      </div>
      <h2>Upload Cover Art</h2>
      <div>
        <label htmlFor="coverFile">Select Cover Art:</label>
        <input
          type="file"
          id="coverFile"
          accept="image/*"
          onChange={handleCoverChange}
        />
      </div>
      {coverPreview && (
        <div>
          <h3>Cover Art Preview</h3>
          <img
            src={coverPreview}
            alt="Cover Art Preview"
            style={{ maxWidth: '200px' }}
          />
        </div>
      )}
      <div>
        <button disabled={!songFile || !coverFile} onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadMain;
