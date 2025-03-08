import React, { useState } from 'react';
import UserStore from "../../store/UsersStore.js";
import { DeleteAlert } from "../../utility/utility.js";
import {toast, ToastContainer,} from "react-toastify";

const ProfileDetails = () => {
    const { UserDetails, DeleteUserAccount, userLogOutRequest } = UserStore();
    const [showModal, setShowModal] = useState(false);  // State to manage modal visibility
    const [nid, setNid] = useState("");  // State to manage NID input

    const deleteAccount = async () => {
        let confirmed = await DeleteAlert();
        if (confirmed) {
            setShowModal(true);  // Show modal after delete confirmation
        }
    };

    const handleDeleteWithNid = async () => {
        if (!nid) {
            toast.error("Enter Your NID");
            return;
        }

        if (nid !== UserDetails.NIDNumber) {
            toast.error("Wrong NID! Please enter the correct one.");
            setNid('')
            return;
        }

        await userLogOutRequest();
        await DeleteUserAccount(UserDetails._id);
        setShowModal(false); // Close the modal after successful deletion
    };


    return (
        <div className="container">
            <div className="col-12 pt-3 pb-lg-0 pb-5">
                <div className="bioGrap bg-white rounded-4">
                    <div className="bioGrapContent p-3">
                        <div className="d-flex justify-content-between">
                            <h3>Bio Grap</h3>
                            <button className="btn btn-outline-danger px-1 py-0 p-0" onClick={deleteAccount}>Delete account</button>
                        </div>
                        <div className="bioData">
                            <div className="bioColumn">
                                <ul className="bioList">
                                    <li>
                                        <span className="label">First Name</span>
                                        <span className="value">: {UserDetails.firstName || "NOT FOUND"}</span>
                                    </li>
                                    <li>
                                        <span className="label">Address</span>
                                        <span className="value">
                                            : {UserDetails?.profile?.location?.CurrentAddress || "Not Found "}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="label">Phone</span>
                                        <span className="value">: {UserDetails.phoneNumber || "NOT FOUND"}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bioColumn">
                                <ul className="bioList">
                                    <li>
                                        <span className="label">Last Name</span>
                                        <span className="value">:{UserDetails.lastName || "NOT FOUND"}</span>
                                    </li>
                                    <li>
                                        <span className="label">Birthday</span>
                                        <span className="value">
                                            : {UserDetails.DateOfBirth ? new Date(UserDetails.DateOfBirth).toISOString().split("T")[0] : "NOT FOUND"}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="label">Email</span>
                                        <span className="value">{UserDetails.Email || "NOT FOUND"}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* NID Input Modal */}
            {showModal && (
                <div className="modal d-flex justify-content-evenly fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modaldi modal-sm modal-dialog-centered">
                        <div className="modal-content modalcon">
                            <div className="modal-header d-flex justify-content-center text-danger">
                                <h5 className="modal-title">Please Enter Your NID</h5>
                            </div>
                            <div className="modal-body text-center">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter NID"
                                    value={nid}
                                    onChange={(e) => setNid(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn btn-danger btn-sm" onClick={handleDeleteWithNid}>Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer
                position="top-center"
                autoClose={300}
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

export default ProfileDetails;
