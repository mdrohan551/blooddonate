// RegisterUser
const {
    AllUserprofileServices,
    FindByBloodGroupServices,
    FindByDivisionServices,
    FindByZilaServices,
    FindByUpzilaServices, 
    FindByNameService,
    CountBloodGroupUserServices
} = require("../services/userFindService");

// All Users Find 
exports.findByAllUsers = async (req, res) => {
    let result = await AllUserprofileServices(req)
    return res.status(200).json(result)
}

// Count Blood Groups Find Users
exports.CountBloodGroupUser = async (req, res) => {
    let result = await CountBloodGroupUserServices(req)
    return res.status(200).json(result)
}

//Find By Blood Group
exports.findByBloodGroup = async (req, res) => {
    let result = await FindByBloodGroupServices(req)
    return res.status(200).json(result)
}

//Find By Division
exports.findByDivision = async (req, res) => {
    let result = await FindByDivisionServices(req)
    return res.status(200).json(result)
}

//Find By Zila
exports.findByZila = async (req, res) => {
    let result = await FindByZilaServices(req)
    return res.status(200).json(result)
}
//Find By Upzila
exports.findByUpzila = async (req, res) => {
    let result = await FindByUpzilaServices(req)
    return res.status(200).json(result)
}
//Find By Name
exports.findByName = async (req, res) => {
    let result = await FindByNameService(req)
    return res.status(200).json(result)
}







