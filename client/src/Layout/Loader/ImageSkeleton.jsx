import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ImageSkeleton = () => {
    const baseColor = "#A9A9A9"; // Dark Gray
    const highlightColor = "#C0C0C0"; // Light Gray

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                maxWidth: "100%",
                padding: "20px",
                boxSizing: "border-box",
            }}
        >
            {/* Top Left Square + Small Box */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Large Box */}
                <div style={{ width: "80px", height: "50px" }}>
                    <Skeleton height="100%" baseColor={baseColor} highlightColor={highlightColor} />
                </div>
                {/* Small Box */}
                <div style={{ width: "20px", height: "20px" }}>
                    <Skeleton height="100%" baseColor={baseColor} highlightColor={highlightColor} />
                </div>
            </div>

            {/* Wide Rectangle (Header) */}
            <div style={{ width: "100%", height: "30px" }}>
                <Skeleton height="100%" baseColor={baseColor} highlightColor={highlightColor} />
            </div>

            {/* List of Small Boxes with Text */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[1, 2, 3].map((_, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {/* Small Square */}
                        <div style={{ width: "20px", height: "20px" }}>
                            <Skeleton height="100%" baseColor={baseColor} highlightColor={highlightColor} />
                        </div>
                        {/* Small Rectangle */}
                        <div style={{ width: "100%", maxWidth: "150px", height: "20px" }}>
                            <Skeleton height="100%" baseColor={baseColor} highlightColor={highlightColor} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Two Large Rectangles Side by Side */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 100%", height: "50px", minWidth: "100px", maxWidth: "20%" }}>
                    <Skeleton className="h-50 h-md-75 h-lg-100" baseColor={baseColor} highlightColor={highlightColor} />
                </div>
            </div>
        </div>
    );
};

export default ImageSkeleton;