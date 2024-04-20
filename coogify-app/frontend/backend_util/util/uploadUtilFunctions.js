import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';

dotenv.config();

export const baseURL = `$https://coogify-frontend.vercel.app/uploads/`;

// Define storage configuration for multer
export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./uploads')); // Define the destination directory for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Define the filename for uploaded files
  },
});

// Initialize multer with the storage configuration
export const upload = multer({ storage: storage });
