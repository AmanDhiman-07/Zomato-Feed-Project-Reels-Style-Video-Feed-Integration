const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
})

// POST - /api/food/ [protected] - Create a new food item only for food partners not for customers.

router.post("/",
    authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood);

// Get  /api/food/ [protected] - user scroll data 

router.get("/",
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems
)

module.exports = router;