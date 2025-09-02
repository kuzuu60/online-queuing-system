const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Optional: test connection
pool.query('SELECT NOW()', (err, res) => {
  if(err) {
    console.error('DB connection error:', err);
  }
  else {
    console.log('DB connected:', res.rows[0]);
  }
});

module.exports = pool;
