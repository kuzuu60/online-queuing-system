const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage engine for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'ftth_applications',
    resource_type: 'auto', // automatically detects image/pdf
    public_id: `${Date.now()}-${file.originalname}`
  })
});

const parser = multer({ storage });

module.exports = parser;
