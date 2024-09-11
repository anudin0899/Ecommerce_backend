const USER = require('../../Models/userModel');
const { hashData } = require('../../Utilities/hashData');
const shortId = require("shortid");


module.exports = {

    //signup
    signUp: async (req, res) => {
        try {
            let { firstName, lastName, email, password } = req.body;

            // Use await to properly handle asynchronous operation
            const userInfo = await USER.findOne({ email: email });

            if (!userInfo) {
                const hashedPassword = await hashData(password);
                const userTemplate = new USER({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    userName:shortId.generate(),
                    password: hashedPassword,
                    role: "admin",
                });
                await userTemplate.save();
                res.status(200).json({ message: "Admin created" });
            } else {
                console.log(userInfo, "userInfo");
                res.status(400).json({ message: "Admin email already exist" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something Went Wrong" });
        }
    }
}