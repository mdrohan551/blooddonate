import React, {lazy, Suspense, useEffect} from 'react';
const LoaderPage = lazy(() => import("../pages/LoaderPage.jsx"));
const UserProfile =lazy(()=> import("../components/UserProfile/UserProfile.jsx"));
const UserProfilepage = () => {
    return (
        <>
            <Suspense fallback={<LoaderPage/>}>
                <UserProfile/>
            </Suspense>

        </>
    );
};

export default UserProfilepage;