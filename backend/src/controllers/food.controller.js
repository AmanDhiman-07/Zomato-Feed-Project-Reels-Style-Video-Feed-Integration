const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

const createFood = async (req, res) => {
    try {
        // upload file to cloud
        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

        // create food item
        const foodItem = await foodModel.create({
            name: req.body.name,                      // now matches schema
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner?._id         // fixed spelling
        });

        return res.status(201).json({
            message: "Food created successfully",
            food: foodItem
        });
    } catch (error) {
        console.error("Error creating food:", error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};


const getFoodItems = async (req, res) => {
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food items fetched successfully..",
        foodItems
    })
}

module.exports = {
    createFood,
    getFoodItems
};


//  for yhe big application we use daoo file format in daao file in server and database interaction is svae in daoo file so this is used in interaction purpose
//  and validation in data is requred use express validater use.