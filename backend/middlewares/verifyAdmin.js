const jwt = require('jsonwebtoken');

function verifyAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded; // attach admin info to request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = verifyAdmin;
