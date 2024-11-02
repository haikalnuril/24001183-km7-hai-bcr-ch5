const { users } = require("../models");

const getUsers = async (req, res) => {
    try {
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
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please provide name, email, and password");
        }

        const user = await users.create({
            name,
            email,
            password,
        });
        res.status(201).json({
            status: "Success",
            message: "Success to create user",
            isSuccess: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to create user",
            isSuccess: false,
            data: null,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await users.findByPk(id, { paranoid: false });
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        await user.restore({
            where: {
                id,
            },
        });
        res.status(200).json({
            status: "Success",
            message: "Success to delete user",
            isSuccess: true,
            data: null,
        });
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message,
            isSuccess: false,
            data: null,
        });
    }
};

module.exports = {
    getUsers,
    createUser,
    deleteUser,
};
