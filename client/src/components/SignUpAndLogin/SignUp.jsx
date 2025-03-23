import React, { useState } from "react";
import UserStore from "../../store/UsersStore.js";
import { FailAlert, SuccessAlert } from "../../utility/utility.js";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker"; // Import the date picker
import "react-datepicker/dist/react-datepicker.css"; // Import the default CSS

const SignUp = (props) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const { signForm, signFormChange, completeRegistrationForm } = UserStore();
    // State for the custom date picker
    const [startDate, setStartDate] = useState(
        signForm.DateOfBirth ? new Date(signForm.DateOfBirth) : null
    );

    // Handle date change for the custom date picker
    const handleDateChange = (date) => {
        setStartDate(date); // Update local state
        signFormChange("DateOfBirth", date.toISOString().split("T")[0]); // Update form state in "YYYY-MM-DD" format
    };

    const nextStep = () => {
        const errors = {
            firstName: "First name is required",
            lastName: "Last name is required",
            Gender: "Gender is required",
            DateOfBirth: "Date of Birth is required",
            NIDNumber: "NID must be valid (10 to 17 digits)",
            phoneNumber: "Phone number must be valid (11 digits starting with 01)",
        };

        // Step 1 Validation
        if (step === 1) {
            if (!signForm.firstName.trim()) {
                toast.error(errors.firstName);
                return;
            }
            if (!signForm.lastName.trim()) {
                toast.error(errors.lastName);
                return;
            }
            if (!signForm.NIDNumber.trim()) {
                toast.error(errors.NIDNumber);
                return;
            }
        }
        // Step 2 Validation
        if (step === 2) {
            if (!signForm.DateOfBirth) {
                toast.error(errors.DateOfBirth);
                return;
            }
            if (!signForm.Gender) {
                toast.error(errors.Gender);
                return;
            }
            if (!signForm.bloodGroup) {
                toast.error("Blood group is required");
                return;
            }
        }
        // Step 3 Validation
        if (step === 3) {
            if (!/^01[3-9]\d{8}$/.test(signForm.phoneNumber)) {
                toast.error(errors.phoneNumber);
                return;
            }
            if (!signForm.password.trim()) {
                toast.error("Password is required");
                return;
            }
        }
        if (step < 3) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };
    const FinalRegistration = async (event) => {
        event.preventDefault();
        setLoading(true);

        const validatePassword = (password) => {
            const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(.{6,20})$/;
            if (!password) return "Password is required";
            if (!passwordRegex.test(password)) return "Password must be at least 6 characters, contain a capital letter, a number, and a special character";
            return "";
        };
        const passwordError = validatePassword(signForm.password);
        if (passwordError) {
            setLoading(false);
            toast.error(passwordError);
            return;
        }
        let res = await completeRegistrationForm(signForm);
        if (res.status === 'success') {
            await SuccessAlert(res.message);
            setLoading(false);
            navigate("/Login-signin");
            props.click();
        } else {
            await FailAlert(res.message);
            setLoading(false);
        }
    };
    const bloodGrupe = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

    return (
        <div className="container signUp mt-0 mt-lg-5 d-flex justify-content-center align-items-center">
            <div className="form-container signUpContainer shadow-sm rounded">
                {/* Progress System */}
                <div className="d-flex align-items-center justify-content-center mb-4">
                    <div className="d-flex align-items-center">
                        <div className={`circle ${step >= 1 ? "active" : ""}`}>1</div>
                        <div className={`line ${step >= 2 ? "active" : ""}`}></div>
                        <div className={`circle ${step >= 2 ? "active" : ""}`}>2</div>
                        <div className={`line ${step >= 3 ? "active" : ""}`}></div>
                        <div className={`circle ${step === 3 ? "active" : ""}`}>3</div>
                    </div>
                </div>

                <h2 className="text-center mb-4">Registration Form</h2>
                <form>
                    {step === 1 && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    placeholder="Enter your first name"
                                    onChange={(e) => signFormChange("firstName", e.target.value)}
                                    value={signForm.firstName}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder="Enter your last name"
                                    onChange={(e) => signFormChange("lastName", e.target.value)}
                                    value={signForm.lastName}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="NIDNumber" className="form-label">NID Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="NIDNumber"
                                    placeholder="Enter your NID number"
                                    onChange={(e) => signFormChange("NIDNumber", e.target.value)}
                                    value={signForm.NIDNumber}
                                />
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="DateOfBirth" className="form-label">Birth</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy" // Customize date format
                                    className="form-control " // Bootstrap class for styling
                                    id="DateOfBirth"
                                    placeholderText="Select a date"
                                    isClearable // Allow clearing the date
                                    showYearDropdown // Show year dropdown
                                    showMonthDropdown // Show month dropdown
                                    dropdownMode="select" // Dropdown mode for year and month
                                    maxDate={new Date()} // Restrict future dates
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Gender" className="form-label">Gender</label>
                                <select
                                    className="form-control"
                                    id="Gender"
                                    onChange={(e) => signFormChange("Gender", e.target.value)}
                                    value={signForm.Gender}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bloodGroup" className="form-label">Blood Group</label>
                                <select
                                    className="form-control"
                                    id="bloodGroup"
                                    onChange={(e) => signFormChange("bloodGroup", e.target.value)}
                                    value={signForm.bloodGroup}
                                >
                                    <option value="">Select Blood Group</option>
                                    {bloodGrupe.map((group, index) => (
                                        <option key={index} value={group}>{group}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phoneNumber"
                                    placeholder="Enter your phone number"
                                    onChange={(e) => signFormChange("phoneNumber", e.target.value)}
                                    value={signForm.phoneNumber}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter your password"
                                    onChange={(e) => signFormChange("password", e.target.value)}
                                    value={signForm.password}
                                />
                            </div>
                        </>
                    )}

                    {/* Navigation Buttons */}
                    <div className="d-flex justify-content-center justify-content-md-between mt-3 p-0 p-lg-5 gap-3">
                        {step > 1 && (
                            <button
                                type="button"
                                className="btn btn-danger px-4 py-2 fw-bold fs-5 text-uppercase"
                                onClick={prevStep}
                            >
                                Back
                            </button>
                        )}
                        {step < 3 && (
                            <button
                                type="button"
                                className="btn btn-primary px-4 py-2 fw-semibold fs-5 text-uppercase"
                                onClick={nextStep}
                            >
                                Next
                            </button>
                        )}
                        {step === 3 && (
                            <button
                                className="btn btn-success px-4 py-2 fw-semibold fs-5 text-uppercase"
                                disabled={loading}
                                onClick={FinalRegistration}
                            >
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default SignUp;