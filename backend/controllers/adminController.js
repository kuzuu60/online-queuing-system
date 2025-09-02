const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function adminSignup(req, res) {
    try {
        const { username, password, secretKey } = req.body;
        console.log("From request body:", secretKey);
        console.log("From .env:", process.env.ADMIN_SECRET_KEY);
        // Optional: require a secret key to prevent public signup
        if (secretKey !== process.env.ADMIN_SECRET_KEY) {
            return res.status(403).json({ message: 'Invalid secret key' });
        }

        const hashed = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO admins (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, hashed]
        );

        res.status(201).json({ message: 'Admin created', admin: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}


async function adminLogin(req, res) {
    try {
        const { username, password } = req.body;

        const result = await pool.query('SELECT * FROM admins WHERE username=$1', [username]);
        const admin = result.rows[0];

        if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, admin.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

      res.json({
        message: "Login successful",
      admin: {
        id: admin.id,
        username: admin.username
      },
      token
      });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}


// Get all applications (optionally filter by status)
async function getAllApplications(req, res) {
  try {
    const { status } = req.query; // optional filter

    let query = 'SELECT * FROM ftth_applications';
    const params = [];

    if (status) {
      query += ' WHERE status = $1';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getApplicationByIdAdmin(req, res) {
  try {
    const { application_id } = req.params;
    const result = await pool.query(
      'SELECT * FROM ftth_applications WHERE application_id = $1',
      [application_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Approve/Reject application + add comment
async function updateApplicationStatus(req, res) {
  try {
    const { application_id } = req.params;
    const { status, comments } = req.body;

    if (!status || !['pending', 'approved', 'rejected'].includes(status.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const result = await pool.query(
      'UPDATE ftth_applications SET status = $1, comments = $2 WHERE application_id = $3 RETURNING *',
      [status.toLowerCase(), comments || null, application_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      message: 'Application updated successfully',
      application: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { adminSignup, adminLogin , getAllApplications, getApplicationByIdAdmin, updateApplicationStatus };
