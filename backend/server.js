const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routers
const applicationRoutes = require('./routes/applicationsRoute');
const adminRoutes = require('./routes/adminRoute');


// API routes
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


