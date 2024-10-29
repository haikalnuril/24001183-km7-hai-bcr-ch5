const {users} = require('../models');

const getUsers = async (req, res) => {
    try{
        const Users = await users.findAll();
        res.status(200).json({
            status: "Success",
            message: "Success to get users",
            isSuccess: true,
            data: Users,
        });
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to get users",
            isSuccess: false,
            data: null,
        });
    }
}

module.exports = {
    getUsers,
}