import React, { useEffect } from 'react';
import MasterLayout from "../Layout/masterLayout.jsx";
import Banner from "../components/banner/Banner.jsx";
import VerifiedUser from "../components/UserCard/VerifiedUser.jsx";
import UserStore from "../store/UsersStore.js";
import SearchUser from '../components/searchUser/SearchUser.jsx';





const Home = () => {
    const { AllUSerRequest } = UserStore()

    useEffect(() => {
        (async () => {
            await AllUSerRequest()
        })()
    }, []);
    return (
        <MasterLayout>
            <Banner />
            <SearchUser />
            <VerifiedUser />
        </MasterLayout>
    );
};
export default Home;