const foodParterModel = require("../models/foodPartner.model");
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");


const authFoodPartnerMiddleware = async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first..."
        })
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await foodParterModel.findById(decoded.id);

        req.foodPartner = foodPartner

        next();

    } catch (error) {
        return res.status(400).json({
            message: "Invalid token"
        })
    };

};

const authUserMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first..."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        req.user = user

        next();

    } catch (error) {
        return res.status(400).json({
            message: "Invalid token"
        })
    };

}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}