// OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import { MyorderLine, MyorderRightArrow } from './icons';
import axios from 'axios';

const filters = ['All', 'In Progress', 'Delivered', 'Cancelled'];

const OrderHistory = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    // Use orderItem.productId as the key for tracking review inputs/ratings
    const [reviewInputs, setReviewInputs] = useState({}); // { orderItemNumericProductId: reviewText }
    const [reviewRatings, setReviewRatings] = useState({}); // { orderItemNumericProductId: rating }
    const [reviewSubmitting, setReviewSubmitting] = useState({}); // { orderItemNumericProductId: boolean }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const loggedInUserId = localStorage.getItem('userId');
                if (!loggedInUserId) {
                    console.error('No user is logged in. Please log in to view orders.');
                    setOrders([]);
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/orders/');
                const allOrders = response.data;
                const userOrders = allOrders.filter(order => order.user === loggedInUserId);
                const sortedOrders = userOrders.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );

                setOrders(sortedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const inProgressStatuses = ['pending', 'processing', 'shipped'];
        const deliveredStatuses = ['delivered'];
        const cancelledStatuses = ['cancelled', 'returned'];

        let currentFilteredOrders = [];

        if (activeFilter === 'All') {
            currentFilteredOrders = orders;
        } else if (activeFilter === 'In Progress') {
            currentFilteredOrders = orders.filter(order => inProgressStatuses.includes(order.status));
        } else if (activeFilter === 'Delivered') {
            currentFilteredOrders = orders.filter(order => deliveredStatuses.includes(order.status));
        } else if (activeFilter === 'Cancelled') {
            currentFilteredOrders = orders.filter(order => cancelledStatuses.includes(order.status));
        }

        setFilteredOrders(currentFilteredOrders);
    }, [activeFilter, orders]);

    // We use orderItem.productId (the numeric one) as the key for state management
    const handleReviewChange = (orderItemNumericProductId, value) => {
        setReviewInputs((prev) => ({
            ...prev,
            [orderItemNumericProductId]: value,
        }));
    };

    const handleRatingChange = (orderItemNumericProductId, value) => {
        setReviewRatings((prev) => ({
            ...prev,
            [orderItemNumericProductId]: value,
        }));
    };

    const handleSubmitReview = async (orderItemNumericProductId) => {
        const reviewText = reviewInputs[orderItemNumericProductId];
        const rating = reviewRatings[orderItemNumericProductId];
        const userId = localStorage.getItem('userId'); // Ensure this is a valid MongoDB ObjectId string

        if (!reviewText || reviewText.trim() === "") {
            alert("Please provide a comment for your review.");
            return;
        }
        if (!rating || rating === 0) {
            alert("Please provide a rating for your review.");
            return;
        }
        if (!userId) {
            alert("No user is logged in. Cannot submit review.");
            return;
        }

        setReviewSubmitting((prev) => ({ ...prev, [orderItemNumericProductId]: true }));
        try {
            // The productId in the URL is now the NUMERIC 'id' of the product from orderItem
            await axios.post(`http://localhost:5000/api/products/${orderItemNumericProductId}/reviews`, {
                userId,
                rating,
                comment: reviewText.trim()
            });

            alert('Review submitted successfully!');
            // Clear the review input and rating for the submitted product
            setReviewInputs((prev) => {
                const newState = { ...prev };
                delete newState[orderItemNumericProductId];
                return newState;
            });
            setReviewRatings((prev) => {
                const newState = { ...prev };
                delete newState[orderItemNumericProductId];
                return newState;
            });
            // You might want to re-fetch orders here to show the review instantly on the UI, if you display them
            // Or handle state update to push the new review into the `orders` state
        } catch (error) {
            console.error('Error submitting review:', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(`Failed to submit review: ${error.response.data.message}`);
            } else {
                alert('Failed to submit review. Please try again.');
            }
        } finally {
            setReviewSubmitting((prev) => ({ ...prev, [orderItemNumericProductId]: false }));
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex gap-3 mb-6">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        className={`px-4 py-1 border rounded-full text-sm ${activeFilter === filter
                                ? 'border-black text-black font-bold bg-[#F7F7F7]'
                                : 'border-none text-black bg-[#F7F7F7]'
                            }`}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        order.orderItems.map((orderItem) => (
                            <div
                                // Key can still use orderItem._id if it's unique, or create a compound key
                                key={`${order._id}-${orderItem.productId}`}
                                className="border border-[#E9E9E9] py-[11px] px-[16px] rounded-[8px] shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className='flex items-center gap-3 mb-3'>
                                            <span className="border-none text-black bg-[#F7F7F7] px-4 py-1 rounded-full text-sm">
                                                {order.status}
                                            </span>
                                            <MyorderLine />
                                            <p className="text-[16px]">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={orderItem?.imageUrl}
                                                alt={orderItem?.name}
                                                className="w-20 h-23 rounded object-cover"
                                            />
                                            <div>
                                                <p className='text-[16px]'>Order ID: {order._id}</p>
                                                <p className="text-[16px]">{orderItem?.name}</p>
                                                <p className="text-[24px] font-bold">${orderItem?.priceAtTimeOfOrder.toFixed(2)}</p>
                                            </div>
                                            <div>
                                                <p><strong>Subtotal:</strong> ${order.subtotal}</p>
                                                <p><strong>Shipping:</strong> ${order.shippingCost}</p>
                                                <p><strong>Discount:</strong> ${order.discountAmount}</p>
                                                <p><strong>Total:</strong> <span className="fw-bold">${order.totalAmount}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {order.status === "delivered" && (
                                    <div className="mt-4 border-t pt-4">
                                        <label className="block text-sm font-medium mb-1 text-gray-700">
                                            Add a Review for "{orderItem.name}":
                                        </label>
                                        <div className="mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    className={`cursor-pointer text-2xl ${star <= (reviewRatings[orderItem.productId] || 0) ? 'text-yellow-500' : 'text-gray-300'}`} // Use orderItem.productId
                                                    onClick={() => handleRatingChange(orderItem.productId, star)} // Use orderItem.productId
                                                >
                                                    &#9733;
                                                </span>
                                            ))}
                                        </div>
                                        <textarea
                                            className="border rounded-md p-2 w-full min-h-[60px] resize-y focus:outline-none focus:border-black"
                                            placeholder="Write your review here..."
                                            value={reviewInputs[orderItem.productId] || ""} // Use orderItem.productId
                                            onChange={e => handleReviewChange(orderItem.productId, e.target.value)} // Use orderItem.productId
                                            disabled={reviewSubmitting[orderItem.productId]}
                                        />
                                        <button
                                            className="mt-2 bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
                                            onClick={() => handleSubmitReview(orderItem.productId)} // Use orderItem.productId
                                            disabled={
                                                reviewSubmitting[orderItem.productId] ||
                                                !(reviewInputs[orderItem.productId] && reviewInputs[orderItem.productId].trim()) ||
                                                !reviewRatings[orderItem.productId]
                                            }
                                        >
                                            {reviewSubmitting[orderItem.productId] ? "Submitting..." : "Submit Review"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    ))
                ) : (
                    <p className="text-center text-gray-500">No orders found for this user.</p>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;