import React from 'react';
import UserStore from "../../store/UsersStore.js";

const CreateButton = (props) => {
    const {isFormSubmit}=UserStore()
    if(isFormSubmit===false){
        // eslint-disable-next-line react/prop-types
        return <button onClick={props.onClick} className={props.className}>{props.text}</button>
    }else {
        return (
            // eslint-disable-next-line react/prop-types
            <button disabled={true}  className={`${props.className} pe-none`} >
                <div className="spinner-border spinner-border-sm mx-2 " role="status" ></div>
                processing...</button>
        )
    }
};

export default CreateButton;