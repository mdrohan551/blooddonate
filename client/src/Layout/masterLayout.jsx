import React from 'react';
import AppNabbar from "./AppNabbar.jsx";
import Footer from "./Footer.jsx";
import BackTO from './BacktoTopButton/BackTO.jsx';
const MasterLayout = (props) => {
    return (
        <>
            <AppNabbar/>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
             <BackTO/>
            <Footer/>
        </>

    );
};

export default MasterLayout;