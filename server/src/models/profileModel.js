const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    location: {
      Division: { type: String, required: true },
      zila: { type: String, required: true },
      upzila: { type: String, required: true },
      CurrentAddress: { type: String, required: true },
    },
    Weight: {
      type: String,
      required: false,
    },
    HealthConditions: {
      type: String,
      required: false,
    },
    lastDonationTime: {
      type: Date,
      default: null,
    },
    DonationChek: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const profileModel = mongoose.model("profiles", profileSchema);

module.exports = profileModel;
