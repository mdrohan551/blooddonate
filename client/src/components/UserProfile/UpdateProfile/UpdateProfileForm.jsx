import React, {useEffect, useState} from 'react';
import UserStore from "../../../store/UsersStore.js";
import {toast} from "react-toastify";
import CommonButton from "../../SignUpAndLogin/CommonButton.jsx";


const UpdateProfileForm = () => {
    const {UpdateProfileChange,UpdateProfileRequest,signForm,UserDetailsRequest}=UserStore();
    useEffect(() => {
        (async ()=>{
            await UserDetailsRequest()
        })()
    }, []);

     const handleSubmit =async (e) => {
         e.preventDefault();
         const errors = {
             firstName: "First name is required",
             lastName: "Last name is required",
             NIDNumber: "NID must be valid (10 to 17 digits)",
             bloodGroup: "Blood Group is required",
             phoneNumber: "Phone number must be valid (11 digits starting with 01)",
         };
         if (!signForm.firstName.trim()) {
             toast.error(errors.firstName)
             return;
         }
         if (!signForm.lastName.trim()) {
             toast.error(errors.lastName)
             return;
         }
         if (!signForm.NIDNumber.trim()) {
             toast.error(errors.NIDNumber)
             return;
         }
         if (!signForm.bloodGroup.trim()) {
             toast.error(errors.bloodGroup)
             return;
         }
         if (!signForm.phoneNumber.trim()) {
             toast.error(errors.phoneNumber)
             return;
         }

         let res = await UpdateProfileRequest(signForm)
         if(res.status==="success"){
             toast.success(res.message)
             await UserDetailsRequest()
         }

     }






    const blooddrop = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]

    return (<div className="col-12 updatecontainer">
            <h2>Update Profile</h2>

            <form  className="animated-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={signForm.firstName}  onChange={(e)=>UpdateProfileChange('firstName', e.target.value)}
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={signForm.lastName}    onChange={(e)=>UpdateProfileChange('lastName',e.target.value)}  required/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>NID Number</label>
                        <input type="text" name="NIDNumber" value={signForm.NIDNumber}   onChange={(e)=>UpdateProfileChange('NIDNumber',e.target.value)} required
                               maxLength="17"/>
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phoneNumber" value={signForm.phoneNumber} onChange={(e)=>UpdateProfileChange('phoneNumber',e.target.value)}
                               required/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Blood Group</label>
                    <select name="bloodGroup" value={signForm.bloodGroup} onChange={(e)=>UpdateProfileChange('bloodGroup',e.target.value)}   required>
                        <option value="">Select</option>
                        {
                            blooddrop.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))
                        }

                    </select>
                </div>
                <CommonButton  onClick={handleSubmit} text="Update" className="btn btn-danger fw-bolder text-uppercase"></CommonButton>
            </form>
        </div>);
};

export default UpdateProfileForm;
