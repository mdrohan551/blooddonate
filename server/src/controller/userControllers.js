// RegisterUser
const {
    registrationServices,
    loginServices,
    SaveProfileService,
    ProfileDetailsReadServices,
    AllUserprofileServices,
    verified, GetEmail,

    ProfileUpdateServices,
    deleteUserServices
} = require("../services/userService");

// user registration
exports.register = async (req, res) => {
    let result = await registrationServices(req)
    return res.status(200).json(result)
};


// user login
// set cookies in browser
exports.login = async (req, res) => {
    let result = await loginServices(req);

    if (result['status'] === "success") {
        // cookieOption
        let cookieOptions = {expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: false};
        res.cookie('token', result['token'], cookieOptions); // কুকিতে শুধু টোকেন সেভ
        return res.status(200).json(result);
    }else{
        return res.status(200).json(result);
    }
}


exports.logout = async (req, res) => {
    //Cookies destroy 
    let cookieOptions = {expires: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), httpOnly: false};
    //Set the cookie with Response
    res.cookie('token', "", cookieOptions);
    return res.status(200).json({status:"success", message:"User logged out successfully."});

}


// user profile Create
exports.CreateProfile = async(req,res)=>{
    let result = await SaveProfileService(req);
    return res.status(200).json(result);
}

// user profile Read
exports.ProfileDetails = async (req, res) => {
    let result = await ProfileDetailsReadServices(req)
    return res.status(200).json(result)
}

// Email Verification code Send 
exports.OTPRequest = async (req, res) => {
    let result = await GetEmail(req)
    return res.status(200).json(result)
}
// verified code user check
exports.verified = async (req, res) => {
    let result = await verified(req)
    return res.status(200).json(result)
}
// update user Profile
exports.updateUserProfile = async (req, res) => {
    let result = await ProfileUpdateServices(req)
    return res.status(200).json(result)
}
// Delete user 
exports.DeleteUser = async (req, res) => {
    let result = await deleteUserServices(req)
    return res.status(200).json(result)
}









