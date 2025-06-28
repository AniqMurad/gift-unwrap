// OrderHistory.js
import React, { useState, useEffect } from 'react';
import { MyorderLine, MyorderRightArrow } from './icons';
import axios from 'axios';

const filters = ['All', 'In Progress', 'Delivered', 'Cancelled'];

const OrderHistory = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [reviewInputs, setReviewInputs] = useState({});
    const [reviewSubmitting, setReviewSubmitting] = useState({});
    const [reviewSuccess, setReviewSuccess] = useState({});
    const [reviewError, setReviewError] = useState({});


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const loggedInUserId = localStorage.getItem('userId');
                if (!loggedInUserId) {
                    console.error('No user is logged in.');
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

    // Handle review input change - now takes productId (which is item.productId)
    const handleReviewChange = (productId, value) => {
        console.log(`handleReviewChange - ProductId: ${productId}, Value: ${value}`);
        setReviewInputs((prev) => ({
            ...prev,
            [productId]: value, // Key by productId
        }));
    };

    // Handle review submit - now takes productId and productCategory
    // You have access to item.productCategory from the orderItemSchema
    const handleSubmitReview = async (productId, productCategory) => { // ADDED productCategory here
        console.log(`Frontend - Submitting review for productId: ${productId}, category: ${productCategory}`); // Debug log

        const userId = localStorage.getItem('userId');
        if (!userId) {
            setReviewError((prev) => ({ ...prev, [productId]: 'Please log in to submit a review.' }));
            return;
        }

        const reviewText = reviewInputs[productId];
        if (!reviewText || reviewText.trim() === "") {
            setReviewError((prev) => ({ ...prev, [productId]: 'Review cannot be empty.' }));
            return;
        }

        setReviewSubmitting((prev) => ({ ...prev, [productId]: true }));
        setReviewSuccess((prev) => ({ ...prev, [productId]: false }));
        setReviewError((prev) => ({ ...prev, [productId]: null })); // Clear previous error

        try {
            console.log("Frontend - Review payload:", {
                productId: productId,
                productCategory: productCategory, // NEW: Include productCategory in payload
                userId: userId,
                comment: reviewText,
            });

            const response = await axios.post('http://localhost:5000/api/reviews/', {
                productId: productId,
                productCategory: productCategory, // NEW: Send productCategory
                userId: userId,
                comment: reviewText,
            });

            console.log('Review submitted successfully:', response.data);
            setReviewSuccess((prev) => ({ ...prev, [productId]: true }));
            setReviewInputs((prev) => ({ ...prev, [productId]: "" })); // Clear input after success

        } catch (error) {
            console.error('Error submitting review:', error);
            let errorMessage = 'Failed to submit review. Please try again.';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            setReviewError((prev) => ({ ...prev, [productId]: errorMessage }));
        } finally {
            setReviewSubmitting((prev) => ({ ...prev, [productId]: false }));
            // Set a timeout to clear success/error messages after a few seconds
            setTimeout(() => {
                setReviewSuccess((prev) => ({ ...prev, [productId]: false }));
                setReviewError((prev) => ({ ...prev, [productId]: null }));
            }, 5000); // Clear after 5 seconds
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* Filter Tabs */}
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

            {/* Order Cards */}
            <div className="space-y-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => ( // Use order._id as key for the order card
                        <div
                            key={order._id} // Use order._id for the key of the order
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
                                            src={order.orderItems[0]?.imageUrl}
                                            alt={order.orderItems[0]?.name}
                                            className="w-20 h-23 rounded object-cover"
                                        />
                                        <div>
                                            <p className='text-[16px]'>Order ID: {order._id}</p>
                                            <p className="text-[16px]">{order.orderItems[0]?.name}</p>
                                            <p className="text-[24px] font-bold">${order.orderItems[0]?.priceAtTimeOfOrder.toFixed(2)}</p>
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

                            {/* Loop through each item in the order to allow individual reviews */}
                            {order.status === "delivered" && order.orderItems && order.orderItems.map((item) => (
                                <div key={item.productId} className="mt-4 border-t pt-4">
                                    <h4 className="text-md font-semibold mb-2">Review for: {item.name}</h4>
                                    <label className="block text-sm font-medium mb-1 text-gray-700">
                                        Add a Review:
                                    </label>
                                    <textarea
                                        className="border rounded-md p-2 w-full min-h-[60px] resize-y focus:outline-none focus:border-black"
                                        placeholder="Write your review here..."
                                        value={reviewInputs[item.productId] || ""}
                                        onChange={e => handleReviewChange(item.productId, e.target.value)}
                                        disabled={reviewSubmitting[item.productId]}
                                    />
                                    <button
                                        className="mt-2 bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
                                        // NEW: Pass item.productCategory to handleSubmitReview
                                        onClick={() => handleSubmitReview(item.productId, item.productCategory)}
                                        disabled={reviewSubmitting[item.productId] || !(reviewInputs[item.productId] && reviewInputs[item.productId].trim())}
                                    >
                                        {reviewSubmitting[item.productId] ? "Submitting..." : "Submit Review"}
                                    </button>

                                    {/* Success/Error Messages for THIS product review */}
                                    {reviewSuccess[item.productId] && (
                                        <p className="text-green-600 text-sm mt-1">Review submitted successfully for {item.name}!</p>
                                    )}
                                    {reviewError[item.productId] && (
                                        <p className="text-red-600 text-sm mt-1">{reviewError[item.productId]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No orders found for this user.</p>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;