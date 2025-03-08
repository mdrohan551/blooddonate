import React from 'react';
import footerImg from '/images/FirstLogo.png';

const Footer = () => {
    return (
        <div>
            <div className='footer mt-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex flex-column">
                            <h1 className="footer_title text-center main_title_text">Developers</h1>
                            <div className="row" id="footer">
                                <div className="col-lg-4 col-4">
                                    <div className="footer_logo">
                                        <img src={footerImg} alt="footerLogo" className="w-100 h-100"/>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-4 text-center">
                                    <h3 className="footer_subtitle">Quick Access</h3>
                                    <ul className="footer_links">
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">Sign</a></li>
                                        <li><a href="#">Login</a></li>
                                        <li><a href="#">Services</a></li>
                                    </ul>
                                </div>

                                <div className="col-lg-4 col-4 text-center">
                                    <h3 className="footer_subtitle">Hire Us</h3>
                                    <ul className="footer_links d-flex justify-content-center gap-3">
                                        <li><a href="#"><i className="bi bi-github"></i></a></li>
                                        <li><a href="#"><i className="bi bi-facebook"></i></a></li>
                                        <li><a href="#"><i className="bi bi-linkedin"></i></a></li>
                                        <li><a href="#"><i className="bi bi-whatsapp"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="copyrightText">
                <p className="copyright">
                    &copy; 2025 <span><a href="https://www.facebook.com/MDFAWJULAZIMHASSAN">Azim</a></span> and <span><a
                    href="https://www.facebook.com/rohanmohammad404/">Rohan</a></span> Developers. All Rights Reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;
