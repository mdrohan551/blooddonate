import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import UserStore from "../store/UsersStore.js";

const AppNavbar = () => {
    const { isLogin, userLogOutRequest } = UserStore();
    const [scrolled, setScrolled] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [logoutSuccess, setLogoutSuccess] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        setShowLogoutModal(true);
        setTimeout(() => {
            setLogoutSuccess(true);
        }, 2000);
    };

    const confirmLogout =async () => {
        setShowLogoutModal(false);
        setLogoutSuccess(false);
        await userLogOutRequest();
    };

    return (
        <div id="header" className={scrolled ? "scrolled" : ""}>
            <nav className="container py-0 px-lg-0 main_menu navbar navbar-expand-lg">
                <div className="container px-1 px-lg-5 d-flex">
                    <a className="navbar-brand" href="#">
                        <img className="w-100 h-100" src="/images/FirstLogo.png" alt="Logo" />
                    </a>
                    <div id="navbarNav">
                        <ul className="d-flex gap-0 gap-lg-5">
                            <li className='menu'>
                                <Link to="/PostPage" name='post' className="gap-1 d-flex">
                                <i className="bi bi-file-post"></i><span>All Post</span>
                                </Link>
                            </li>
                            <li className='menu'>
                                <Link to="/" className="gap-1 d-flex">
                                    <i className="bi bi-house-door"></i><span>Home</span>
                                </Link>
                            </li>
                            <li className='menu'>
                                <Link to='/AllBloodPage' className="gap-1 d-flex">
                                    <i className="bi bi-person-vcard"></i><span>Donor</span>
                                </Link>
                            </li>
                            {isLogin() ? (
                                <>
                                    <li className='menu'>
                                        <Link to='/user' className="gap-2 d-flex">
                                            <i className="bi bi-person-square "></i>
                                            <span>Profile</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="gap-2 d-flex actionButton" to='' onClick={handleLogout}>
                                            <i className="bi bi-box-arrow-left "></i>
                                            <span className='ms-2'>Logout</span>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/Login-signin" className="gap-2 d-flex actionButton">
                                        <i className="bi bi-box-arrow-in-right"></i><span>Login</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

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

            {/* Bootstrap Style Mini Modal with Countdown */}
            {showLogoutModal && (
                <div className="modal d-flex justify-content-evenly fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog  modaldi modal-sm modal-dialog-centered">
                        <div className="modal-content modalcon ">
                            <div className="modal-header d-flex justify-content-center text-danger">
                                <h5 className="modal-title">
                                    {logoutSuccess ? "Logout Success!" : `Logging Out 2 second wait`}
                                </h5>
                            </div>
                            <div className="modal-body text-center">
                                {logoutSuccess ? <p>Successfully Logged Out!</p> : <p>Please wait...</p>}
                            </div>
                            <div className="modal-footer">
                                {logoutSuccess && (
                                    <button className="btn btn-success btn-sm" onClick={confirmLogout}>
                                        OK
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppNavbar;
