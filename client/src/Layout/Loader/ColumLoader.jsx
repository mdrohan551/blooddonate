import React from 'react';
import SkeletonLayout from "./SkeletonLayout.jsx";

const ColumLoader = () => {
    return (
        <div className="container ">
            <div className="row">
                {/*{*/}
                {/*   Array.from({length:12}).map(()=>{*/}
                {/*       return (*/}
                {/*          */}
                {/*       )*/}
                {/*   })*/}
                {/*}*/}
                <div className="col-12 gap-2 mt-3">
                    <SkeletonLayout/>
                </div>
            </div>

        </div>
    );
};

export default ColumLoader;