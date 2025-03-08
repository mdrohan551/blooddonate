import React, {useState} from "react";
import UserStore from "../../store/UsersStore.js";
import CreateButton from "./CreateButton.jsx";
import {toast, ToastContainer} from "react-toastify";
import TwoStepPopup from "./SurePopup/TwoStepPopup.jsx";
import {useNavigate} from "react-router-dom";


const MultiStepForm = () => {

    const navigate = useNavigate();
    const { divisonget, zilaget, Upzilaget } = UserStore();
    const [step, setStep] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const {
        ProfileForm,
        ProfileFormChange,
        ProfileCreateRequest,
        Emailget,
        EmailFormChange,
        UserOTPRequest,
        OTPFormValue,
        OTPFormChange,
        VerifyOtpRequest,
        UserDetailsRequest
    } = UserStore();
    const errors = {
        Division: "Division select please",
        zila: "zila select please",
        upzila: "upzila select please",
        CurrentAddress: "CurrentAddress write",
        Weight: "Weight write",
        HealthConditions: "HealthConditions select please",
        lastDonationTime: "lastDonationTime select please",
        email: "email required",
    };
    // audio
    const playAudio = (type) => {
        const audio = new Audio(type === "success" ? "/sound/success.mp3" : "/sound/fail.mp3");
        audio.play();
    };
    const nextStep = () => {
        // Step 1 Validation
        if (step === 1) {
            if (!ProfileForm.location.Division.trim()) {
                toast.error(errors.Division);
                playAudio("fail");
                return;
            }
            if (!ProfileForm.location.zila.trim()) {
                toast.error(errors.zila);
                playAudio("fail");
                return;
            }
            if (!ProfileForm.location.upzila.trim()) {
                toast.error(errors.upzila);
                playAudio("fail");
                return;

            }   if (!ProfileForm.location.CurrentAddress.trim()) {
                toast.error(errors.CurrentAddress);
                playAudio("fail");
                return;
            }
        }
        // Step 2 Validation
        if (step === 2) {
            if (!ProfileForm.HealthConditions) {
                toast.error(errors.HealthConditions);
                playAudio("fail");
                return;
            }
            if (!ProfileForm.lastDonationTime) {
                toast.error(errors.lastDonationTime);
                playAudio("fail");
                return;
            }
            if (ProfileForm.Weight <= 0 || isNaN(ProfileForm.Weight)) {
                toast.error(errors.Weight);
                playAudio("fail");
                return;
            }


        }


        setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };




    const handleOTPSubmit = async () => {
        if (!OTPFormValue.otp.trim()) {
            toast.error("OTP is required");
            playAudio("fail");
            return 
        }
    
        try {
            let res = await VerifyOtpRequest(OTPFormValue.otp);
            if (res.status === "success") {
                let create = await ProfileCreateRequest(ProfileForm);
                toast.success(res.message);
                toast.success(create.message);
                playAudio("success"); // Play success sound
                await UserDetailsRequest();
                navigate("/user/post");
    
                return true;
            } else {
                toast.error(res.message);
                playAudio("fail"); // Play failure sound
                return false;
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            playAudio("fail");
           return false;
        }
    };
    






    const handleEmailsubmit = async () => {
        if (!Emailget.email.trim()) {
            toast.error("Email is required");
            playAudio("fail");
            return;
        }

        try {
            let res = await UserOTPRequest(Emailget.email);
            if (res.status === "success") {
                toast.success("OTP Sent Successfully");

                nextStep();
            } else {
                toast.error(res.message);
                playAudio("fail"); // Play failure sound
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            playAudio("fail");
        }
    };



    return (
        <div className="mt-3">

            <div className="col-md-12">
                <div className="progress m-0  " style={{height: "3px"}}>
                    <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{width: `${(step / 4) * 100}%`}}
                        aria-valuenow={(step / 4) * 100}
                        aria-valuemin="100"
                        aria-valuemax="100"
                    >

                    </div>
                </div>
                <div className="card p-3">
                    <h3 className="text-center text-danger fw-bold ">Create Profile</h3>

                    {/* Step Progress Bar */}


                    <form >
                        {/* Step 1 */}
                        {step === 1 && (
                            <>

                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="form-label">Division</label>
                                        <select
                                            className="form-control custom-select"
                                            name="division"
                                            value={ProfileForm.location.Division}
                                            onChange={(e) => ProfileFormChange("Division", e.target.value, "location")} // Fixed this
                                            required
                                        >
                                            <option value=""> Division</option>
                                            {divisonget.map((item, index) => (
                                                <option key={index} value={item} className="custom-option">
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                    </div>


                                    <div className="col-md-6">
                                        <label className="form-label">Zila</label>
                                        <select
                                            className="form-control  custom-select"
                                            name="zila"
                                            value={ProfileForm.location.zila}
                                            onChange={(e) => ProfileFormChange("zila", e.target.value, "location")}
                                            required
                                        >
                                            <option value=""> Zila</option>
                                            {
                                                zilaget.map((item, index) => {
                                                    return <option key={index} value={item}
                                                                   className="custom-option">{item}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Upzila</label>
                                        <select
                                            className="form-control  custom-select"
                                            name="upzila"
                                            value={ProfileForm.location.upzila}
                                            onChange={(e)=>ProfileFormChange("upzila",e.target.value, "location")}
                                            required
                                        >
                                            <option value=""> Upzila</option>
                                            {
                                                Upzilaget.map((item, index) => {
                                                    return <option key={index} value={item}
                                                                   className="custom-option">{item}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Current Address</label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            name="currentAddress"
                                            value={ProfileForm.location.CurrentAddress}
                                            onChange={(e) => ProfileFormChange("CurrentAddress", e.target.value, "location")}
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-danger fw-bold text-uppercase w-100"
                                    onClick={nextStep}
                                >
                                    Next
                                </button>
                            </>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                            <>
                                <div className="row">

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Health Conditions</label>
                                        <select
                                            className="form-control"
                                            name="healthConditions"
                                            value={ProfileForm.HealthConditions}
                                            onChange={(e)=>ProfileFormChange("HealthConditions",e.target.value,)}
                                            required
                                        >
                                            <option value="">Select Health Condition</option>
                                            <option value="healthy">Healthy</option>
                                            <option value="diabetic">Diabetic</option>
                                            <option value="Medium">Medium</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Last donation time</label>
                                        <select
                                            className="form-control"
                                            name="lastDonationTime"
                                            value={ProfileForm.lastDonationTime}
                                            onChange={(e)=>ProfileFormChange("lastDonationTime", e.target.value,)}

                                            required
                                        >
                                            <option value="">lastDonationTime</option>
                                            <option value="0">NO Donate</option>
                                            <option value="3">3 month ago</option>
                                            <option value="12">1 Year ago</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Weight</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="weight"
                                            value={ProfileForm.Weight}
                                            onChange={(e)=>ProfileFormChange("Weight", e.target.value,)}

                                            required
                                        />
                                    </div>

                                </div>
                                <div className="d-flex">
                                    <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger fw-bold px-5 pt-2 pb-2 ms-2"
                                        onClick={nextStep}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Step 3 */}
                        {step === 3 && (
                            <>
                                <div className="pb-5 pt-4">
                                    <div className="row">
                                        <div className="col-md-12 mb-3 d-flex align-items-center flex-column">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={Emailget.email}
                                                onChange={(e)=>EmailFormChange("email",e.target.value)}

                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3 d-flex justify-content-center">
                                        <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                            Back
                                        </button>
                                        <CreateButton
                                            type="button"
                                            className="btn btn-danger text-uppercase fw-lg-bold px-5 pt-2 pb-2 ms-2"
                                            text="next"
                                            onClick={handleEmailsubmit}
                                        >
                                        </CreateButton>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Step 4 (OTP Verification) */}
                        {step === 4 && (
                            <>
                                <div className="pb-5 pt-4">
                                    <div className="row">
                                        <div className="col-lg-12 mb-3 d-flex align-items-center flex-column">
                                            <label className="form-label">OTP</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="otp"
                                                value={OTPFormValue.otp}
                                                onChange={(e)=>OTPFormChange("otp", e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3 d-flex justify-content-center">
                                        <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                            Back
                                        </button>
                                        <button
                                            className="btn btn-success fw-bold px-5 pt-2 pb-2 ms-2"
                                            onClick={() => setShowModal(true)}
                                            type="button"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
            {showModal && <TwoStepPopup onConfirm={handleOTPSubmit} onClose={() => setShowModal(false)} />}
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
            >
            </ToastContainer>
        </div>
    );
};

export default MultiStepForm;
