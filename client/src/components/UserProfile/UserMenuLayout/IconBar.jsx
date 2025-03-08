import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import UserStore from "../../../store/UsersStore.js";
import { toast, ToastContainer } from "react-toastify";

const IconBar = ({ id, post }) => {
    const [scrolled, setScrolled] = useState(true); // প্রথমে true, অর্থাৎ bottomScroll থাকবে
    const { UserDetails, UserDetailsRequest } = UserStore();

    useEffect(() => {
        (async () => {
            await UserDetailsRequest();
        })();

        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            // 2% উইন্ডো হাইটের সমান কত সেটা বের করা
            const threshold = documentHeight * 0.1; 

            // যদি ইউজার স্ক্রল করে এবং পেজের নিচে যেতে 2% বা কম বাকি থাকে, তাহলে bottomScroll মুছে যাবে
            if (scrollTop + windowHeight >= documentHeight - threshold) {
                setScrolled(false); // স্ক্রল একদম নিচে চলে গেলে bottomScroll থাকবে না
            } else {
                setScrolled(true); // অন্যথায় bottomScroll থাকবে
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [UserDetailsRequest]);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* যদি স্ক্রল একদম নিচে না যায়, তাহলে bottomScroll থাকবে */}
                        <div className={`ProfileMenuLayout ${scrolled ? "bottomScroll" : ""}`}>
                            <ul className="d-flex  flex-lg-column">
                                <Link className="text-dark d-block" to="/">
                                    <li><i className="bi bi-house-door"> </i><span className="d-none d-lg-block">home</span></li>
                                </Link>
                                <Link  className="text-dark d-block" to="/user/post">
                                    <li><i className="bi bi-postcard"></i><span className="d-none d-lg-block">post</span></li>
                                </Link>
                                {UserDetails.verify === true ? (
                                    <Link className="text-dark d-block" to="/user/edit">
                                        <li><i className="bi bi-pencil-square"></i><span className="d-none d-lg-block">Update</span></li>
                                    </Link>
                                ) : (
                                    <Link id={id} className="text-dark d-block" to="/user/update">
                                        <li><i className="bi bi-pencil-square"></i><span className="d-none d-lg-block">create</span></li>
                                    </Link>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
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

export default IconBar;
