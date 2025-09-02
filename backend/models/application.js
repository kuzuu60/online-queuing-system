const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const generateApplicationId = require('../utils/generateApplicationId'); // your UUID generator

// Create a new application
async function createApplication(app) {
  const application_id = generateApplicationId(); // generate UUID here

  const res = await pool.query(
    `INSERT INTO ftth_applications
      (application_id, name, email, phone, address, citizenship, photo)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      application_id,
      app.name,
      app.email,
      app.phone,
      app.address,
      app.citizenship || null, // optional
      app.photo || null        // optional
    ]
  );
  return res.rows[0];
}

// Get a single application by ID
async function getApplicationById(application_id) {
  const res = await pool.query(
    `SELECT * FROM ftth_applications WHERE application_id = $1`,
    [application_id]
  );
  return res.rows[0];
}

// Get all applications (for admin)
async function getAllApplications() {
  const res = await pool.query(
    `SELECT * FROM ftth_applications ORDER BY created_at DESC`
  );
  return res.rows;
}

// Update status and comments (admin)
async function updateApplicationStatus(application_id, status, comments) {
  const res = await pool.query(
    `UPDATE ftth_applications
       SET status = $2, comments = $3
       WHERE application_id = $1
       RETURNING *`,
    [application_id, status, comments]
  );
  return res.rows[0];
}

module.exports = {
  createApplication,
  getApplicationById,
  getAllApplications,
  updateApplicationStatus
};
