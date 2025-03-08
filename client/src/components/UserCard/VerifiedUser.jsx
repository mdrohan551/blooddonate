import React, { useState, useEffect } from "react";
import UserStore from "../../store/UsersStore.js";
import metaImg from "/images/meta.png";
import ColumLoader from "../../Layout/Loader/ColumLoader.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageSkeleton from "../../Layout/Loader/ImageSkeleton.jsx";

const VerifiedUser = () => {
    const { userList, DonnerList } = UserStore();
    const displayList = DonnerList.length > 0 ? DonnerList : userList;

    // ✅ State for items and loading placeholders
    const [items, setItems] = useState([]);
    const [loadingItems, setLoadingItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const initialItems = displayList.slice(0, 8);
        setItems(initialItems);
        setLoadingItems(new Array(initialItems.length).fill(true)); // ✅ Initial loaders
        setHasMore(displayList.length > 8);

        // Simulate loading effect for first batch
        setTimeout(() => {
            setLoadingItems(new Array(initialItems.length).fill(false));
        }, 1000);
    }, [displayList]);

    const fetchMoreData = () => {
        if (items.length >= displayList.length) {
            setHasMore(false);
            return;
        }

        const nextBatch = displayList.slice(items.length, items.length + 4);
        const newLoadingItems = new Array(nextBatch.length).fill(true);

        // First, add placeholders
        setLoadingItems((prev) => [...prev, ...newLoadingItems]);
        setItems((prev) => [...prev, ...nextBatch]);

        // Simulate loading
        setTimeout(() => {
            setLoadingItems((prev) =>
                prev.map((_, index) => (index < items.length + nextBatch.length ? false : _))
            );
        }, 1000);
    };

    const titleText =
        DonnerList.length === 0
            ? "Verified Donner"
            : DonnerList[0]?.location?.Division || "Verified Donner";

    return (
        <div className="container UserCard">
            <h1 className="main_title_text d-flex align-items-center justify-content-center text-uppercase">
                {titleText}
            </h1>
            <div className="container py-1 py-lg-4 mb-5">
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    className="row"
                >
                    {items.map((item, index) => (
                        item.verify !== false && ( // Skip unverified donors
                            <div className="col-6 col-sm-6 col-md-6 col-lg-3 g-3 g-lg-4" key={index}>
                                {loadingItems[index] ? (
                                    <ImageSkeleton /> // ✅ Show loader for each card
                                ) : (
                                    <div className="plan-card">
                                        <div className="metaVerified d-flex align-items-baseline justify-content-start">
                                            <h2 className="position-relative text-uppercase">
                                                {item.lastName || item.user?.lastName}
                                                <span>{item.Gender || item.user?.Gender}</span>
                                            </h2>
                                            <img src={metaImg} alt="Meta Verified" className="meta" />
                                            <p className="metaVefy"></p>
                                        </div>
                                        <div className="bloodGrup">
                                            <p>{item.bloodGroup || item.user?.bloodGroup}</p>
                                            <div></div>
                                        </div>
                                        <div className="benefits-list">
                                            <ul>
                                                <li>
                                                    <i className="bi bi-check-circle"></i>
                                                    <span>{item.profile?.HealthConditions || item.HealthConditions}</span>
                                                </li>
                                                <li>
                                                    <i className="bi bi-check-circle"></i>
                                                    <span>{item.profile?.location?.zila || item.location?.zila}</span>
                                                </li>
                                                <li>
                                                    <i className="bi bi-check-circle"></i>
                                                    <span>{item.profile?.location?.upzila || item.location?.upzila}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="button-get-plan">
                                            <a href={`tel:${item.phoneNumber}`}>
                                                <i className="bi bi-telephone"></i>
                                                <span>Contact</span>
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default VerifiedUser;
