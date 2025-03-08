import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserStore from "../../store/UsersStore.js";
import ColumLoader from "../../Layout/Loader/ColumLoader.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

const Card = () => {
    const { userList, DonnerList } = UserStore();
    const displayList = DonnerList.length > 0 ? DonnerList : userList;

    // State for items and loading placeholders
    const [items, setItems] = useState([]);
    const [loadingItems, setLoadingItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const initialItems = displayList.slice(0, 8);
        setItems(initialItems);
        setLoadingItems(new Array(initialItems.length).fill(true)); // Initial loaders
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

    const titleText = DonnerList.length === 0 ? "Get Blood" : DonnerList[0]?.location?.Division || "Get Blood";

    return (
        <div className="container UserCard">
            <h1 className="main_title_text d-flex align-items-center justify-content-center text-uppercase">{titleText}</h1>
            <div className="container py-0 py-lg-3 mb-5">
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    className="row gap-0"
                >
                    {items.map((item, index) => (
                        <div className="col-lg-3 p-0 px-1 p-xl-2 col-6" key={index}>
                            {loadingItems[index] ? (
                                <ColumLoader /> // Show loader for each card
                            ) : (
                                <div className={`UserCard`}>
                                    <div className={`cards`}>
                                        <div className="blood-name">
                                            <h1>{item['bloodGroup'] || item.user?.['bloodGroup']}</h1>
                                        </div>
                                        <div className="user-Name">
                                            <h3>{item['firstName']}</h3>
                                            <div className="division d-flex justify-content-center align-items-center gap-0 gap-lg-2">
                                                <p>{item.profile?.location?.Division || item.location?.['Division'] || "null"}</p>
                                                <p>{item.profile?.location?.zila || item.location?.['zila'] || "null"}</p>
                                            </div>
                                        </div>
                                        <div className="chekUser">
                                            <div className="verifiedItem">
                                                {item.NIDNumber || item.user?.NIDNumber ? (
                                                    <>
                                                        <i className="bi bi-check-circle-fill"></i>
                                                        <span>Verified NID</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-exclamation-circle-fill text-danger"></i>
                                                        <span> NID NOT Verified</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="verifiedItem">
                                                {item.NIDNumber || item.user?.phoneNumber ? (
                                                    <>
                                                        <i className="bi bi-check-circle-fill"></i>
                                                        <span>Verified Number</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-exclamation-circle-fill text-danger"></i>
                                                        <span>Verified Number</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="verifiedItem">
                                                <i className="bi bi-check-circle-fill"></i>
                                                <span>{item.Gender || item.user?.['Gender']}</span>
                                            </div>
                                            <div className="verifiedItem">
                                                {item.verify === true || item.user?.verify === true ? (
                                                    <>
                                                        <i className="bi bi-check-circle-fill"></i>
                                                        <span>verified user</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-exclamation-circle-fill text-danger"></i>
                                                        <span className="alerts"> User Not Verified</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="verifiedItem">
                                                {(
                                                    (item.profile?.location?.zila || item.location?.zila) &&
                                                    (item.profile?.location?.upzila || item.location?.upzila) &&
                                                    (item.profile?.location?.CurrentAddress || item.location?.CurrentAddress)
                                                ) ? (
                                                    <>
                                                        <i className="bi bi-house-check-fill"></i>
                                                        <span>{item.profile?.location?.zila || item.location?.zila},</span>
                                                        <span> {item.profile?.location?.upzila || item.location?.upzila}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-house-exclamation text-danger"></i>
                                                        <span className="alerts">Address Not Found</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="contactUser gap-1 gap-lg-3">
                                            {item.verify === true || item.user?.verify === true ? (
                                                <>
                                                    <a className="contact visible-button" href={`tel:${item.phoneNumber}`}>Contact</a>
                                                    <Link className="details visible-button" to="/user">Details</Link>
                                                </>
                                            ) : (
                                                <>
                                                    <a className="contact disabled-button" href="#">Contact</a>
                                                    <Link className="details disabled-button" to="/user">Details</Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default Card;