import React, { useState, useEffect } from 'react';
import { MyorderLine, MyorderRightArrow } from './icons';
import axios from 'axios';

const filters = ['All', 'In Progress', 'Delivered', 'Cancelled'];

const OrderHistory = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [orders, setOrders] = useState([]); // State to store orders from API
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Get the logged-in user's ID from localStorage
                const loggedInUserId = localStorage.getItem('userId');
                if (!loggedInUserId) {
                    console.error('No user is logged in.');
                    setOrders([]); // Clear orders if no user is logged in
                    return;
                }

                // Fetch orders from the API
                const response = await axios.get('http://localhost:5000/api/orders/'); // Replace with your API endpoint
                const allOrders = response.data;

                // Filter orders for the logged-in user
                const userOrders = allOrders.filter(order => order.user === loggedInUserId);
                setOrders(userOrders);
                setFilteredOrders(userOrders); // Initialize filtered orders
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        // Apply the active filter to the orders
        const filtered = activeFilter === 'All'
            ? orders
            : orders.filter(order => order.status === activeFilter.toUpperCase());
        setFilteredOrders(filtered);
    }, [activeFilter, orders]);

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
                    filteredOrders.map((order, index) => (
                        <div
                            key={index}
                            className="border border-[#E9E9E9] py-[11px] px-[16px] rounded-[8px] shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center justify-between">
                                <div className=''>
                                    <div className='flex items-center gap-3 mb-3'>
                                        <span className="border-none text-black bg-[#F7F7F7] px-4 py-1 rounded-full text-sm">
                                            {order.status}
                                        </span>
                                        <MyorderLine />
                                        <p className="text-[16px]">{new Date(order.createdAt).toLocaleDateString()}</p>                                    </div>
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
                                <MyorderRightArrow />
                            </div>
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