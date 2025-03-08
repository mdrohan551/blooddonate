import React, { useState, useEffect } from 'react';
import Profile from '/images/porfile.jpg';
import meta from '/images/meta.png';
import UserStore from "../../store/UsersStore.js";
import Progress from "../Progessbar/Progress.jsx";
import IconBar from "./UserMenuLayout/IconBar.jsx";
import Joyride from "react-joyride"; // onboarding tour package

const SideBar = () => {
    const { UserDetails } = UserStore();
    const userKey = `joyride_${UserDetails?.NIDNumber || "guest"}`;

    const [run, setRun] = useState(false);

    useEffect(() => {
        if (!UserDetails?.NIDNumber) return; // UserDetails লোড না হলে রান করবে না

        const key = `joyride_${UserDetails.NIDNumber}`;
        const isCompleted = localStorage.getItem(key) === "done";
        setRun(!isCompleted);
    }, [UserDetails]); // শুধুমাত্র UserDetails পরিবর্তন হলে রান করবে

    const steps = [
        {
            content: <h4>QUIC GUID</h4>,
            placement: "center",
            target: "profiles",
        },
        {
            content: <h4>After creating the profile, you can update it using your own update button</h4>,
            placement: "left",
            target: "#iconBar",
        },
        {
            content: <h4>After verifying your email, you will receive your own verification badge.</h4>,
            placement: "left",
            target: ".meta1",
            title: "Not verified, create profile",
        },
    ];

    const handleJoyrideCallback = (data) => {
        console.log("Joyride callback data:", data); // Debugging log

        if (["finished", "skipped"].includes(data.status)) {
            localStorage.setItem(userKey, "done");
            setRun(false);
        }
    };
    
    return (
        <div className="side-bar">
         <Joyride
    run={run}
    steps={steps}
    callback={handleJoyrideCallback}
    continuous
    hideCloseButton
    scrollToFirstStep
    showSkipButton
    showProgress
    styles={{
        options: {
            arrowColor: '#ff0000',
            primaryColor: '#dc3545',
            textColor: '#333',
            backgroundColor: '#fff',
            overlayColor: 'rgba(0, 0, 0, 0.4)',
        },
        buttonSkip: {
            backgroundColor: '#dc3545',
            color: 'white',
            animation: 'pulse 1s infinite',
        },
    }}
/>

            <div className="row gap-3">
                <div className="col-12 col-lg-12 order-lg-0 order-1">
                    <div className="cardArea p-2 bg bg-white rounded-4">
                        <div className="ProfileText">
                            <div className="card-body bg-danger rounded-4 pb-4 px-0 image-parants position-relative">
                                <h1 className="text-white fs-1 text-center p-4">Group {UserDetails.bloodGroup}</h1>
                                <div className="profiles position-absolute">
                                    <img src={Profile} className="img" alt="" />
                                    <div className="meta2">
                                        {
                                            UserDetails.verify === true ?
                                                <img src={meta} className="meta" alt="" />
                                                :
                                                <i className="bi bi-exclamation-circle-fill text-danger meta1"></i>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mixaddress d-flex align-items-baseline">
                            <div className="allmix">
                                <div className="ProfileContent pt-5 mt-4 px-3">
                                    <h2>{UserDetails.lastName}</h2>
                                    <span>@{UserDetails.firstName + UserDetails.lastName}</span>
                                </div>
                                <div className="Adress pt-2 px-3 pb-3">
                                    <div className="grupe d-flex flex-column">
                                        <strong>NID: <span className="text-danger">{UserDetails.NIDNumber}</span></strong>
                                        <strong>Your role: <span className="text-primary">{`${UserDetails.role}`}</span></strong>
                                    </div>
                                    <div className="social">
                                        <a href="#"><i className="bi bi-facebook"></i> {UserDetails.lastName}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="progsmall w-50 h-25 d-block d-lg-none">
                                <Progress />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12  d-none d-lg-block">
                    <div className="cardArea bg-white rounded-4" style={{ padding: "2rem 0.2rem" }}>
                        <IconBar id="iconBar" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
