import React from 'react';
import Login from "../components/SignUpAndLogin/Login.jsx";
import MasterLayout from "../Layout/masterLayout.jsx";

const LoginPage = () => {
    const isMobile = window.innerWidth < 992; // 992px এর কম হলে মোবাইল

    return (
        isMobile ? (
            <MasterLayout>
                <Login />
            </MasterLayout>
        ) : (
            <Login />
        )
    );
};

export default LoginPage;
