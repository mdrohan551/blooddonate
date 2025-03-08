import React, { useEffect } from "react";
import UserStore from "../../store/UsersStore.js";
import NotVerifyPopup from "../Popup/NotVerifyPopup.jsx";

const AfterLoginBanner = () => {
    const { UserDetailsRequest, UserDetails } = UserStore()

    useEffect(() => {
        (async () => {
            await UserDetailsRequest();
        })();
    }, []);
    return (
        <div>
            {UserDetails?.verify === false ? (
                <>
                    <h1 className="fs-5  notVerified">
                        {UserDetails?.lastName}, You Are Not Verified <i className="bi bi-exclamation-circle-fill text-danger "></i>
                    </h1>
                    <NotVerifyPopup />
                </>
            ) : (
                <h5>{UserDetails.lastName} You Are verified <i className="bi bi-check-circle-fill text-primary"></i></h5>
            )}
        </div>
    );
};

export default AfterLoginBanner;
