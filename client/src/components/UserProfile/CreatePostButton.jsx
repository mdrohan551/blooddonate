import React from 'react';
import PostStore from "../../store/PostStore.js";

const CreatePostButton = (props) => {
    const {isFormSubmit}=PostStore()
    if(isFormSubmit===false){
        // eslint-disable-next-line react/prop-types
        return <button onClick={props.onClick} className={props.className}>{props.text}   <i className="bi bi-postcard"></i></button>
    }else {
        return (
            // eslint-disable-next-line react/prop-types
            <button disabled={true}  className={`${props.className} pe-none`} >
                <div className="spinner-border spinner-border-sm mx-2 " role="status" ></div>
              </button>
        )
    }
};

export default CreatePostButton;