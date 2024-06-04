const User = require('../models/UserModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.userVerification = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.json({ status: false });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.json({ status: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findById(decoded.id);
        if (user) {
            return res.json({ status: true, user: user.userName });
        } else {
            return res.json({ status: false });
        }
    } catch (err) {
        return res.json({ status: false });
    }
};
