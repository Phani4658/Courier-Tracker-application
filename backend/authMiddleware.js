const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jwt.verify(token, "SECRET");
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = { isAdmin };
