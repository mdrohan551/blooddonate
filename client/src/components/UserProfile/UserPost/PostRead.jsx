import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TimeAgo } from "../../../utility/TImeCreatePost.js";
import { FixedSizeList as List } from "react-window";
import PostLoader from "../../../Layout/Loader/PostLoader.jsx";
import profile from "/images/porfile.jpg";

const PostRead = ({ singlUserPost, allUser }) => {
    const [showTable, setShowTable] = useState(false); // State to control table visibility
    const [isLoading, setIsLoading] = useState(false); // State to control loader visibility

    // Function to toggle table visibility
    const handleShowComments = (postId) => {
        setShowTable((prevState) => !prevState); // Toggle the visibility of the table
    };

    // Row component for react-window
    const Row = ({ index, style, data }) => {
        const comment = data.comments[index];
        const user = data.allUser.find((user) => user._id === comment?.userID);

        return (
            <div style={style} className="table-row d-flex">
                <div className="table-cell" style={{ width: "10%" }}>
                    <p>{index + 1}</p>
                </div>
                <div className="table-cell" style={{ width: "30%" }}>
                    <strong>{user?.lastName}</strong>
                </div>
                <div className="table-cell" style={{ width: "60%" }}>
                    <i style={{ fontSize: "0.9rem" }}> {comment.text || "No comment text"}</i>
                </div>
            </div>
        );
    };

    // Handle scroll events
    const handleScroll = ({ scrollOffset, scrollUpdateWasRequested }) => {
        if (!scrollUpdateWasRequested) {
            const listHeight = 300; // Height of the list
            const rowHeight = 50; // Height of each row
            const threshold = listHeight - rowHeight * 2; // Show loader when 2 rows from the bottom

            if (scrollOffset > threshold && !isLoading) {
                setIsLoading(true); // Show loader
                // Simulate a delay (e.g., API call)
                setTimeout(() => {
                    setIsLoading(false); // Hide loader after delay
                }, 1000); // Simulate a 1-second delay
            }
        }
    };

    // If no user post details are available, display a message
    if (!singlUserPost || !singlUserPost._id) {
        return <PostLoader />;
    }

    return (
        <div className="container">
            {/* Check if there are posts */}
            {singlUserPost.posts && singlUserPost.posts.length === 0 ? (
                <h3 className="text-center mt-lg-5 d-flex justify-content-center align-items-center">Post not found</h3>
            ) : (
                singlUserPost.posts.map((post) => (
                    <div key={post._id} className="postCard ">
                        <div className="userNameImage d-flex gap-3  justify-content-start align-items-center">
                            <div className="images ProfileUserPostImage">
                                <Link to={`/PostPage/${post._id}`}>
                                    <img src={profile} className="w-100 h-100" alt="profile" />
                                </Link>
                            </div>
                            <div className="Name_text d-flex flex-column">
                                <p className="fs-5 m-0">
                                    {singlUserPost.firstName} {singlUserPost.lastName}
                                </p>
                                <i>{TimeAgo(post.createdAt)}</i>
                            </div>
                        </div>

                        <div className="postContent mt-3">
                            <p>{post.post}</p>
                        </div>

                        {post.image && (
                            <div className="postImage">
                                <img src={post.image} alt="post" loading="lazy" />
                            </div>
                        )}

                        <div className="countLikeAndComments d-flex justify-content-between">
                            <i className="bi bi-hand-thumbs-up-fill">
                                {" " + (post.likes?.length || 0)} people liked
                            </i>
                            <span
                                className="commentText"
                                onClick={() => handleShowComments(post._id)} // Open comments table
                                style={{ cursor: "pointer" }}
                            >
                                +{post.comments?.length || 0} comments
                            </span>
                        </div>

                        {/* Conditionally render the comments table */}
                        {showTable && post.comments && (
                            <div className="commentsTable mt-3">
                                <div className="table table-striped">
                                    <div className="table-header d-flex">
                                        <div className="table-cell" style={{ width: "10%", border: "1px solid #ddd", padding: "0 0.5rem" }}>
                                            #
                                        </div>
                                        <div className="table-cell" style={{ width: "30%", border: "1px solid #ddd", padding: "0 0.5rem" }}>
                                            User
                                        </div>
                                        <div className="table-cell" style={{ width: "60%", border: "1px solid #ddd", padding: "0 0.5rem" }}>
                                            Comment
                                        </div>
                                    </div>
                                    <div className="table-body">
                                        <List
                                            height={300} // Adjust height as needed
                                            itemCount={post.comments.length}
                                            itemSize={50} // Adjust row height as needed
                                            width={"100%"}
                                            itemData={{ comments: post.comments, allUser }}
                                            onScroll={handleScroll} // Handle scroll events
                                        >
                                            {Row}
                                        </List>
                                        {isLoading && (
                                            <div className="text-center mt-2">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default PostRead;