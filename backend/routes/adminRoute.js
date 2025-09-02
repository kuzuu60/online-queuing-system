const express = require('express');
const router = express.Router();
const { getAllApplications, getApplicationByIdAdmin,updateApplicationStatus } = require('../controllers/adminController');

// Get all applications
router.get('/applications', getAllApplications);
// Get single application by ID
router.get('/applications/:application_id', getApplicationByIdAdmin);

// Approve/Reject + add comment
router.patch('/applications/:application_id', updateApplicationStatus);

module.exports = router;
