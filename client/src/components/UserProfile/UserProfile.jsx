import React, {useEffect} from 'react';
import SideBar from "./SideBar.jsx";
import ProfileDetails from "./ProfileDetails.jsx";
import UserStore from "../../store/UsersStore.js";
import ProfileForm from "./ProfileForm.jsx";
import IconBar from './UserMenuLayout/IconBar.jsx';


const UserProfile = () => {
    const {
        AllUSerRequest,
        BloodgrupeRequest,
        UserDetailsRequest,
        divisonRequest,
    } = UserStore();
    useEffect(() => {
        (async () => {
            await AllUSerRequest();
            await UserDetailsRequest();
            await BloodgrupeRequest();
            await divisonRequest();

        })()
    }, []);
    return (
        <div className="container py-5">
            <div className="col-lg-12 mb-3 bioGrap">
                <p className="popup-text bg-danger ">
                    <strong>মেয়ের</strong> সিজারের জন্য <b>রক্ত খোঁজেন</b>, আর <b>ছেলেকে</b> রক্ত
                    দিতে বারণ করেন? এই চিন্তাধারার পরিবর্তন দরকার!
                </p>
            </div>
            <div className="row g-3">
                <div className="col-lg-3">
                    <SideBar/>
                 
                </div>
                <div className="col-lg-9">
                    <ProfileForm/>
                    <ProfileDetails/>

                </div>

            </div>
            <div className="col-lg-12 d-block d-lg-none">
                <IconBar id="iconBar"/>
            </div>
         
           
        </div>

    );
};

export default UserProfile;