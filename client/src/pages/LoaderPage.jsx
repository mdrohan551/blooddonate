import React from 'react';
import Loader from '../Layout/Loader/Loader';

const LoaderPage = () => {
    return (
        <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
            <Loader/>
        </div>
    );
};

export default LoaderPage;