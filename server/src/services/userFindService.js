const userModel = require('../models/userModels');
const profileModel = require('../models/profileModel');
const mongoose = require('mongoose');



const AllUserprofileServices = async (req, res) => {
    try {
        let JoinWithProfileStage = {
            $lookup: {
              from: "profiles", // The collection name of profileModel
              localField: "_id", // Field in userModel
              foreignField: "UserID", // Field in profileModel
              as: "profile", // Alias for the combined data
            },
          };
          let UnwindStage = {
            $unwind: { path: "$profile", preserveNullAndEmptyArrays: true },
          };
          let ProjectionStage = {
            $project: {
              password: 0,
              otp: 0,
              createdAt: 0,
              updatedAt: 0,
              "profile._id": 0,
              "profile.UserID": 0,
              "profile.createdAt": 0,
              "profile.updatedAt": 0,
            },
          };
      
          let data = await userModel.aggregate([
            JoinWithProfileStage,
            UnwindStage,
            ProjectionStage,
          ]);
        return {status: "success", data: data};
    } catch (e) {
        return {status: "fail", message: `user not found${e}`};

    }
}

const CountBloodGroupUserServices = async (req, res) => {
    try {
        let GroupByBloodGroupStage = {
            $group: {
                _id: "$bloodGroup",
                count: { $sum: 1 },
            },
        };
        let SortStage = {
            $sort: { GrpName: 1 },
        };

        let ProjectStage = {
            $project: {
                GrpName: "$_id", 
                count: 1,
                _id: 0
            },
        };
        let TotalBloodCountStage = {
            $addFields: {
                totalBloodCount: { $sum: "$count" }, // Add a field to show the total blood count
            },
        };

        // Execute aggregation
        let data = await userModel.aggregate([
            GroupByBloodGroupStage,
            ProjectStage,
            SortStage,
            TotalBloodCountStage
        ]);
        return { status: "success", data: data };
    } catch (e) {
        return { status: "fail", message: `Error: ${e.message}` };
    }
};


const FindByBloodGroupServices = async (req,res)=>{
    try {
        let bloodGroup = req.params.bloodGroup;
        let matchStage = { $match: { bloodGroup: bloodGroup } };
        let JoinWithProfileStage = {
            $lookup: {
              from: "profiles", // The collection name of profileModel
              localField: "_id", // Field in userModel
              foreignField: "UserID", // Field in profileModel
              as: "profile", // Alias for the combined data
            },
          };
          let UnwindStage = {
            $unwind: { path: "$profile", preserveNullAndEmptyArrays: true },
          };
          let ProjectionStage = {
            $project: {
              password: 0,
              otp: 0,
              createdAt: 0,
              updatedAt: 0,
              "profile._id": 0,
              "profile.UserID": 0,
              "profile.createdAt": 0,
              "profile.updatedAt": 0,
            },
          };
      
          let data = await userModel.aggregate([
            matchStage,
            JoinWithProfileStage,
            UnwindStage,
            ProjectionStage,
          ]);
          if (data.length > 0) {
            return{ status: "success", data: data,count:data.length };
        } else {
            return {
                status: "fail", message: "No users found in the specified bloodGroup"
            };
        }
    } catch (e) {
        return {status: "fail", message: `user not found${e}`};
    }
}

const FindByDivisionServices = async (req, res) => {
    try {
        let {Division} = req.params;

        let matchStage = { $match: { "location.Division": Division } };

        let JoinWithProfileStage = {
            $lookup: {
              from: "users",  // Users collection name
              localField: "UserID",  // The field from profileModel
              foreignField: "_id", // The field from users model
              as: "user" // Alias for the combined data
            },
        };

        let UnwindStage = {
            $unwind: {
                path: "$user", 
                preserveNullAndEmptyArrays: true 
            },
        };

        let ProjectionStage = {
            $project: {
                UserID: 0,
                createdAt: 0,
                updatedAt: 0,
                "user._id": 0,
                "user.password": 0,
                "user.otp": 0,
                "user.createdAt": 0,
                "user.updatedAt": 0,
            },
        };

        let data = await profileModel.aggregate([
            matchStage,
            JoinWithProfileStage,
            UnwindStage,
            ProjectionStage
        ]);

        if (data.length > 0) {
            return{ status: "success", data: data,count:data.length };
        } else {
            return {
                status: "fail", message: "No users found in the specified division"
            };
        }
    } catch (e) {
        // Catch any errors and respond with a failure message
        return {
            status: "fail", message: `Error fetching user by division: ${e.message}`
        };
    }
};

const FindByZilaServices = async (req, res) => {
    try {
        let { zila } = req.params;

        let matchStage = { $match: { "location.zila": zila } };

        let JoinWithProfileStage = {
            $lookup: {
              from: "users",  // Users collection name
              localField: "UserID",  // The field from profileModel
              foreignField: "_id", // The field from users model
              as: "user" // Alias for the combined data
            },
        };

        let UnwindStage = {
            $unwind: {
                path: "$user", 
                preserveNullAndEmptyArrays: true 
            },
        };

        let ProjectionStage = {
            $project: {
                UserID: 0,
                createdAt: 0,
                updatedAt: 0,
                "user._id": 0,
                "user.password": 0,
                "user.otp": 0,
                "user.createdAt": 0,
                "user.updatedAt": 0,
            },
        };

        let data = await profileModel.aggregate([
            matchStage,
            JoinWithProfileStage,
            UnwindStage,
            ProjectionStage
        ]);

        if (data.length > 0) {
            return{ status: "success", data: data,count:data.length };
        } else {
            return {
                status: "fail", message: "No users found in the specified zila"
            };
        }
    } catch (e) {
        return {
            status: "fail", message: `Error fetching user by zila: ${e.message}`
        };
    }
};

const FindByUpzilaServices = async (req, res) => {
    try {
        let { upzila } = req.params;

        let matchStage = { $match: { "location.upzila": upzila } };

        let JoinWithProfileStage = {
            $lookup: {
              from: "users",  // Users collection name
              localField: "UserID",  // The field from profileModel
              foreignField: "_id", // The field from users model
              as: "user" // Alias for the combined data
            },
        };

        let UnwindStage = {
            $unwind: {
                path: "$user", 
                preserveNullAndEmptyArrays: true 
            },
        };

        let ProjectionStage = {
            $project: {
                UserID: 0,
                createdAt: 0,
                updatedAt: 0,
                "user._id": 0,
                "user.password": 0,
                "user.otp": 0,
                "user.createdAt": 0,
                "user.updatedAt": 0,
            },
        };

        let data = await profileModel.aggregate([
            matchStage,
            JoinWithProfileStage,
            UnwindStage,
            ProjectionStage
        ]);

        if (data.length > 0) {
            return{ status: "success", data: data,count:data.length };
        } else {
            return {
                status: "fail", message: "No users found in the specified upzila"
            };
        }
    } catch (e) {
        return {
            status: "fail", message: `Error fetching user by upzila: ${e.message}`
        };
    }
};

const FindByNameService = async (req,res) => {
    try{
        let SearchRegex = {$regex: req.params.Keyword, $options: "i"};
        let SearchParams = [{ firstName: SearchRegex }, { lastName: SearchRegex }];
        let SearchQuery = { $or: SearchParams };
        let MatchStage = { $match: SearchQuery };

        let JoinWithProfileStage = {
            $lookup: {
              from: "profiles", // The collection name of profileModel
              localField: "_id", // Field in userModel
              foreignField: "UserID", // Field in profileModel
              as: "profile", // Alias for the combined data
            },
          };
          let UnwindStage = {
            $unwind: { path: "$profile", preserveNullAndEmptyArrays: true },
          };
          let ProjectionStage = {
            $project: {
              password: 0,
              otp: 0,
              createdAt: 0,
              updatedAt: 0,
              "profile._id": 0,
              "profile.UserID": 0,
              "profile.createdAt": 0,
              "profile.updatedAt": 0,
            },
          };
      
          let data = await userModel.aggregate([
            MatchStage,
            JoinWithProfileStage,
            UnwindStage,
            ProjectionStage,
          ]);
        if (data.length > 0) {
            return{ status: "success", data: data,count:data.length };
        } else {
            return {
                status: "fail", message: "No users found in the specified Keyword"
            };
        }

    }catch(e){
        return {status: "fail", message: `Error fetching user by name: ${e.message}`};
    }
}


module.exports = {
    AllUserprofileServices,
    FindByBloodGroupServices,
    FindByDivisionServices,
    FindByZilaServices,
    FindByUpzilaServices,
    FindByNameService,
    CountBloodGroupUserServices
}