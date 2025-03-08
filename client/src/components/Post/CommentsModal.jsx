import React, { useCallback, useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import { FixedSizeList as List } from "react-window";
import profile from "/images/porfile.jpg";
import { TimeAgo } from "../../utility/TImeCreatePost.js"; // ✅ TimeAgo ইমপোর্ট করা হয়েছে

const CommentsModal = ({ show, onHide, comments = [], userList = [] }) => {
    const [isLoading, setIsLoading] = useState(false); // State to track loading
    const [visibleComments, setVisibleComments] = useState(comments.slice(0, 5)); // Initial visible comments

    // Load more comments when the user scrolls to the bottom
    const handleScroll = useCallback(({ scrollOffset, scrollUpdateWasRequested }) => {
        const listContainer = document.querySelector('.List'); // Get the list container
        if (listContainer) {
            const { scrollTop, scrollHeight, clientHeight } = listContainer;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5; // Check if scrolled to bottom

            if (isAtBottom && !isLoading && visibleComments.length < comments.length) {
                setIsLoading(true); // Start loading
                setTimeout(() => {
                    const nextBatch = comments.slice(visibleComments.length, visibleComments.length + 5); // Load next 10 comments
                    setVisibleComments((prev) => [...prev, ...nextBatch]);
                    setIsLoading(false); // Stop loading
                }, 1000); // Simulate async loading
            }
        }
    }, [isLoading, visibleComments, comments]);

    // Reset visible comments when the modal is opened
    useEffect(() => {
        if (show) {
            setVisibleComments(comments.slice(0, 5)); // Reset to initial batch
        }
    }, [show, comments]);

    const Row = useCallback(({ index, style }) => {
        const comment = visibleComments[index] || {};
        return (
            <div key={index} className="mb-3 border-bottom pb-2" style={style}>
                <div className="d-flex align-items-center gap-2">
                    <img
                        src={profile}
                        className="rounded-circle"
                        style={{ width: "40px", height: "40px", objectFit: "cover" }}
                        alt="User"
                    />
                    <div>
                        <strong>
                            {userList.find(user => user._id === comment?.userID)?.lastName || comment.user?.lastName || "Unknown"}
                        </strong>
                        <small className="text-muted d-block">{comment?.createdAt ? TimeAgo(comment.createdAt) : "Unknown time"}</small>
                    </div>
                </div>
                <p className="mt-2 mb-0 text-break">{comment?.text || "No comment text"}</p>
            </div>
        );
    }, [visibleComments, userList]);

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                {visibleComments.length > 0 ? (
                    <List
                        height={500}
                        itemCount={visibleComments.length}
                        itemSize={100}
                        width={"100%"}
                        onScroll={handleScroll} // Track scroll position
                        className="List" // Add class for targeting
                    >
                        {Row}
                    </List>
                ) : (
                    <p className="text-center">No comments available.</p>
                )}
                {isLoading && (
                    <div className="text-center mt-3">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary w-100" onClick={onHide}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default CommentsModal;