import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import UserStore from "../../store/UsersStore.js";

const NotVerifyPopup = () => {
    const [showModal, setShowModal] = useState(false);
    const {UserDetails} = UserStore();
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);

        }, 3500);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'auto'; // Restore scrolling
        };
    }, []);
    const handleClose = () => {
        setShowModal(false);

    };
    return (<Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={true} centered
                   className="custom-popup">
            {/* Rotating Close Icon */}
            <Modal.Body className="text-center">
                <h1 className="popup-title text-black">{UserDetails.lastName}</h1>
                <h1 className="fs-3 fw-semibold pt-2 pb-3 ">Create your  <span
                    className="text-primary fw-bold text-capitalize">profile<span
                    className="text-danger">!</span></span></h1>
                <p className="popup-text"><strong>মেয়ের</strong> সিজারের জন্য <b>রক্ত খোঁজেন</b>, আর <b>ছেলেকে</b> রক্ত
                    দিতে বারণ করেন? এই চিন্তাধারার পরিবর্তন দরকার!</p>
                <div className="popup-buttons">
                    <Link className="goverifiyed " to="/user/update" onClick={handleClose}>update<i
                        className="bi-arrow-right fs-5 ps-2"></i></Link>
                    <Button className="notVerify" onClick={handleClose}>No Thanks</Button>
                </div>
            </Modal.Body>
        </Modal>);
};

export default NotVerifyPopup;
