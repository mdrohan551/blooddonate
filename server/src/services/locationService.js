const locationModel = require("../models/locationModel");

// ✅ বিভাগসমূহ (Divisions) পাওয়ার সার্ভিস
const GetDivisionsService = async (req) => {
  try {
    const divisions = await locationModel.distinct("division");
    return {
      status: "success",
      count: divisions.length,
      divisions: divisions,
    };
  } catch (e) {
    console.error(`Error fetching divisions: ${e.message}`);
    return {
      status: "fail",
      message: `Error fetching divisions: ${e.message}`,
    };
  }
};

// ✅ নির্দিষ্ট বিভাগের জেলা (Zila) পাওয়ার সার্ভিস
const GetZilaService = async (req) => {
  try {
    const { division } = req.params;
    const result = await locationModel
      .findOne({ division })
      .select("zila.name -_id");

    if (!result) {
      return { status: "fail", message: "No zilas found for this division" };
    }

    return {
      status: "success",
      count: result.zila.length,
      zila: result.zila.map((z) => z.name),
    };
  } catch (e) {
    console.error(`Error fetching zilas: ${e.message}`);
    return { status: "fail", message: `Error fetching zilas: ${e.message}` };
  }
};

// ✅ নির্দিষ্ট জেলার উপজেলা (Upazila) পাওয়ার সার্ভিস
const GetUpzilaService = async (req) => {
  try {
    const { zila } = req.params;
    const result = await locationModel
      .findOne({ "zila.name": zila })
      .select("zila.$ -_id");

    if (!result || !result.zila.length) {
      return { status: "fail", message: "No upazilas found for this zila" };
    }

    return {
      status: "success",
      count: result.zila[0].upazilas.length,
      upazilas: result.zila[0].upazilas,
    };
  } catch (e) {
    console.error(`Error fetching upazilas: ${e.message}`);
    return { status: "fail", message: `Error fetching upazilas: ${e.message}` };
  }
};

module.exports = {
  GetDivisionsService,
  GetZilaService,
  GetUpzilaService,
};
