const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: {                     // changed from foodName → name
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    foodPartner: {               // fixed spelling
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner"
    }
});

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;
