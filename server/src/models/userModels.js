const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    DateOfBirth: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const currentDate = new Date();
          return currentDate.getFullYear() - value.getFullYear() >= 18;
        },
        message: "You must be at least 18 years old!",
      },
    },
    NIDNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^\d{10,17}$/.test(value);  // ✅ ১০ থেকে ১৭ ডিজিটের সংখ্যা অনুমোদন করবে
        },
        message: (props) => `${props.value} is not a valid NID number! It must be between 10 to 17 digits.`,
      },
    },    
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^01[3-9]\d{8}$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid Bangladeshi phone number!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    Email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    otp: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
