import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
const AfterLoginIcon = () => {
    const [scrolled, setScrolled] = useState(true);
    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const threshold = documentHeight * 0.1;
            if (scrollTop + windowHeight >= documentHeight - threshold) {
                setScrolled(false);
            } else {
                setScrolled(true);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div>
            <div className="container mt-5 ">
                <div className="row">
                    <div className="col-12">
                        {/* যদি স্ক্রল একদম নিচে না যায়, তাহলে bottomScroll থাকবে */}
                        <div className={`ProfileMenuLayout ${scrolled ? "bottomScroll" : ""}`}>
                            <ul className="d-flex  flex-lg-column ">
                                <Link className="text-dark d-block" to="/">
                                    <li><i className="bi bi-house-door"> </i><span className="d-none d-lg-block">home</span></li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AfterLoginIcon;