// OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import { MyorderLine, MyorderRightArrow } from './icons'; // Assuming these are relevant
import axios from 'axios';
import NotificationBar from './NotificationBar';

const filters = ['All', 'In Progress', 'Delivered', 'Cancelled'];

const OrderHistory = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [reviewInputs, setReviewInputs] = useState({});
    const [reviewRatings, setReviewRatings] = useState({});
    const [reviewSubmitting, setReviewSubmitting] = useState({});
    const [notification, setNotification] = useState({
        show: false,
        type: 'success',
        message: ''
    });

    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const showNotification = (type, message) => {
        setNotification({
            show: true,
            type,
            message
        });
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const loggedInUserId = localStorage.getItem('userId');

                if (!loggedInUserId) {
                    console.error('No user is logged in. Please log in to view orders.');
                    showNotification('error', 'No user is logged in. Please log in to view orders.');
                    setOrders([]);
                    return;
                }

                const response = await axios.get('https://giftunwrapbackend.vercel.app/api/orders/');
                const allOrders = response.data;
                const userOrders = allOrders.filter(order => order.user === loggedInUserId);
                const sortedOrders = userOrders.sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
                );

                setOrders(sortedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
                showNotification('error', 'Failed to load orders. Please try again.');
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
        const userString = localStorage.getItem('user');
        console.log("User String:", userString);
        let username = '';
        if (userString) {
            try {
                const userObj = JSON.parse(userString);
                username = userObj.name || '';
            } catch (e) {
                username = '';
            }
        }

        if (!reviewText || reviewText.trim() === "") {
            showNotification('error', 'Please provide a comment for your review.');
            return;
        }
        if (!rating || rating === 0) {
            showNotification('error', 'Please provide a rating for your review.');
            return;
        }
        if (!userId) {
            showNotification('error', 'No user is logged in. Cannot submit review.');
            return;
        }

        setReviewSubmitting((prev) => ({ ...prev, [orderItemNumericProductId]: true }));
        try {
            await axios.post(`https://giftunwrapbackend.vercel.app/api/products/${orderItemNumericProductId}/reviews`, {
                userId,
                rating,
                comment: reviewText.trim()
            });

            showNotification('success', 'Review submitted successfully!');

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
        } catch (error) {
            console.error('Error submitting review:', error);
            const errorMessage = error.response?.data?.message || 'Failed to submit review. Please try again.';
            showNotification('error', errorMessage);
        } finally {
            setReviewSubmitting((prev) => ({ ...prev, [orderItemNumericProductId]: false }));
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            {notification.show && (
                <NotificationBar type={notification.type} message={notification.message} />
            )}

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
                                                <p className="text-[24px] font-bold">Rs {orderItem?.priceAtTimeOfOrder.toFixed(2)}</p>
                                            </div>
                                            <div>
                                                <p><strong>Subtotal:</strong> PKR {order.subtotal}</p>
                                                <p><strong>Shipping:</strong> PKR {order.shippingCost}</p>
                                                <p><strong>Discount:</strong> PKR {order.discountAmount}</p>
                                                <p><strong>Total:</strong> <span className="fw-bold">PKR {order.totalAmount}</span></p>
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
                                                    className={`cursor-pointer text-2xl ${star <= (reviewRatings[orderItem.productId] || 0) ? 'text-yellow-500' : 'text-gray-300'}`}
                                                    onClick={() => handleRatingChange(orderItem.productId, star)}
                                                >
                                                    &#9733;
                                                </span>
                                            ))}
                                        </div>
                                        <textarea
                                            className="border rounded-md p-2 w-full min-h-[60px] resize-y focus:outline-none focus:border-black"
                                            placeholder="Write your review here..."
                                            value={reviewInputs[orderItem.productId] || ""}
                                            onChange={e => handleReviewChange(orderItem.productId, e.target.value)}
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