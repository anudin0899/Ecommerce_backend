const USER = require('../../Models/userModel');
const { hashData, verifyHashedData } = require('../../Utilities/hashData');

module.exports = {

    //signup
    signUp: async (req, res) => {
        try {
            let { firstName, lastName, userName, email, phoneNumber, password } = req.body;
            const userInfo = await USER.findOne({ email: email });

            if (!userInfo) {
                const hashedPassword = await hashData(password);
                const userTemplate = new USER({
                    firstName: firstName,
                    lastName: lastName,
                    userName: userName || "",
                    phoneNumber:phoneNumber,
                    email: email,
                    password: hashedPassword,
                    role: "user",
                });
                await userTemplate.save();
                res.status(200).json({ message: "User created" });
            } else {
                res.status(400).json({ message: "Email Already Exist" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something Went Wrong" });
        }
    }
}