import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BannerLoader = () => {
    const skeletonBaseColor = "#A9A9A9"; // Darker gray
    const skeletonHighlightColor = "#C0C0C0"; // Slightly lighter gray

    return (
        <div style={{
            padding: '20px',
            maxWidth: '100%',
            margin: '0 auto'
        }}>
            {/* Single full-width skeleton */}
            <div style={{
                width: '100%',
                height: 'clamp(200px, 40vw, 300px)', // Responsive height
                borderRadius: '12px',
                overflow: 'hidden'
            }}>
                <Skeleton
                    height="100%"
                    baseColor={skeletonBaseColor}
                    highlightColor={skeletonHighlightColor}
                />
            </div>
        </div>
    );
};

export default BannerLoader;
