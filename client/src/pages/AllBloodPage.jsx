import React, { lazy, Suspense, useEffect } from 'react';
import MasterLayout from '../Layout/masterLayout';
const Card = lazy(() => import("../components/UserCard/Card.jsx"));
import UserStore from "../store/UsersStore.js";
import SearchUser from "../components/searchUser/SearchUser.jsx";
import ColumLoader from '../Layout/Loader/ColumLoader.jsx';

const AllBloodPage = () => {
    const { AllUSerRequest } = UserStore();

    useEffect(() => {
        (async () => {
            await AllUSerRequest();
        })();
    }, []);

    return (
        <MasterLayout>
            <SearchUser />

            <Suspense fallback={<ColumLoader/>}>
                <Card />
            </Suspense>
        </MasterLayout>
    );
};

export default AllBloodPage;
