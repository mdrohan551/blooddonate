const LocationModel = require("../models/locationModel");
const {
  GetDivisionsService,
  GetZilaService,
  GetUpzilaService,
} = require("../services/locationService");

exports.GetDivisionsController = async (req, res) => {
  let result = await GetDivisionsService(req);
  return res.status(200).json(result);
};

exports.GetZilaController = async (req, res) => {
  let result = await GetZilaService(req);
  return res.status(200).json(result);
};

exports.GetUpzilaController = async (req, res) => {
  let result = await GetUpzilaService(req);
  return res.status(200).json(result);
};

exports.GetController = async (req, res) => {
  try {
    const divisions = await LocationModel.find({}, { _id: 0 }); // সব division, zila, upazila আনবে
    let totalDivisions = divisions.length; // মোট Division সংখ্যা

    let totalZilas = 0;
    let totalUpazilas = 0;

    divisions.forEach((division) => {
      totalZilas += division.zila.length; // মোট Zila সংখ্যা
      division.zila.forEach((z) => {
        totalUpazilas += z.upazilas.length; // মোট Upazila সংখ্যা
      });
    });

    return res.status(200).json({
      status: "success",
      totalDivisions,
      totalZilas,
      totalUpazilas,
    });
  } catch (e) {
    return res.status(500).json({
      status: "fail",
      message: `Error fetching data: ${e.message}`,
    });
  }
};
