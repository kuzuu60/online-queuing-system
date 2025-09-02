const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function createApplication(app) {
  const res = await pool.query(
    `INSERT INTO ftth_applications
      (application_id, name, email, phone, address, citizenship, photo)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [app.application_id, app.name, app.email, app.phone, app.address, app.citizenship, app.photo]
  );
  return res.rows[0];
}

async function getApplicationById(application_id) {
  const res = await pool.query(
    `SELECT * FROM ftth_applications WHERE application_id = $1`,
    [application_id]
  );
  return res.rows[0];
}

module.exports = { createApplication, getApplicationById };
