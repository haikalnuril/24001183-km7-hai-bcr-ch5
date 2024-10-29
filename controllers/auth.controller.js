const {users} = require('../models');

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error('Please provide email and password');
        }

        const user = await users.findOne({where: {email}});
        if (!user) {
            return res.status(401).json({
                status: "Failed",
                message: "Email or Password is incorrect",
                isSuccess: false,
                data: null,
            });
        }
        const match = await user.matchPassword(password);
        if (!match) {
            return res.status(401).json({
                status: "Failed",
                message: "Email or Password is incorrect",
                isSuccess: false,
                data: null,
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Login success",
            isSuccess: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to login",
            isSuccess: false,
            data: null,
        });
    }
}

module.exports = {
    login,
};