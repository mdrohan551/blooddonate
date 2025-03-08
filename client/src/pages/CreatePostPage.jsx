import React, { useEffect, memo } from 'react';
import UserStore from "../store/UsersStore.js";
import SideBar from "../components/UserProfile/SideBar.jsx";
import CreatePost from "../components/UserProfile/CreatePost.jsx";
import PostRead from "../components/UserProfile/UserPost/PostRead.jsx";
import IconBar from '../components/UserProfile/UserMenuLayout/IconBar.jsx';
import PostStore from "../store/PostStore.js";

const MemoizedSideBar = memo(SideBar);
const MemoizedCreatePost = memo(CreatePost);
const MemoizedPostRead = memo(PostRead);
const MemoizedIconBar = memo(IconBar);

const CreatePostPage = () => {
    const { AllUSerRequest, BloodgrupeRequest, UserDetailsRequest, divisonRequest,userList } = UserStore();
    const {PostListRequest,UserPostDetailsRequest,UserPostDetails}=PostStore()




    useEffect(() => {
        const fetchData = async () => {
            await AllUSerRequest();
            await UserDetailsRequest();
            await BloodgrupeRequest();
            await divisonRequest();
            await PostListRequest()
            await UserPostDetailsRequest()

        };
        fetchData();
    }, []);

    return (
        <div className="container py-5">
            <div className="col-lg-12 mb-3 bioGrap">
                <p className="popup-text bg-danger">
                    <strong>মেয়ের</strong> সিজারের জন্য <b>রক্ত খোঁজেন</b>, আর <b>ছেলেকে</b> রক্ত
                    দিতে বারণ করেন? এই চিন্তাধারার পরিবর্তন দরকার!
                </p>
            </div>
            <div className="row g-3">
                <div className="col-lg-3">
                    <MemoizedSideBar />
                </div>
                <div className="col-lg-9">
                    <MemoizedCreatePost />
                    <MemoizedPostRead singlUserPost={UserPostDetails} allUser={userList}/>
                </div>
            </div>
            <div className="col-lg-12 d-block d-lg-none">
                <MemoizedIconBar id="iconBar" />
            </div>
        </div>
    );
};

export default CreatePostPage;
