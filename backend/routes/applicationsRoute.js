const express = require('express');
const router = express.Router();
const { submitApplication, trackApplication } = require('../controllers/applicationsController');
const cloudinaryUpload = require('../config/cloudinary');

// Upload route using Cloudinary
router.post(
  '/',
  cloudinaryUpload.fields([{ name: 'citizenship' }, { name: 'photo' }]),
  submitApplication
);

router.post('/track', trackApplication);

module.exports = router;
