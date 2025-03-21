import React, {lazy, Suspense, memo, useEffect} from 'react';
import MasterLayout from '../Layout/masterLayout';
import SideBar from "../components/UserProfile/SideBar.jsx";

import usersStore from "../store/UsersStore.js";
import PostSideCard from "../components/PostSideCard.jsx";
import AfterLoginIcon from "../components/AfterLoginIcon.jsx";
import PostStore from "../store/PostStore.js";
import UserStore from "../store/UsersStore.js";
import PostLoader from '../Layout/Loader/PostLoader.jsx';
import AppNavbar from '../Layout/AppNabbar.jsx';


const MemoizedSideBar = memo(SideBar);
const MemoizedIconBar = memo(AfterLoginIcon);

const Post = lazy(() => import('../components/Post/Post.jsx'));

const PostPage = () => {
    const {PostListRequest}=PostStore();
    const {UserDetailsRequest,AllUSerRequest}=UserStore()


    useEffect(() => {
        PostListRequest();
        UserDetailsRequest();
        AllUSerRequest();
    }, [PostListRequest]); // শুধু একবার কল হবে

    const {isLogin}=usersStore()
    return (
        <div>
           <AppNavbar/>
            <Suspense fallback={<PostLoader/>}>
                <div className="container">
                    <div className="row justify-content-center g-2">
                        <div className="col-3 mt-lg-4 d-lg-block d-none">
                            {isLogin() === true ?  <MemoizedSideBar /> : <PostSideCard/> }

                        </div>
                        <div className="col-12 col-lg-9">
                            <Post />

                        </div>
                    </div>
                </div>
                <div className="col-lg-12 d-block d-lg-none">
                    <MemoizedIconBar  />
                </div>
            </Suspense>
           <div className="text-center ">
               <h1 className='p-5' style={{marginBottom:"1px"}}></h1>
           </div>
        </div>
    );
};

export default PostPage;
