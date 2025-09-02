const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/verifyAdmin');

const { adminLogin, getAllApplications, getApplicationByIdAdmin,updateApplicationStatus } = require('../controllers/adminController');


// Login route (no auth required)
router.post('/login', adminLogin);
router.use(verifyAdmin);

// Get all applications
router.get('/applications', getAllApplications);
// Get single application by ID
router.get('/applications/:application_id', getApplicationByIdAdmin);

// Approve/Reject + add comment
router.patch('/applications/:application_id', updateApplicationStatus);

module.exports = router;
