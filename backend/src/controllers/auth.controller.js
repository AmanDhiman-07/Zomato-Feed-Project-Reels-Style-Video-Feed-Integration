const userModule = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// userControllers
/////////////////////////
// register controller
const registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        const isUserAlreadyExists = await userModule.findOne({ email });

        if (isUserAlreadyExists) {
            return res.status(400).json({ meassge: "User already Exists.." });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // if (!isUserAlreadyExists) {

        const user = await userModule.create({
            fullname,
            email,
            password: hashPassword,
        });
        user.save();

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET);

        res.cookie("token", token)

        res.status(201).json({
            message: "User registerd successfully", user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email
            }
        })
        // }
    } catch (error) {
        console.log(error);
    }
};

// login controller

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModule.findOne({ email });

        // compare the email
        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" })
        }

        // campare the  password
        const isPasswordvalid = await bcrypt.compare(password, user.password);

        if (!isPasswordvalid) {
            return res.status(400).json({ message: "Invalid Email or Password" })
        }

        // token generated

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET)

        // save token in cookie
        res.cookie(token);

        res.status(201).json({
            message: "User login in successfully..",
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// logout controller

const logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    })
}

// foodPartnerControllers
/////////////////////////////
// registerFoodPartner

const registerFoodPartner = async (req, res) => {
    try {
        // Destructure body safely
        const { name, email, password, phone, contactName, address } = req.body || {};
        console.log("Received body:", req.body);

        // Validate all required fields
        if (!name || !email || !password || !phone || !contactName || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the email is already registered
        const existingFoodPartner = await foodPartnerModel.findOne({ email });
        if (existingFoodPartner) {
            return res.status(400).json({ message: "Food Partner account already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new food partner
        const foodPartner = await foodPartnerModel.create({
            name,
            email,
            password: hashedPassword, // ensure schema has 'password', not 'passowrd'
            phone,
            contactName,
            address
        });

        // Generate JWT token
        const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET, {
            expiresIn: "7d" // optional: token expiry
        });

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        // Send success response
        res.status(201).json({
            message: "Food partner registered successfully",
            foodPartner: {
                _id: foodPartner._id,
                name: foodPartner.name,
                email: foodPartner.email,
                address: foodPartner.address,
                contactName: foodPartner.contactName,
                phone: foodPartner.phone
            }
        });
    } catch (error) {
        console.error("Error in registerFoodPartner:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// loginFoodPartner

const loginFoodPartner = async (req, res) => {
    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
        return res.status(400).json({
            meassage: "Invalid email or password"
        })
    }

    const isPasswordvalid = await bcrypt.compare(password, foodPartner.passowrd)

    if (!isPasswordvalid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }


    const token = jwt.sign({
        id: foodPartner._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "Food parter logged in successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

// logoutFoodPartner

const logoutFoodPartner = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Food partner logged out successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}