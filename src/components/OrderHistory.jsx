import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You'll need to install axios: npm install axios
import { MyorderLine, MyorderRightArrow } from './icons';

const filters = ['All', 'In Progress', 'Delivered', 'Cancelled', 'Pending', 'Processing', 'Shipped', 'Failed']; // Updated to match backend statuses

const OrderHistory = () => {
    const [activeFilter, setActiveFilter] = useState('All'); // Changed default to 'All'
    const [orders, setOrders] = useState([]); // State to store fetched orders
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchUserOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                // Get the authentication token. Replace 'YOUR_AUTH_TOKEN_KEY' with where you store it (e.g., 'userInfo' from localStorage)
                const userInfoString = localStorage.getItem('userInfo'); 
                const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
                const token = userInfo ? userInfo.token : null; 

                if (!token) {
                    setError('You are not logged in. Please log in to view your orders.');
                    setLoading(false);
                    return;
                }

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                    },
                };

                // Make the API call to your backend
                const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
                setOrders(data); // Set the fetched orders to state
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError(err.response?.data?.message || 'Failed to fetch orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserOrders();
    }, []); // Empty dependency array means this runs once on mount

    const filteredOrders = activeFilter === 'All'
        ? orders
        : orders.filter(order => order.status && order.status.toUpperCase() === activeFilter.toUpperCase());


    if (loading) {
        return <div className="max-w-3xl mx-auto p-6 text-center">Loading orders...</div>;
    }

    if (error) {
        return <div className="max-w-3xl mx-auto p-6 text-center text-red-500">{error}</div>;
    }

    if (filteredOrders.length === 0) {
        return (
            <div className="max-w-3xl mx-auto p-6 text-center">
                <p>No orders found for the selected filter.</p>
                <div className="flex gap-3 mb-6 mt-4 justify-center">
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
            </div>
        );
    }

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
                {filteredOrders.map((order) => (
                    <div
                        key={order._id} // Use order._id as key (Mongoose _id)
                        className="border border-[#E9E9E9] py-[11px] px-[16px] rounded-[8px] shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex items-center justify-between">
                            <div className=''>
                                <div className='flex items-center gap-3 mb-3'>
                                    <span className="border-none text-black bg-[#F7F7F7] px-4 py-1 rounded-full text-sm">
                                        {order.status.toUpperCase()}
                                    </span>
                                    <MyorderLine />
                                    {/* Format date as needed */}
                                    <p className="text-[16px] text-black">{new Date(order.createdAt).toLocaleDateString()}</p> 
                                </div>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={order.orderItems[0]?.imageUrl || 'placeholder-image.jpg'} // Use the first item's image
                                        alt="Product"
                                        className="w-20 h-23 rounded object-cover"
                                    />
                                    <div>
                                        <p className='text-[16px]'>Order ID: {order._id.substring(0, 8)}...</p> {/* Display a truncated ID */}
                                        <p className="text-[16px]">{order.orderItems[0]?.name || 'N/A'}</p> {/* Display first item's name */}
                                        <p className="text-[24px] font-bold">${order.totalAmount.toFixed(2)}</p> {/* Display total amount */}
                                    </div>
                                </div>
                            </div>
                            <MyorderRightArrow />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;