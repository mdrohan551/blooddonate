import React from 'react';
import Loader from '../Layout/Loader/Loader';

const Error = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100"> 
            <div className="text-center">
                <h1 className="display-4 fw-bold text-danger">404 Not Found</h1>
                <p className="fs-5 text-muted">The page you are looking for does not exist or has been moved.</p>
            </div>
            <div className="mt-4">
                <Loader />
            </div>
        </div>
    );
};

export default Error;
