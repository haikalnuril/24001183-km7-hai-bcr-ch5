const { users } = require("../models");

const getUsers = async (req, res) => {
    try {
        const Users = await users.findAll({ paranoid: false });
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

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await users.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found",
                isSuccess: false,
                data: null,
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Success to get user",
            isSuccess: true,
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message,
            isSuccess: false,
            data: null,
        });
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please provide name, email, and password");
        }

        const user = await users.create({
            name,
            email,
            password,
            role
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

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;
        const user = await users.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found",
                isSuccess: false,
                data: null,
            })
        }

        const updateUser = await user.update({
            name,
            email,
            password,
            role
        })
        res.status(200).json({
            status: "Success",
            message: "Success to update user",
            isSuccess: true,
            data: updateUser,
        });
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message,
            isSuccess: false,
            data: null,
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await users.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found",
                isSuccess: false,
                data: null,
            })
        }

        await user.destroy({
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
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
