import React, { useEffect, memo } from 'react';
import UserStore from "../store/UsersStore.js";
import SideBar from "../components/UserProfile/SideBar.jsx";
import UpdateProfileForm from "../components/UserProfile/UpdateProfile/UpdateProfileForm.jsx";
import ProfileDetails from "../components/UserProfile/ProfileDetails.jsx";
import IconBar from '../components/UserProfile/UserMenuLayout/IconBar.jsx';

const MemoizedSideBar = memo(SideBar);
const MemoizedUpdateProfileForm = memo(UpdateProfileForm);
const MemoizedProfileDetails = memo(ProfileDetails);
const MemoizedIconBar = memo(IconBar);

const ProfileEditPage = () => {
    const { BloodgrupeRequest, UserDetailsRequest } = UserStore();

    useEffect(() => {
        (async () => {
            await UserDetailsRequest();
            await BloodgrupeRequest();
        })();
    }, []);

    return (
        <div className="container py-5">
            <div className="col-lg-12 mb-3 bioGrap">
                <p className="popup-text bg-danger">
                    <strong>মেয়ের</strong> সিজারের জন্য <b>রক্ত খোঁজেন</b>, আর <b>ছেলেকে</b> রক্ত
                    দিতে বারণ করেন? এই চিন্তাধারার পরিবর্তন দরকার!
                </p>
            </div>
            <div className="row g-3">
                <div className="col-lg-3">
                    <MemoizedSideBar />
                </div>
                <div className="col-lg-9">
                    <MemoizedUpdateProfileForm />
                    <MemoizedProfileDetails />
                </div>
            </div>
            <div className="col-lg-12 d-block d-lg-none">
                <MemoizedIconBar id="iconBar" />
            </div>
        </div>
    );
};

export default ProfileEditPage;
