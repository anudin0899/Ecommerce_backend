const USER = require('../../Models/userModel');
const jwt = require('jsonwebtoken');
const { verifyHashedData } = require('../../Utilities/hashData');




module.exports = {

    //sign In
    signIn: async (req, res) => {
        try {
            const { data, password } = req.body;
            const adminInfo = await USER.findOne({ email: data });

            if (adminInfo) { // Check if a user with the provided email was found
                const verifyPassword = await verifyHashedData(password, adminInfo.password);
                if (verifyPassword && adminInfo.role === "admin") {
                    // Set JWT token to expire in 1 hour
                    const token = await jwt.sign({ ...adminInfo }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

                    // Set cookie to expire in 1 hour
                    res.cookie('admintoken', token, { maxAge: 3600000, httpOnly: true }); // 1 hour = 3600000 milliseconds

                    res.status(200).json({
                        message: "admin authentication Success",
                        token: token,
                        userInfo: adminInfo
                    });
                } else {
                    res.status(400).json({ message: "Email or password is wrong" });
                }
            } else {
                res.status(400).json({ message: "User with the provided email not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },


    signout: async (req, res) => {
        res.clearCookie('admintoken');
        res.status(200).json({
            message: 'Sigout sucessfully...!'
        })
    }

}