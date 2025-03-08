import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLayout = () => {
    // Custom dark colors for the skeleton
    const skeletonBaseColor = "#A9A9A9"; // Darker gray
    const skeletonHighlightColor = "#C0C0C0"; // Slightly lighter gray

    return (
        <div style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '100%',
            margin: '0 auto'
        }}>
            {/* Top circle centered */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                    width: 'clamp(80px, 20vw, 100px)', // Responsive width
                    height: 'clamp(80px, 20vw, 100px)', // Responsive height
                    borderRadius: '50%'
                }}>
                    <Skeleton
                        height="100%"
                        borderRadius="50%"
                        baseColor={skeletonBaseColor}
                        highlightColor={skeletonHighlightColor}
                    />
                </div>
            </div>

            {/* Large rectangle */}
            <div style={{
                width: '100%',
                height: 'clamp(40px, 10vw, 50px)' // Responsive height
            }}>
                <Skeleton
                    height="100%"
                    baseColor={skeletonBaseColor}
                    highlightColor={skeletonHighlightColor}
                />
            </div>

            {/* Small boxes with text */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        {/* Small box */}
                        <div style={{
                            width: 'clamp(15px, 5vw, 20px)', // Responsive width
                            height: 'clamp(15px, 5vw, 20px)' // Responsive height
                        }}>
                            <Skeleton
                                height="100%"
                                baseColor={skeletonBaseColor}
                                highlightColor={skeletonHighlightColor}
                            />
                        </div>
                        {/* Small rectangle */}
                        <div style={{
                            flex: 1,
                            height: 'clamp(15px, 5vw, 20px)' // Responsive height
                        }}>
                            <Skeleton
                                height="100%"
                                baseColor={skeletonBaseColor}
                                highlightColor={skeletonHighlightColor}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Two large rectangles side by side */}
            <div style={{
                display: 'flex',
                gap: '10px',
                flexDirection: 'row',
                flexWrap: 'wrap' // Wrap on smaller screens
            }}>
                <div style={{
                    flex: '1 1 45%', // Flex grow, shrink, and basis
                    height: 'clamp(40px, 10vw, 50px)', // Responsive height
                    minWidth: '150px' // Minimum width for smaller screens
                }}>
                    <Skeleton
                        height="100%"
                        baseColor={skeletonBaseColor}
                        highlightColor={skeletonHighlightColor}
                    />
                </div>
                <div style={{
                    flex: '1 1 45%', // Flex grow, shrink, and basis
                    height: 'clamp(40px, 10vw, 50px)', // Responsive height
                    minWidth: '150px' // Minimum width for smaller screens
                }}>
                    <Skeleton
                        height="100%"
                        baseColor={skeletonBaseColor}
                        highlightColor={skeletonHighlightColor}
                    />
                </div>
            </div>
        </div>
    );
};

export default SkeletonLayout;