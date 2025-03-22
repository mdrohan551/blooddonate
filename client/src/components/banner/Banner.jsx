import React, { useEffect, useState } from 'react';
import img from '/images/actof.png'
import bannerImg from '/images/blod.png'
import Progress from "../Progessbar/Progress.jsx";
import BloodChart from "../Chart/BloodChart.jsx";
import { Link } from 'react-router-dom';
import UserStore from '../../store/UsersStore.js';
import AfterLoginBanner from "./AfterLoginBanner.jsx";

import LazyLoad from 'react-lazyload';
import BannerLoader from '../../Layout/Loader/BannerLoader.jsx';

const Banner = () => {
    const { isLogin } = UserStore();
    const [addwidh, setAddwidh,] = useState(false);
    const [lastText, setlastText,] = useState(false);

    // dynamic widht add fnc
    const dynamicStyle = () => {
        return {
            width: addwidh ? "150px" : "0px",
            height: "100px",
            transition: "all .5s ease-in-out",
            borderRadius: "15px",
            backgroundSize: "cover",
            backgroundImage: `url(${img})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center"


        }
    }
    const TextChange = () => {
        return {
            textShadow: lastText ? "rgba(255, 116, 74, 0.18) 47px 33px 38px" : "",
            transition: lastText ? "all .5s ease-in-out" : "",
            fontSize: lastText ? "4.5rem" : '4rem',
            marginLeft: "10px",
            color: lastText ? "transparent" : '',
            WebkitTextStroke: lastText ? "0.70px black" : "", // ✅ Correct
            fontWeight: "400",
            textTransform: "uppercase",


        };

    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setAddwidh(true)
            setlastText(true)
        }, 2000);


        return () => clearTimeout(timer); //ata use korce jate settime ta run na thake
    }, []);
    return (<div id="Banner">

        <div className="container  mt-5 pt-sm-0 pt-md-0 pt-lg-5 ">
            <div className="row">
                <div className="col-lg-6  order-lg-0 order-1 col-md-6">
                    <div className="banner_Text">
                        <p className="banner_small_text">Your Blood Can Be Someone&#39;s Lifeline</p>
                        <h1 className="banner_title_text">Donate blood, share hope, and save lives. Your
                            generosity is
                            an act of
                            <span className="d-flex">
                                <span className='box' style={dynamicStyle()}></span>
                                <span className="outlineText" style={TextChange()}>Kindness</span>
                            </span>
                        </h1>
                        {isLogin() === true ? (<>
                            <AfterLoginBanner />
                        </>) : ""
                        }
                        <p className="banner_text_des">Your blood donation can save lives and bring hope to
                            those in
                            critical need. Be the hero
                            someone is waiting for, inspire others, and join the life-saving mission today.
                            Together, we can make a difference.</p>
                        <Link className={`btn btn-danger px-5 fs-5 `}
                            to={isLogin() ? '/user' : "/signUp"}>{isLogin() ? "Profile" : "Sign Up"}</Link>
                    </div>
                </div>
                <div className="col-lg-6  order-lg-1 order-0 col-md-6 order-md-1">
                    <div className="banner_img d-flex justify-content-end ">
                        <div className="img-wrapper mb-3">
                            <LazyLoad 
                                placeholder={<BannerLoader />}>
                                <img src={bannerImg} alt="bannerImg" className="w-100 h-100 " />
                            </LazyLoad>

                        </div>
                        <div className="chart">
                            {/* ✅ Small & Medium Device-এ Progress লুকানো হয়েছে */}
                            <div className="d-none d-lg-block">
                                <Progress />
                            </div>

                            {/* ✅ BloodChart সব স্ক্রিনে থাকবে */}
                            <BloodChart />
                        </div>


                        <div className="live">

                            <h1>live</h1>
                        </div>
                        <div className="live2 d-block d-lg-none">
                            <Progress />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>);
};

export default Banner;