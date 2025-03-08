import React from 'react';
import UserStore from '../../store/UsersStore';

const CommonButton = (props) => {
    let { isFormSubmit } = UserStore();
    if (isFormSubmit === false) {
        return <button onClick={props.onClick} type='submit' className={props.className}>{props.text}</button>
    }
    return (
        <div>
        <button disabled={true} className={`${props.className} `}>
                    <div className="spinner-border spinner-border-sm mx-2" role="status"></div>
                 
                </button>
        </div>
    );
};

export default CommonButton;