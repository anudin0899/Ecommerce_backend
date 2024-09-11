const jwt = require('jsonwebtoken');

const authorizeJwt = async (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(400).json({ message: "Authorization Required" });
    }
    const token = await req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ auth: false, message: "Authorization token is not available" });
    } else {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    auth: false,
                    message: "Authentication failed"
                });
            } else {
                req.decodedToken = decoded;
                next();
            }
        });
    }
};

const adminMiddleware = async (req, res, next) => {
    const role = req.decodedToken; // Access the role property from decodedToken
    if (role._doc.role !== 'admin') {
        return res.status(403).json({ message: 'Admin Access Denied' }); // Return the response here, don't call next()
    }
    next();
};

const userMiddleware = async (req, res, next) => {
    const role = req.decodedToken; // Access the role property from decodedToken
    if (role._doc.role !== 'user') {
        return res.status(403).json({ message: 'User Access Denied' }); // Return the response here, don't call next()
    }
    next();
};

module.exports = { authorizeJwt, adminMiddleware, userMiddleware };
