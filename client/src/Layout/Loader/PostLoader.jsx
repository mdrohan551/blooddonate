import React from "react";


const PostLoader = () => {
    return (
        <div className="card p-3" style={{ width: "100%", maxWidth: "100%" }}>
            {/* Profile section */}
            <div className="d-flex align-items-center mb-2">
                <div className="rounded-circle bg-secondary" style={{ width: "40px", height: "40px" }}></div>
                <div className="ms-2 w-50">
                    <div className="bg-secondary rounded w-75" style={{ height: "10px" }}></div>
                    <div className="bg-secondary rounded w-50 mt-1" style={{ height: "10px" }}></div>
                </div>
            </div>

            {/* Image placeholder */}
            <div className="bg-secondary rounded w-100" style={{ height: "35vh" }}></div>

            {/* Buttons placeholder */}
            <div className="d-flex justify-content-between mt-3">
                <div className="bg-secondary rounded w-25" style={{ height: "20px" }}></div>
                <div className="bg-secondary rounded w-25" style={{ height: "20px" }}></div>
                <div className="bg-secondary rounded w-25" style={{ height: "20px" }}></div>
            </div>
        </div>
    );
};

export default PostLoader;
