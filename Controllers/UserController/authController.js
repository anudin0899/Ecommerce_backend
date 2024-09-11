const USER = require('../../Models/userModel');
const jwt = require('jsonwebtoken');
const { verifyHashedData } = require('../../Utilities/hashData');




module.exports = {

    //sign In
    signIn: async (req, res) => {
        try {
            const { data, password } = req.body
            const userInfo = await USER.findOne({ email: data });
            const verifyPassword = await verifyHashedData(password, userInfo.password);
            if (verifyPassword && userInfo.role === 'user') {
                const token = await jwt.sign({ ...userInfo }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                // Set cookie to expire in 1 hour
                res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
                res.status(200).json({
                    message: "Authentication Sucess",
                    token: token,
                    userInfo: userInfo
                });
            } else {
                res.status(404).json({ message: "email or password is wrong" })
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    signout: async (req, res) => {

        res.clearCookie('token');
        res.status(200).json({
            message: 'Sigout sucessfully...!'
        })
    }
}