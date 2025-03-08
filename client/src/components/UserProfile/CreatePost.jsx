import React, { useEffect } from "react";
import UserStore from "../../store/UsersStore.js";
import PostStore from "../../store/PostStore.js";
import UploadStore from "../../store/UploadStore.js";
import { toast, ToastContainer } from "react-toastify";
import CreatePostButton from "./CreatePostButton.jsx";

const CreatePost = () => {
    const { UserDetails, UserDetailsRequest } = UserStore();
    const { PostForm, PostFormChange, CreatePostRequest,PostListRequest,UserPostDetailsRequest } = PostStore();
    const { UploadImage } = UploadStore();

    useEffect(() => {
        (async () => {
            await UserDetailsRequest();
        })();
    }, [UserDetailsRequest]);

    const UploadImages = async (e) => {

        const file = e.target.files[0]; // ✅ ফাইল নেওয়া
        let  toastId = toast.loading("Uploading..."); // ✅ আপলোড শুরু হলে লোডিং toast দেখাবে
        if (!file) return; // ✅ ফাইল না থাকলে ফাংশন চলবে না।

        try {

            const res = await UploadImage(file); // ✅ ফাইল আপলোড করা

            if (res?.status === 200 && res?.data?.status === "success") {
                toast.success(res?.data?.message);
                PostFormChange("image", res?.data.data.url); // আপলোড লিংক সেট করা
            } else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            toast.error(error);
        } finally {
            // ✅ সফল বা ব্যর্থ হলেও লোডিং টোস্ট বন্ধ হবে
            if (toastId) toast.dismiss(toastId);
        }
    };



    const submitPost = async () => {
        let res = await CreatePostRequest(PostForm);
        if (res?.status === "success") {
            toast.success(res.message);
            await PostListRequest()
            await UserPostDetailsRequest()
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="content-bar">
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <div
                                className={`userInfo ${
                                    !UserDetails?.profile?.DonationChek ||
                                    UserDetails?.profile?.DonationChek === "NO"
                                        ? UserDetails?.role === "USER"
                                            ? "Chekdonation disable"
                                            : ""
                                        : ""
                                }`}
                            >
                                <div className="userPost">
                                    <textarea
                                        className="w-100 rounded-4 message"
                                        placeholder="What's on your mind today?"
                                        onChange={(e) => {
                                            PostFormChange("post", e.target.value);
                                        }}
                                        value={PostForm.post}
                                    ></textarea>
                                    <div className="action">
                                        <div className="row">
                                            <div className="col-12 d-flex justify-content-around">
                                                {/* Label triggers file input */}
                                                <label htmlFor="file-upload" className="upload-label">
                                                    <i className="bi bi-cloud-upload"></i>
                                                </label>
                                                <input
                                                    type="file"
                                                    id="file-upload"
                                                    className="imagePostIcon"
                                                    accept="image/*"
                                                    onChange={UploadImages} // ✅ () বাদ দেওয়া হয়েছে
                                                />

                                                {/* Post Button */}
                                                <CreatePostButton
                                                    className="PostButton"
                                                    text="post"
                                                    onClick={submitPost}
                                                ></CreatePostButton>
                                            </div>

                                            {/* ✅ Image Preview Section */}
                                            {PostForm.image && (
                                                <div className="image-preview">
                                                    <img
                                                        src={PostForm.image} // ✅ Image URL
                                                        alt="Preview"
                                                        width={100}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"

            >
            </ToastContainer>
        </div>
    );
};

export default CreatePost;
