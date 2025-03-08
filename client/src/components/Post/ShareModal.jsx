import React from 'react';
import { Modal } from 'react-bootstrap';


const ShareModal = ({ show, onHide, postUrl }) => {
    const shareUrl = encodeURIComponent(postUrl); // Post URL encode
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;


    return (
        <Modal
            show={show}
            onHide={onHide}
            className="modal-bottom" // Apply custom class
        >
            <Modal.Header closeButton>
                <Modal.Title>Share this post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-between gap-1">
                    <button
                        className="btn btn-primary"
                        onClick={() => window.open(facebookShareUrl, "_blank")}
                    >
                        <i className="bi bi-facebook"></i> Facebook
                    </button>
                    <button
                        className="btn btn-info"
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`, "_blank")}
                    >
                        <i className="bi bi-twitter"></i> Twitter
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`, "_blank")}
                    >
                        <i className="bi bi-linkedin"></i> LinkedIn
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={() => window.open(`https://wa.me/?text=${shareUrl}`, "_blank")}
                    >
                        <i className="bi bi-whatsapp"></i> WhatsApp
                    </button>
                    {/* You can add more share buttons here as needed */}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ShareModal;
