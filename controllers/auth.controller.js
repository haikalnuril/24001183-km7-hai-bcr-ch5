const { users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                status: "Failed",
                message: "Please provide email and password",
                isSuccess: false,
                data: null,
            })
            
        }

        const user = await users.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                status: "Failed",
                message: "Email or Password is incorrect",
                isSuccess: false,
                data: null,
            });
        }
        
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                status: "Failed",
                message: "Email or Password is incorrect",
                isSuccess: false,
                data: null,
            });
        } else {
            const token = jwt.sign(
                {
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );
            res.status(200).json({
                status: "Success",
                message: "Login success",
                isSuccess: true,
                data: {
                    token,
                    user,
                },
            });
        }
        
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false,
            data: null,
        });
    }
};

const register = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({
                status: "Failed",
                message: "Please provide name, email, and password",
                isSuccess: false,
                data: null,
            })
            
        }

        const user = await users.create({
            name,
            email,
            password
        })

        res.status(200).json({
            status: "Success",
            message: "User created successfully",
            isSuccess: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false,
            data: null,
        });
    }
}

const currentUser = async (req, res) => {
    try {
        res.status(200).json({
            status: "Success",
            message: "User found",
            isSuccess: true,
            data: req.user,
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
            isSuccess: false,
            data: null,
        });
    }
}

module.exports = {
    login,
    register,
    currentUser
};
