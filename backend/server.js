const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();


app.use(express.json());

// Routers
const applicationRoutes = require('./routes/applicationsRoute');
const adminRoutes = require('./routes/adminRoute');


// API routes
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


