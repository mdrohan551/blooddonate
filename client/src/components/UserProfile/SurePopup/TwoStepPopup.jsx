import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import CreateButton from "../CreateButton.jsx";

const TwoStepPopup = ({ onConfirm, onClose }) => {
    const [step, setStep] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [processingStep, setProcessingStep] = useState(-1);
    const [showProcessing, setShowProcessing] = useState(false);
    const [verificationError, setVerificationError] = useState(false);

    useEffect(() => {
        let timers = [];
        if (processing) {
            setShowProcessing(true);
            const steps = [3000, 6000, 9000];
            steps.forEach((time, index) => {
                timers.push(setTimeout(() => setProcessingStep(index), time));
            });

            timers.push(setTimeout(async () => {
                const result = await onConfirm();
                if (!result) {
                    setVerificationError(true);
                    setTimeout(() => {
                        setProcessing(false);
                        setShowProcessing(false);
                        setProcessingStep(-1);
                        setVerificationError(false);
                        onClose();
                        window.location.reload();
                    }, 2000);
                } else {
                    setProcessing(false);
                    setShowProcessing(false);
                    setProcessingStep(-1);
                }
            }, 9500));
        }

        return () => timers.forEach(clearTimeout);
    }, [processing, onConfirm, onClose]);

    return (
        <>
            {/* TwoStepPopup */}
            <Modal show={!processing && !showProcessing} onHide={onClose} backdrop="static" keyboard={false} centered>
                <Modal.Body className="text-center p-5">
                    <h2 className="fs-5 text-danger fw-semibold">
                        {step === 1 ? "আমি এই ওয়েবসাইটের মাধ্যমে মানুষের উপকার করবো যাদের রক্তের প্রয়োজন "
                            : "আপনার এই পদক্ষেপ এক একটা মানুষ নতুন জীবন পেতে পারে "}
                    </h2>
                    <p>{step === 1 ? "একমত হলে হ্যাঁ নাহলে না " : "চিন্তার কিছু নেই করবো "}</p>
                    <div className="mt-3 d-flex justify-content-center">
                        <Button className="px-4 py-2 bg-danger border-0" onClick={onClose}>না</Button>
                        <CreateButton
                            className="ms-2 bg-success py-2 px-4 text-white rounded"
                            text="হ্যাঁ"
                            onClick={() => step === 1 ? setStep(2) : setProcessing(true)}
                        />
                    </div>
                </Modal.Body>
            </Modal>

            {/* ProcessingPopup */}
            <Modal show={showProcessing} centered>
                <Modal.Body className="text-center p-4">
                    <h5 className="mb-3">Processing Information</h5>   <div className="dot-typing ms-2"></div>
                    {['Mobile Number', 'National ID', 'Email ID'].map((label, index) => (
                        <div key={index} className="d-flex align-items-center justify-content-start mb-3">
                            <div className="d-flex justify-content-center align-items-baseline">
                                <i className={`bi ${processingStep >= index ? 'bi-check-circle text-success' : 'bi-circle text-secondary'} fs-4`} />
                                <p className="ms-3 mb-0">{label}</p>
                                {processingStep >= index && (
                                    <p className={`ms-2 fw-bold ${index === 2 && verificationError ? "text-danger" : "text-success"}`}>
                                        {index === 2 && verificationError ? "Not Verified ✗" : "Verified ✓"}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default TwoStepPopup;
