import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import image from '/images/graphic2.svg';
import image2 from '/images/sign.png';
import UserStore from '../../store/UsersStore.js';
import { FailAlert, SuccessAlert } from '../../utility/utility.js';
import CommonButton from './CommonButton.jsx';
import SignUp from './SignUp.jsx';

const Login = () => {
    const [fail, setFail] = useState(false);
    const [errors, setErrors] = useState({
        phone: '',
        password: '',
    });
    const [click, setClick] = useState(false);
    const navigate = useNavigate();
    const { LoginFormValue, LoginFormChange, SubmitLogin } = UserStore();

    const handleSubmit = async () => {
        const { phoneNumber, password } = LoginFormValue;

        if (!phoneNumber) {
            toast.error('Please enter phone number');
            setFail(true);
            setErrors({ ...errors, phone: 'Please enter phone number' });
            return;
        }

        if (!password) {
            toast.error('Please enter password');
            setFail(true);
            setErrors({ ...errors, password: 'Please enter password' });
            return;
        }

        const res = await SubmitLogin(LoginFormValue);

        if (res.status === 'fail') {
            await FailAlert(res.message);
        } else {
            await SuccessAlert(res.message);
            navigate('/');
        }
    };

    const toggleBackground = () => {
        setClick(!click);
    };

    return (
        <div className={`bgLogin ${click ? 'goBgChange' : ''}`}>
            <div className="container d-flex align-items-center justify-content-center vh-0">
                <div className="row justify-content-center align-items-center login-container">

                    {/* Image Section */}
                    <div className={`col-lg-6 d-none d-lg-flex justify-content-center ${click ? 'order-lg-2' : ''}`}>
                        <img
                            src={click ? image2 : image}
                            alt={click ? 'Sign Up Graphic' : 'Login Graphic'}
                            className={`w-75 h-75 object-fit-contain transation1 ${click ? "bg-white" : "0"}`}
                        />
                    </div>

                    {/* Form Section */}
                    <div className="col-lg-5 col-12">
                        {click ? (
                            <SignUp
                                click={toggleBackground}
                                defaultLogin={
                                    <div className="SignUp text-center mt-3">
                                        <span className="text-danger">You Have Account?</span>
                                        <Link onClick={toggleBackground} className="fw-bold ps-2" to="">
                                            Login
                                        </Link>
                                    </div>
                                }
                            />
                        ) : (
                            <div className={`card login-card ${fail ? 'animatedBorder' : ''}`}>
                                {fail && (errors.phone || errors.password) && (
                                    <p className="error-message">{errors.phone || errors.password}</p>
                                )}

                                <h1 className="main_title_text">Login</h1>

                                <div className="inputBox">
                                    <input
                                        type="number"
                                        required
                                        onChange={(e) => LoginFormChange('phoneNumber', e.target.value)}
                                        value={LoginFormValue.phoneNumber}
                                    />
                                    <span className="user">Number</span>
                                </div>

                                <div className="inputBox">
                                    <input
                                        type="password"
                                        required
                                        onChange={(e) => LoginFormChange('password', e.target.value)}
                                        value={LoginFormValue.password}
                                    />
                                    <span>Password</span>
                                </div>

                                <CommonButton onClick={handleSubmit} text="Login" className="enter" />

                                <div className="SignUp text-center mt-3">
                                    <span className="text-danger">Create Account?</span>
                                    <Link onClick={toggleBackground} className="fw-bold ps-2" to="">
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default Login;
