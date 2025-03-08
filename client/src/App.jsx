import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserStore from "./store/UsersStore.js";



const UserDashBoardPage = lazy(() => import("./pages/UserDashBoardPage.jsx"));
const ProfileEditPage = lazy(() => import("./pages/ProfileEditPage.jsx"));
const CreatePostPage = lazy(() => import("./pages/CreatePostPage.jsx"));
const PostPage = lazy(() => import("./pages/PostPage.jsx"));
const UserProfilepage = lazy(() => import("./pages/UserProfilepage.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const AllBloodPage = lazy(() => import("./pages/AllBloodPage.jsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const LoaderPage = lazy(() => import("./pages/LoaderPage.jsx"));
const Error = lazy(() => import("./pages/Error.jsx"));

const App = () => {
    const { isLogin, UserDetails, UserDetailsRequest } = UserStore();

    useEffect(() => {
        const fetchUserDetails = async () => {
            await UserDetailsRequest();
        }
        fetchUserDetails();
    }, [UserDetailsRequest]);

    return (
        <BrowserRouter>
            <Suspense fallback={<LoaderPage />}>
                <Routes>
                    {/* Error route for unmatched paths */}
                    <Route path="*" element={<Error />} />
                    {/* Home page */}
                    <Route path="/" element={<Home />} />
                    {/* All Blood Page */}
                    <Route path="/AllBloodPage" element={<AllBloodPage />} />
                    {/* Sign Up Page */}
                    <Route path="/signUp" element={<SignUpPage />} />
                    {/* Login Page */}
                    <Route path="/Login-signin" element={<LoginPage />} />
                    {/* Create Post Page */}
                    <Route path="/user/post" element={<CreatePostPage />} />
                    <Route path="/PostPage" element={<PostPage />} />

                    {/* Conditional route rendering based on login state */}
                    {isLogin() ? (
                        <>
                            {/* User is logged in */}
                            <Route path="/user" element={<UserDashBoardPage />} />
                            {UserDetails?.verify === false ? (
                                <Route path="/user/update" element={<UserProfilepage />} />
                            ) : (
                                <>
                                    <Route path="/user/edit" element={<ProfileEditPage />} />
                                    <Route path="/user/update" element={<Error />} />
                                </>
                            )}
                        </>
                    ) : (
                        <Route path="*" element={<Error />} />
                    )}
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
