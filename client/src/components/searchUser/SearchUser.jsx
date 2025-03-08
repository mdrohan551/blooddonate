import React, { useEffect } from "react";
import UserStore from "../../store/UsersStore.js";
import CommonButton from "../SignUpAndLogin/CommonButton.jsx";
import {toast} from "react-toastify";


const SearchUser = () => {
    const {
        divisonRequest, divisonget, zilaget, Upzilaget,
        ProfileForm, ProfileFormChange,
        GetDonnerbyDivision, GetDonnerbyzila, GetDonnerbyupzila,
        AllUSerRequest, set
    } = UserStore();

    useEffect(() => {
        divisonRequest();
    }, []);

    // Search বাটনে ক্লিক করলে API call হবে
    const handleSearch = async () => {
        const { Division, zila, upzila } = ProfileForm.location;
         if(!Division.trim()){
             toast.error('select a option');
             return;
         }
        if (Division && !zila && !upzila) {
           let res = await GetDonnerbyDivision(Division);
           toast.error(res.message)
        }
        else if (zila && !upzila) {
            let res =await GetDonnerbyzila(zila);
            toast.error(res.message)
        }
        else if (upzila) {
           let res = await GetDonnerbyupzila(upzila);
            toast.error(res.message)
        }
    };

    return (
        <div className="container mt-2 pt-2 mt-lg-5 pt-lg-5">
            <div className="row ">
                <div className="col-lg-12 text-center">
                    <h2 className="text-center fs-4 fw-bolder mt-3 mt-lg-0">
                        Select Location & Get Donor
                    </h2>
                    <div className="search-container   d-lg-flex justify-content-lg-center gap-0 gap-lg-3">
                        <div className="custom-select-wrapper ">
                            <select
                                className="form-control custom-select search-select"
                                name="division"
                                value={ProfileForm.location.Division}
                                onChange={(e) => ProfileFormChange("Division", e.target.value, "location")}
                            >
                                <option value="" >Division</option>
                                {divisonget.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                            <div className="custom-arrow"></div>
                        </div>

                        <div className="custom-select-wrapper">
                            <select
                                className="form-control custom-select search-select"
                                name="zila"
                                value={ProfileForm.location.zila}
                                onChange={(e) => ProfileFormChange("zila", e.target.value, "location")}
                            >
                                <option value=""> Zila</option>
                                {zilaget.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                            <div className="custom-arrow"></div>
                        </div>

                        <div className="custom-select-wrapper">
                            <select
                                className="form-control custom-select search-select"
                                name="upzila"
                                value={ProfileForm.location.upzila}
                                onChange={(e) => ProfileFormChange("upzila", e.target.value, "location")}
                            >
                                <option value=""> Upzila</option>
                                {Upzilaget.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                            <div className="custom-arrow"></div>
                        </div>

                       
                    </div>
                    <CommonButton
                        className="btn btn-danger btn-lg btn-block mt-3"
                        onClick={handleSearch} text="search"
                    ></CommonButton>
                </div>
            </div>
        </div>
    );
};

export default SearchUser;
