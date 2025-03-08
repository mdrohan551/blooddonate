import {create} from 'zustand';
import axios from 'axios';
import cookie from "js-cookie"
import {getEmail, setEmail, unauthorized} from "../utility/utility.js";
import ProfileForm from "../components/UserProfile/ProfileForm.jsx";

const UserStore = create((set) => ({
    isFormSubmit: false,
    // totalblood grupe
    totalBlood: {},
    BloodGroupe: {},
    BloodgrupeRequest: async () => {

        let res = await axios.get('/api/v1/CountBloodGroupUser');
        if (res.data['status'] === "success") {
            // Set the data to the appropriate states
            set({BloodGroupe: res.data['data']});
            set({totalBlood: res.data['data']});
        }

    },
    // Get all user
    userList: [], // ইনিশিয়াল ভ্যালু খালি অ্যারে
    AllUSerRequest: async () => {
        try {
            let res = await axios.get('/api/v1/findByAllUsers');
            if (res.data['status'] === 'success') {
                set({userList: res.data['data']});
            }
        } catch (error) {
            console.error("All Users API error:", error);
        }
    },

    // create user=============================================================Sign up===================================================

    signForm: {
        firstName: "",
        lastName: "",
        Gender: "",
        DateOfBirth: "",
        NIDNumber: "",
        phoneNumber: "",
        password: "",
        bloodGroup: ""
    },
    signFormChange: (name, value) => {
        set((state) => ({
            signForm: {
                ...state.signForm,
                [name]: value
            }
        }));
    },
    completeRegistrationForm: async (postBody) => {

        const res = await axios.post('/api/v1/registration', postBody);
        if (res.data['status'] === 'success') {
            set({
                signForm: {
                    firstName: "",
                    lastName: "",
                    Gender: "",
                    DateOfBirth: "",
                    NIDNumber: "",
                    phoneNumber: "",
                    password: "",
                    bloodGroup: ""
                }
            });
            return res.data
        } else {
            return res.data
        }

    },

    UpdateProfileChange: (name, value) => {
        set((state) => ({
            signForm: {
                ...state.signForm,
                [name]: value
            }
        }));
    },
    UpdateProfileRequest: async (postBody) => {
        set({isFormSubmit: true});
        const res = await axios.post('/api/v1/ProfileUpdate', postBody);
        if (res.data['status'] === 'success') {
            set({isFormSubmit: false});
            return res.data
        } else {
            set({isFormSubmit: false});
            return res.data
        }
    },

    // Login user
    LoginFormValue: {phoneNumber: "", password: ""},
    LoginFormChange: (name, value) => {
        set((state) => ({
            LoginFormValue: {
                ...state.LoginFormValue,
                [name]: value
            }
        }))
    },
    SubmitLogin: async (loginForm) => {
        set({isFormSubmit: true});
        let res = await axios.post('/api/v1/login', loginForm)
        set({isFormSubmit: false});
        if (res.data['status'] === 'success') {
            set({LoginFormValue: {phoneNumber: "", password: ""}});
            return res.data;
        } else {
            return res.data;
        }

    },
    //User Details
    UserDetails: [],
    UserDetailsRequest: async () => {
        let res = await axios.get('/api/v1/ProfileDetails');
        if (res.data['status'] === 'success') {
            set({UserDetails: res.data['data']});
            set({signForm: res.data['data']});
            return true

        } else {
            set({UserDetails: res.data['data']});
            return false
        }
    },
    isLogin: () => {
        if (cookie.get('token')) {
            return true
        } else {
            return false
        }
    },
    // userLogOut
    userLogOutRequest: async () => {
        set({isFormSubmit: true});
        let res = await axios.get('/api/v1/logout');
        set({isFormSubmit: false});
        if (res.data['status'] === 'success') {
            cookie.remove('token');
            unauthorized(res.data.status)
            return true
        } else {
            return false
        }
    },

// UserProfile form
    ProfileForm: {
        location: {
            Division: "",
            zila: "",
            upzila: "",
            CurrentAddress: ""
        },
        Weight: "",
        HealthConditions: "",
        lastDonationTime: "",
        DonationChek: "NO"
    },
    ProfileFormChange: (name, value, parent = null) => {
        set((state) => {
            let updatedProfile = {...state.ProfileForm};
            if (parent) {
                updatedProfile[parent] = {
                    ...updatedProfile[parent],
                    [name]: value
                };
            } else {
                updatedProfile[name] = value;
            }
            // যদি Division পরিবর্তন হয়, তাহলে Zila API কল করবো
            if (name === "Division" && parent === "location") {
                state.zilagetRequest(value);  // নতুন Division অনুযায়ী Zila API কল
                updatedProfile.location.zila = "";  // আগের Zila মুছবো
                updatedProfile.location.upzila = "";  // আগের Upzila মুছবো
            }
            // যদি Zila পরিবর্তন হয়, তাহলে Upzila API কল করবো
            if (name === "zila" && parent === "location") {
                state.UpzilagetRequest(value);  // নতুন Zila অনুযায়ী Upzila API কল
                updatedProfile.location.upzila = ""; // আগের Upzila মুছবো
            }
            return {ProfileForm: updatedProfile};
        });
    },


    divisonget: [],
    divisonRequest: async () => {
        const res = await axios.get('/api/v1/GetDivisions');
        if (res.data['status'] === 'success') {
            set({divisonget: res.data['divisions']});

        } else {
            return res.data
        }
    },

    zilaget: [],
    zilagetRequest: async (selectedDivision) => {
        try {
            const res = await axios.get(`/api/v1/GetZila/${selectedDivision}`);
            if (res.data['status'] === 'success') {
                set({zilaget: res.data['zila']});
            }
        } catch (error) {
            return error
        }
    },

    //
    Upzilaget: [],
    UpzilagetRequest: async (selectedZila) => {
        try {
            // আগের ডাটা মুছতে Upzilaget ফাঁকা করি
            set({Upzilaget: []});

            const res = await axios.get(`/api/v1/GetUpzila/${selectedZila}`);
            if (res.data['status'] === 'success') {
                set({Upzilaget: res.data['upazilas']});
            }
        } catch (error) {
            return error
        }
    },


    ProfileCreateRequest: async (postBody) => {
        try {
            const res = await axios.post('/api/v1/CreateProfile', postBody);
            if (res.data['status'] === 'success') {
                set({
                    ProfileForm: {
                        location: {
                            Division: "",
                            zila: "",
                            upzila: "",
                            CurrentAddress: ""
                        },
                        Weight: "",
                        HealthConditions: "",
                        lastDonationTime: "",
                    }
                });
                return res.data;
            } else {
                return res.data;
            }
        } catch (e) {
            console.error(e);
        }
    },
// OTP verify
    Emailget: {email: ""},
    EmailFormChange: (name, value) => {
        set((state) => ({
            Emailget: {
                ...state.Emailget,
                [name]: value
            }
        }))
    },
    UserOTPRequest: async (email) => {
        set({isFormSubmit: true});
        let res = await axios.get(`/api/v1/UserOTP/${email}`)
        setEmail(email);
        set({isFormSubmit: false});
        if (res.data['status'] === 'success') {
            return res.data;
        } else {
            return res.data
        }
    },
    OTPFormValue: {otp: ""},
    OTPFormChange: (name, value) => {
        set((state) => ({
            OTPFormValue: {
                ...state.OTPFormValue,
                [name]: value
            }
        }))
    },
    VerifyOtpRequest: async (otp) => {
        set({isFormSubmit: true});
        let email = getEmail()
        let res = await axios.get(`/api/v1/VerifyLogin/${email}/${otp}`);
        set({isFormSubmit: false});
        if (res.data['status'] === 'success') {
            return res.data;
        } else {
            return res.data
        }
    },
   DonnerList:[],
    GetDonnerbyDivision: async (division) => {
        set({isFormSubmit: true});
        try {
            const res = await axios.get(`/api/v1/findByDivision/${division}`);
            if (res.data['status'] === 'success' && res.data['data'].length > 0) {
                set({ DonnerList: res.data['data'] }); // ডেটা পেলে DonnerList আপডেট করুন
                set({isFormSubmit: false});
            } else {
                set({ DonnerList: [] }); // কোনো ডেটা না পেলে DonnerList খালি করুন
                set({isFormSubmit: false});
                return res.data;
            }
        } catch (e) {
            set({ DonnerList: [] }); // এরর হলে DonnerList খালি করুন
        }
    },
    GetDonnerbyzila: async (zila) => {

        try {
            const res = await axios.get(`/api/v1/findByZila/${zila}`)
            if (res.data['status'] === 'success') {
                set({DonnerList: res.data['data']})
            }else {
                set({ DonnerList: [] }); // কোনো ডেটা না পেলে DonnerList খালি করুন
                return res.data;
            }
        } catch (e) {

            set({ DonnerList: [] }); // এরর হলে DonnerList খালি করুন

        }

    },
    GetDonnerbyupzila: async (upzila) => {

        try {
            const res = await axios.get(`/api/v1/findByUpzila/${upzila}`)
            if (res.data['status'] === 'success') {
                set({DonnerList: res.data['data']})
            }else {
                set({ DonnerList: [] }); // কোনো ডেটা না পেলে DonnerList খালি করুন
                return res.data;
            }
        } catch (e) {
            set({ DonnerList: [] }); // এরর হলে DonnerList খালি করুন
        }
    },
    DeleteUserAccount: async (user) => {
        try {
            let res = await axios.post(`/api/v1/DeleteUser/${user}`); // ✅ DELETE Method ব্যবহার করা হলো
            if (res.data['status'] === 'success') {
                return res.data;
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }


}));
export default UserStore;
