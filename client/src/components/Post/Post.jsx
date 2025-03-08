import React, { useState, useEffect } from "react";
import profile from "/images/porfile.jpg";
import { Link } from "react-router-dom";
import PostStore from "../../store/PostStore.js";
import { TimeAgo } from "../../utility/TImeCreatePost.js";
import usersStore from "../../store/UsersStore.js";
import { toast } from "react-toastify";
import PostLoader from "../../Layout/Loader/PostLoader.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentsModal from "./CommentsModal.jsx";
import ShareModal from "./ShareModal.jsx"; // Import ShareModal

const Post = () => {
    const { PostList, likePost, PostListRequest, commentForm, commentFromChange, commentPost } = PostStore();
    const { isLogin, UserDetails, userList } = usersStore();

    const [likedPostIds, setLikedPostIds] = useState([]);
    const [loadingLikeIds, setLoadingLikeIds] = useState([]);
    const [commentVisible, setCommentVisible] = useState({});
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [selectedPostComments, setSelectedPostComments] = useState([]);
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    // Modal states
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedPostUrl, setSelectedPostUrl] = useState('');

    useEffect(() => {
        if (UserDetails?._id) {
            const likedPosts = PostList.filter(post => post.likes?.includes(UserDetails._id));
            const likedPostIds = likedPosts.map(post => post._id);
            setLikedPostIds(likedPostIds);
        }
    }, [UserDetails, PostList]);

    useEffect(() => {
        const initialPosts = PostList.slice(0, 5);
        setItems(initialPosts);
        setHasMore(PostList.length > 5);
    }, [PostList]);

    const fetchMoreData = () => {
        if (items.length >= PostList.length) {
            setHasMore(false);
            return;
        }

        const nextBatch = PostList.slice(items.length, items.length + 5);
        setItems((prev) => [...prev, ...nextBatch]);
        setHasMore(items.length + nextBatch.length < PostList.length);
    };
    const playAudio = (type) => {
        const audio = new Audio(type === "fail" ? "/sound/fail.mp3" : "/sound/pop.mp3");
        audio.play();
    };



    const likePosts = async (postId) => {
        if (UserDetails._id && isLogin() === true) {
            setLoadingLikeIds(prev => [...prev, postId]);

            let res = await likePost(postId);

            if (res.status === 'success') {
                // Update the likedPostIds state to reflect the new like status
                setLikedPostIds((prev) => {
                    if (prev.includes(postId)) {
                        // Remove postId if already liked
                        return prev.filter(id => id !== postId);
                    } else {
                        // Add postId if not liked
                        return [...prev, postId];
                    }
                });

                await PostListRequest();  // Refresh the post list
                if (res.message === "Post liked") {
                    playAudio("success");
                } else {
                    playAudio("fail");
                }
            } else {
                toast.error("Fail to like post");
            }

            setLoadingLikeIds(prev => prev.filter(id => id !== postId)); // Stop loading
        }
    };


    const toggleCommentInput = (postId) => {
        setCommentVisible(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const handleCommentSubmit = async (postId, comments) => {
        if (isLogin() === true) {
            let res = await commentPost(postId, comments);
            if (res.status === 'success') {
                await PostListRequest();
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        } else {
            toast.error('make sure you are login🤔 ');
        }
    };

    const handleShowComments = (postId) => {
        const post = PostList.find(post => post._id === postId);
        if (post && post.comments) {
            setSelectedPostComments(post.comments);
            setShowCommentsModal(true);
        }
    };

    const handleShowShare = (postUrl) => {
        setSelectedPostUrl(postUrl); // Set the URL of the post to share
        setShowShareModal(true); // Open the share modal
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-12">
                    <div className="postPage">
                        <InfiniteScroll
                            dataLength={items.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={<PostLoader />}
                        >
                            {items.length === 0 ? (
                                <h3 className="text-center mt-lg-5 d-flex justify-content-center align-items-center">Post not found</h3>
                            ) : (
                                items.map((item, index) => {
                                    const isLiked = likedPostIds.includes(item._id);
                                    const isLoading = loadingLikeIds.includes(item._id);

                                    return (
                                        <div key={index} className="postCard">
                                            <div className="userNameImage d-flex gap-3">
                                                <div className="images">
                                                    <Link to="/PostPage">
                                                        <img src={profile} className="w-100 h-100" alt="" />
                                                    </Link>
                                                </div>
                                                <div className="Name_text d-flex flex-column">
                                                    <p className="fs-5 m-0">
                                                        {item.user?.firstName + " " + item.user?.lastName}
                                                    </p>
                                                    <i>{TimeAgo(item.createdAt)}</i>
                                                </div>
                                            </div>
                                            <div className="postContent mt-3">
                                                <p>{item.post}</p>
                                            </div>
                                            <div className="postImage">
                                                <img src={item.image} alt="post image" />
                                            </div>
                                            <div className="countLikeAndComments d-flex justify-content-between">
                                                <i className="bi bi-hand-thumbs-up-fill">
                                                    {" " + item.likes?.length || 0}
                                                    {isLiked ? " You And other people" : " people liked"}
                                                </i>
                                                <span
                                                    className="commentText"
                                                    onClick={() => handleShowComments(item._id)}
                                                    style={{ cursor: "pointer" }}
                                                >
                            +{item.comments?.length || 0} comments
                        </span>
                                            </div>
                                            <div className="icon mt-lg-3 d-flex justify-content-between">
                                                {
                                                    isLogin() === true ? (
                                                        <i
                                                            className={`bi bi-hand-thumbs-up${isLiked ? '-fill' : ''} ${isLoading ? 'loading' : ''}`}
                                                            onClick={() => likePosts(item._id)}
                                                        ></i>
                                                    ) : (
                                                        <Link to="/Login-signin"
                                                              className="bi bi-hand-thumbs-up text-dark fs-5"></Link>
                                                    )
                                                }
                                                <i
                                                    className="bi bi-chat-square"
                                                    onClick={() => toggleCommentInput(item._id)}
                                                    style={{ cursor: "pointer" }}
                                                ></i>
                                                <i
                                                    className="bi bi-share"
                                                    onClick={() => handleShowShare(item._id)} // Open share modal
                                                    style={{ cursor: "pointer" }}
                                                ></i>
                                            </div>

                                            {commentVisible[item._id] && (
                                                <div className="comment-box mt-2 d-flex align-items-center">
                                                    <input
                                                        type="text"
                                                        className="form-control flex-grow-1"
                                                        placeholder="Write a comment..."
                                                        value={commentForm.text}
                                                        onChange={(e) => commentFromChange("text", e.target.value)}
                                                    />
                                                    <button
                                                        className="btn btn-primary ms-2"
                                                        onClick={() => handleCommentSubmit(item._id, commentForm.text)}
                                                    >
                                                        <i className="bi bi-send"></i>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </InfiniteScroll>

                    </div>
                </div>
            </div>

            {/* Comments Modal */}
            <CommentsModal
                show={showCommentsModal}
                onHide={() => setShowCommentsModal(false)}
                comments={selectedPostComments}
                userList={userList}
            />

            {/* Share Modal */}
            <ShareModal
                show={showShareModal}
                onHide={() => setShowShareModal(false)}
                postUrl={selectedPostUrl} // Pass the URL of the selected post
            />
        </div>
    );
};

export default Post;
