import React from 'react';
import {Link} from "react-router-dom";
import BloodChart from "./Chart/BloodChart.jsx";
import Progress from "./Progessbar/Progress.jsx";

const PostSideCard = () => {
    return (
        <div className="container p-0 m-0 ">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Create  Account</h5>
                            <Link className="btn btn-danger fs-5 d-flex justify-content-center" to="/signUp">Create Account</Link>
                        </div>
                    </div>

                    <div className="card pt-5 mt-1">
                       <div className="card-body py-4">
                           <Progress/>
                       </div>
                    </div>
                    <div className="card pt-5 mt-1">
                       <BloodChart/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostSideCard;