const mongoose = require("mongoose");

// Define Schema
const locationSchema = new mongoose.Schema({
    division: String,
    zila: [
        {
            name: String,
            upazilas: [String],
        },
    ],
},
{ timestamps: true, versionKey: false }
);

// Create Model
const LocationModel = mongoose.model("locations", locationSchema);

module.exports = LocationModel;