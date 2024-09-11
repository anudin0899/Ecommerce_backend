const ADDRESS = require("../../Models/address");

module.exports = {

    addAddress: async (req, res) => {
        const { payload } = req.body;
        try {
            if (payload.address) {
                const address = await ADDRESS.findOneAndUpdate({ user: req.decodedToken._doc._id },
                    {
                        "$push": {
                            "address": payload.address
                        }
                    }, { new: true, upsert: true }).exec()
                if (address) {
                    res.status(200).json({ address });
                } else {
                    res.status(400).json({ error: "params not found" });
                }
            }
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    },

    getAddress: async (req, res) => {
        try {
            const userAddress = await ADDRESS.findOne({ user: req.decodedToken._doc._id }).exec();
            if (userAddress) {
                res.status(200).json({ userAddress });
            } else {
                res.status(400).json({ error: "Address not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    }
}