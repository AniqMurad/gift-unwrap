    import React, { useState, useEffect } from "react";
    import SearchPageNavbar from "../components/SearchPageNavbar";
    import Footer from "../components/Footer";
    import Navbar from "@/components/Navbar";
    import DeliveryMarquee from "@/components/DeliveryMarquee";
    import { CloseIcon } from "@/components/icons";
    import OrderSummary from "@/components/OrderSummary";
    import NotificationBar from "@/components/NotificationBar";
    import Loader from "@/components/Loader";
    import ProductDetailModal from "@/components/ProductDetailModal";
    import { useNavigate } from "react-router-dom";

    const BuildGiftBox = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [giftBoxItems, setGiftBoxItems] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedBox, setSelectedBox] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardMessage, setCardMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [saveCardDetails, setSaveCardDetails] = useState(false);
    const [productModal, setProductModal] = useState({
        isOpen: false,
        item: null,
        itemType: null,
    });
    const [modalQuantity, setModalQuantity] = useState(1);
    const [notification, setNotification] = useState({
        show: false,
        type: "success",
        message: "",
    });
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "Pakistan",
        city: "",
        street: "",
        state: "",
        postalCode: "",
        additionalInfo: "",
    });

    // Dynamic data from APIs
    const [products, setProducts] = useState([]);
    const [boxOptions, setBoxOptions] = useState([]);
    const [cardOptions, setCardOptions] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    const API_BASE_URL = "https://giftunwrapbackend.vercel.app/api";
    // const API_BASE_URL = "http://localhost:5000/api";

    // Fetch data from APIs on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setDataLoading(true);
                const [itemsRes, boxesRes, cardsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/gift-box-items`),
                    fetch(`${API_BASE_URL}/boxes`),
                    fetch(`${API_BASE_URL}/cards`)
                ]);

                const itemsData = await itemsRes.json();
                const boxesData = await boxesRes.json();
                const cardsData = await cardsRes.json();

                setProducts(itemsData);
                setBoxOptions(boxesData);
                setCardOptions(cardsData);
                setDataLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setDataLoading(false);
                showNotification("error", "Failed to load gift box items. Please refresh the page.");
            }
        };

        fetchData();
    }, []);

    // Get unique categories from products
    const categories = [
        { value: "all", label: "All Categories" },
        ...Array.from(new Set(products.map(p => p.category)))
            .map(cat => ({
                value: cat,
                label: cat.charAt(0).toUpperCase() + cat.slice(1)
            }))
    ];

    const filteredProducts = selectedCategory === "all" 
        ? products 
        : products.filter(p => p.category === selectedCategory);

    const steps = [
        { id: 1, name: "PICK GIFTS", label: "Pick Gifts" },
        { id: 2, name: "SELECT YOUR BOX", label: "Select Your Box" },
        { id: 3, name: "WRITE YOUR CARD", label: "Write Your Card" },
        { id: 4, name: "SHIPPING", label: "Shipping" }
    ];

    const addToBox = (product, quantity = 1) => {
        setGiftBoxItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: quantity }];
        });
        
        // Auto-open drawer to show the impact
        setIsDrawerOpen(true);
        
        // Show success notification
        showNotification("success", `${product.name} added to your gift box!`);
    };

    const removeFromBox = (productId) => {
        setGiftBoxItems((prevItems) => prevItems.filter(item => item.id !== productId));
    };

    const updateBoxQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromBox(productId);
        } else {
            setGiftBoxItems((prevItems) =>
                prevItems.map(item =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const getTotalBoxItems = () => {
        return giftBoxItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalBoxPrice = () => {
        let total = giftBoxItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        if (selectedBox) total += selectedBox.price;
        if (selectedCard) total += 0; // Cards are free, but you can add price if needed
        return total;
    };

    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification((prev) => ({ ...prev, show: false }));
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    useEffect(() => {
        if (!productModal.isOpen) return;

        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setProductModal({
                    isOpen: false,
                    item: null,
                    itemType: null,
                });
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [productModal.isOpen]);

    const showNotification = (type, message) => {
        setNotification({ show: true, type, message });
    };

    const openProductModal = (item, itemType) => {
        setProductModal({
            isOpen: true,
            item: item,
            itemType: itemType,
        });
        setModalQuantity(1);
    };

    const closeProductModal = () => {
        setProductModal({
            isOpen: false,
            item: null,
            itemType: null,
        });
        setModalQuantity(1);
    };

    const handleSelectFromModal = () => {
        if (productModal.itemType === "box" && productModal.item) {
            setSelectedBox(productModal.item);
            closeProductModal();
            showNotification("success", `${productModal.item.name} selected as your gift box!`);
            // Auto-open drawer to show the impact
            setIsDrawerOpen(true);
            return;
        }

        if (productModal.itemType === "card" && productModal.item) {
            setSelectedCard(productModal.item);
            closeProductModal();
            showNotification("success", `${productModal.item.name} selected as your gift card!`);
            // Auto-open drawer to show the impact
            setIsDrawerOpen(true);
        }
    };

    const handleAddItemFromModal = () => {
        if (productModal.item && modalQuantity > 0) {
            addToBox(productModal.item, modalQuantity);
            closeProductModal();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
        if (notification.show) {
            setNotification((prev) => ({ ...prev, show: false }));
        }
    };

    const subtotal = getTotalBoxPrice();
    const freeShippingThreshold = 10000;
    const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 350;
    const discountAmount = 0;
    const totalOrderAmount = subtotal + shippingCost - discountAmount;

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setNotification((prev) => ({ ...prev, show: false }));

        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!formData.phone || !/^\d{11,15}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be 11 to 15 digits.";
        }
        if (!formData.street) newErrors.street = "Street address is required.";
        if (!formData.city) newErrors.city = "City is required.";
        if (!formData.state) newErrors.state = "State is required.";
        if (!formData.postalCode || isNaN(formData.postalCode)) {
            newErrors.postalCode = "Postal code must be a number.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        if (giftBoxItems.length === 0) {
            showNotification("error", "Please add at least one gift item to your box.");
            setIsLoading(false);
            return;
        }

        if (!selectedBox) {
            showNotification("error", "Please select a box before proceeding.");
            setIsLoading(false);
            return;
        }

        const userId = localStorage.getItem("userId");

        const orderData = {
            userId,
            giftBoxOrder: true,
            selectedBox: selectedBox,
            selectedCard: selectedCard,
            cardMessage: cardMessage,
            shippingInfo: formData,
            paymentMethod: paymentMethod,
            cardDetails:
                paymentMethod === "creditCard"
                    ? { cardName, cardNumber, expiry, cvv, saveCardDetails }
                    : null,
            orderItems: giftBoxItems.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.image,
                category: item.category,
            })),
        };

        try {
            const response = await fetch(
                `${API_BASE_URL}/orders`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderData),
                }
            );

            const data = await response.json();

            if (response.ok) {
                const orderSummaryData = {
                    cartItems: [
                        ...giftBoxItems.map((item) => ({
                            id: item.id,
                            name: item.name,
                            quantity: item.quantity,
                            price: item.price,
                            image: item.image,
                            category: item.category,
                        })),
                        ...(selectedBox ? [{ id: 'box', name: selectedBox.name, quantity: 1, price: selectedBox.price, image: selectedBox.image }] : []),
                        ...(selectedCard ? [{ id: 'card', name: selectedCard.name, quantity: 1, price: 0, image: selectedCard.image }] : []),
                    ],
                    subtotal,
                    shippingCost,
                    discountAmount,
                    totalOrderAmount,
                    showDiscountApplied: false,
                };

                const shippingDetails = {
                    email: formData.email,
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.postalCode,
                    country: formData.country,
                    phone: formData.phone,
                };

                showNotification(
                    "success",
                    `Gift box order placed successfully! Order ID: ${data._id}. Redirecting...`
                );

                setTimeout(() => {
                    navigate("/order-confirmation", {
                        state: {
                            orderId: data._id,
                            orderSummary: orderSummaryData,
                            customerName: formData.firstName,
                            shippingInfo: shippingDetails,
                        },
                    });
                }, 2000);
            } else {
                showNotification(
                    "error",
                    `Failed to place order: ${data.message || "Server error"}`
                );
                setIsLoading(false);
            }
        } catch (error) {
            showNotification(
                "error",
                "An error occurred while submitting your order. Please try again."
            );
            setIsLoading(false);
        }
    };

    const handleNextStep = () => {
        if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
        case 1:
            return (
            <div className="py-6">
                {/* Category Filter */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold">Pick Gifts</h2>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border border-gray-300 px-4 py-2 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="relative aspect-square">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover cursor-pointer"
                                    onClick={() => openProductModal(product, "giftItem")}
                                />
                            </div>
                            <div className="p-3 sm:p-4">
                                <h3 className="font-semibold text-sm sm:text-base mb-1 truncate">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 font-bold mb-3">PKR {product.price.toFixed(2)}</p>
                                <button
                                    onClick={() => addToBox(product)}
                                    className="w-full bg-black text-white cursor-pointer py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base"
                                >
                                    Add to Box
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            );
        case 2:
            return (
            <div className="py-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-6">Select Your Box</h2>
                <p className="text-gray-600 mb-8">Choose the perfect box size for your gifts</p>
                
                {/* Box Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {boxOptions.map((box) => (
                        <div
                            key={box.id}
                            onClick={() => setSelectedBox(box)}
                            className={`bg-white border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl ${
                                selectedBox?.id === box.id ? 'border-black shadow-lg' : 'border-gray-200'
                            }`}
                        >
                            <div className="relative aspect-square" style={{ backgroundColor: box.color }}>
                                <img
                                    src={box.image}
                                    alt={box.name}
                                    className="w-full h-full object-cover opacity-80 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openProductModal(box, "box");
                                    }}
                                />
                                {selectedBox?.id === box.id && (
                                    <div className="absolute top-2 right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                                        ✓
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2">{box.name}</h3>
                                <p className="text-xs text-gray-600 mb-1">Size: {box.size}</p>
                                <p className="text-xs text-gray-600 mb-2">Capacity: {box.capacity}</p>
                                <p className="text-lg font-bold text-black">PKR {box.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedBox && (
                    <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 font-semibold">
                            ✓ Selected: {selectedBox.name} - PKR {selectedBox.price.toFixed(2)}
                        </p>
                    </div>
                )}
            </div>
            );
        case 3:
            return (
            <div className="py-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-6">Write Your Card</h2>
                <p className="text-gray-600 mb-8">Choose a card design and add a personal message (optional)</p>
                
                {/* Card Options Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
                    {cardOptions.map((card) => (
                        <div
                            key={card.id}
                            onClick={() => setSelectedCard(card)}
                            className={`bg-white border-2 rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                                selectedCard?.id === card.id ? 'border-black shadow-lg' : 'border-gray-200'
                            }`}
                        >
                            <div className="relative aspect-[3/4]" style={{ backgroundColor: card.color }}>
                                <img
                                    src={card.image}
                                    alt={card.name}
                                    className="w-full h-full object-cover opacity-70 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openProductModal(card, "card");
                                    }}
                                />
                                {selectedCard?.id === card.id && (
                                    <div className="absolute top-2 right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                        ✓
                                    </div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                    <p className="text-white text-xs font-semibold">{card.design}</p>
                                </div>
                            </div>
                            <div className="p-2">
                                <p className="text-xs font-semibold truncate">{card.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input Section */}
                {selectedCard && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Add Your Message (Optional)</h3>
                        <textarea
                            value={cardMessage}
                            onChange={(e) => setCardMessage(e.target.value)}
                            placeholder="Write your personal message here..."
                            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                            maxLength={250}
                        />
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-gray-500">
                                {cardMessage.length}/250 characters
                            </p>
                            {cardMessage && (
                                <button
                                    onClick={() => setCardMessage("")}
                                    className="text-xs text-red-600 hover:text-red-800"
                                >
                                    Clear message
                                </button>
                            )}
                        </div>
                        
                        {/* Preview */}
                        {cardMessage && (
                            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                                <p className="text-xs text-gray-600 mb-2 font-semibold">Message Preview:</p>
                                <p className="text-sm text-gray-800 italic">"{cardMessage}"</p>
                            </div>
                        )}
                    </div>
                )}

                {selectedCard && !cardMessage && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-blue-800 text-sm">
                            💡 Tip: Adding a personal message makes your gift extra special!
                        </p>
                    </div>
                )}
            </div>
            );
        case 4:
            return (
            <div className="py-6">
                <form onSubmit={handleSubmitOrder}>
                    <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-8">
                        {/* Shipping Information Form */}
                        <div className="w-full lg:w-[60%] space-y-5">
                            <div className="space-y-4">
                                <h2 className="text-xl sm:text-2xl font-semibold">Shipping Information</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {[
                                        { name: "firstName", placeholder: "First Name" },
                                        { name: "lastName", placeholder: "Last Name" },
                                    ].map(({ name, placeholder }) => (
                                        <div key={name}>
                                            <input
                                                type="text"
                                                name={name}
                                                value={formData[name]}
                                                onChange={handleChange}
                                                placeholder={placeholder}
                                                className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>
                                    ))}

                                    <div className="sm:col-span-2">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email Address"
                                            className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                            required
                                            disabled={isLoading}
                                        />
                                        {errors.email && (
                                            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone Number"
                                            className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                            required
                                            disabled={isLoading}
                                        />
                                        {errors.phone && (
                                            <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                                        )}
                                    </div>

                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="Country/Region"
                                        className="border px-3 py-2.5 rounded-lg w-full sm:col-span-2 text-sm"
                                        required
                                        disabled
                                    />

                                    <div className="sm:col-span-2">
                                        <input
                                            type="text"
                                            name="street"
                                            value={formData.street}
                                            onChange={handleChange}
                                            placeholder="Street Address"
                                            className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                            required
                                            disabled={isLoading}
                                        />
                                        {errors.street && (
                                            <p className="text-red-600 text-sm mt-1">{errors.street}</p>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Town / City"
                                            className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                            required
                                            disabled={isLoading}
                                        />
                                        {errors.city && (
                                            <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                                        )}
                                    </div>

                                    <div>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="State"
                                            className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                            required
                                            disabled={isLoading}
                                        />
                                        {errors.state && (
                                            <p className="text-red-600 text-sm mt-1">{errors.state}</p>
                                        )}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleChange}
                                            placeholder="Postal Code"
                                            className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                            required
                                            disabled={isLoading}
                                        />
                                        {errors.postalCode && (
                                            <p className="text-red-600 text-sm mt-1">{errors.postalCode}</p>
                                        )}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <textarea
                                            name="additionalInfo"
                                            value={formData.additionalInfo}
                                            onChange={handleChange}
                                            placeholder="Additional Information (Optional)"
                                            className="border px-3 py-2.5 rounded-lg w-full text-sm h-24 resize-none"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="space-y-4 mt-8">
                                <h3 className="text-lg font-semibold">Payment Method</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={paymentMethod === "cod"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4"
                                        />
                                        <span className="font-medium">Cash on Delivery</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="creditCard"
                                            checked={paymentMethod === "creditCard"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-4 h-4"
                                        />
                                        <span className="font-medium">Credit/Debit Card</span>
                                    </label>
                                </div>

                                {paymentMethod === "creditCard" && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="sm:col-span-2">
                                            <input
                                                type="text"
                                                placeholder="Cardholder Name"
                                                value={cardName}
                                                onChange={(e) => setCardName(e.target.value)}
                                                className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                                required={paymentMethod === "creditCard"}
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <input
                                                type="text"
                                                placeholder="Card Number"
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                                className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                                required={paymentMethod === "creditCard"}
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            value={expiry}
                                            onChange={(e) => setExpiry(e.target.value)}
                                            className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                            required={paymentMethod === "creditCard"}
                                        />
                                        <input
                                            type="text"
                                            placeholder="CVV"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                            className="border px-3 py-2.5 rounded-lg w-full text-sm"
                                            required={paymentMethod === "creditCard"}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Place Order Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
                            >
                                {isLoading ? "Processing..." : "Place Order"}
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-[38%]">
                            <OrderSummary
                                cartItems={[
                                    ...giftBoxItems,
                                    ...(selectedBox ? [{ id: 'box', name: selectedBox.name, quantity: 1, price: selectedBox.price, image: selectedBox.image }] : []),
                                    ...(selectedCard ? [{ id: 'card', name: selectedCard.name, quantity: 1, price: 0, image: selectedCard.image }] : []),
                                ]}
                                subtotal={subtotal}
                                shippingCost={shippingCost}
                                discountAmount={discountAmount}
                                totalOrderAmount={totalOrderAmount}
                                showDiscountApplied={false}
                                title="Gift Box Summary"
                            />
                        </div>
                    </div>
                </form>
            </div>
            );
        default:
            return null;
        }
    };

    return (
        <div>
        {(isLoading || dataLoading) && <Loader />}
        {notification.show && (
            <NotificationBar type={notification.type} message={notification.message} />
        )}
        <Navbar showSearchInput={false} bgColor="#FBF4E8" />
        <DeliveryMarquee />
        <SearchPageNavbar
            title="Build A Gift Box"
            titleHome="Homepage"
            backgroundColor="#FBF4E8"
            compact
        />
        
        {/* Step Indicator */}
        <div className="bg-[#FBF4E8] px-4 sm:px-8 lg:px-16 py-2 flex justify-center">
            <div className="bg-white rounded-full px-2 sm:px-4 py-2 mb-2 border-2 border-black border-black-600 shadow-lg inline-flex items-center gap-4 sm:gap-6 flex-wrap justify-center max-w-full">
            {/* Step Counter */}
            <div className="flex items-center gap-3">
                <span className="font-semibold text-sm sm:text-base whitespace-nowrap">
                STEP {currentStep} OF {steps.length}:
                </span>
                <div className="flex gap-1.5">
                {steps.map((step) => (
                    <div
                    key={step.id}
                    className={`w-2.5 h-2.5 rounded-full ${
                        step.id === currentStep ? "bg-black" : "bg-gray-300"
                    }`}
                    />
                ))}
                </div>
            </div>

            {/* Step Names */}
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center text-xs sm:text-sm">
                {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <span
                    className={`font-semibold whitespace-nowrap ${
                        step.id === currentStep
                        ? "text-black"
                        : step.id < currentStep
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                    >
                    {step.name}
                    </span>
                    {index < steps.length - 1 && (
                    <span className="text-gray-400 hidden sm:inline">&gt;</span>
                    )}
                </React.Fragment>
                ))}
            </div>

            {/* Next Step Button */}
            <button
                onClick={handleNextStep}
                disabled={currentStep === steps.length}
                className={`px-6 py-1 rounded-full font-semibold border-2 border-black cursor-pointer text-white text-sm sm:text-base whitespace-nowrap transition-all ${
                currentStep === steps.length
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#FF6B6B] hover:bg-[#FF5252]"
                }`}
            >
                NEXT STEP &gt;
            </button>
            </div>
        </div>

        {/* Step Content */}
        <div className="bg-[#ffffff] px-4 sm:px-8 lg:px-16 py-6 sm:py-8 lg:py-10 min-h-[60vh]">
            {renderStepContent()}

            {/* Navigation Buttons - Hidden on step 4 (shipping) as it has its own form submit */}
            {currentStep !== 4 && (
                <div className="flex justify-between mt-8 pt-8 border-t">
                <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-2 rounded font-semibold cursor-pointer ${
                    currentStep === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    &lt; Previous
                </button>
                
                <button
                    onClick={handleNextStep}
                    className="px-6 py-2 rounded bg-black text-white font-semibold hover:bg-gray-800 cursor-pointer"
                >
                    Next &gt;
                </button>
                </div>
            )}
        </div>

        {/* Floating Button to Open Drawer */}
        {(giftBoxItems.length > 0 || selectedBox || selectedCard) && (
            <button
                onClick={() => setIsDrawerOpen(true)}
                className="fixed right-0 top-[26%] transform -translate-y-1/2 bg-black text-white px-2 py-4 rounded-l-lg shadow-xl hover:bg-gray-800 transition-all z-40 flex flex-col items-center gap-2 group"
            >
                {/* Chevron Icon */}
                <div className="text-lg font-bold group-hover:animate-pulse">
                    &lt;
                </div>
                
                {/* Item Count Badge */}
                <div className="bg-white text-black rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm shadow-md">
                    {getTotalBoxItems() + (selectedBox ? 1 : 0) + (selectedCard ? 1 : 0)}
                </div>
                
                {/* Vertical Text */}
                <div className="flex flex-col items-center">
                    <span 
                        className="text-[10px] font-semibold tracking-wide"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                    >
                        Your Gift
                    </span>
                </div>
            </button>
        )}

        {/* Right Drawer */}
        {isDrawerOpen && (
            <>
                {/* Overlay */}
                <div
                    className="fixed inset-0 bg-transparent z-50 transition-opacity duration-300"
                    onClick={() => setIsDrawerOpen(false)}
                />
                
                {/* Drawer */}
                <div 
                    className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto"
                    style={{ 
                        animation: 'slideInFromRight 0.3s ease-out',
                    }}
                >
                    <style>{`
                        @keyframes slideInFromRight {
                            from {
                                transform: translateX(100%);
                            }
                            to {
                                transform: translateX(0);
                            }
                        }
                    `}</style>
                    <div className="p-6">
                        {/* Drawer Header */}
                        <div className="flex justify-between items-center mb-6 pb-4 border-b">
                            <div>
                                <h2 className="text-xl font-bold">Your Gift Box</h2>
                                <p className="text-sm text-gray-600">
                                    {getTotalBoxItems()} gift item{getTotalBoxItems() !== 1 ? 's' : ''}
                                    {selectedBox && <span> • Box selected</span>}
                                    {selectedCard && <span> • Card selected</span>}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <CloseIcon />
                            </button>
                        </div>

                        {/* Box Price Summary */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold">Total Price:</span>
                                <span className="text-xl font-bold">PKR {getTotalBoxPrice().toFixed(2)}</span>
                            </div>
                            <div className="text-xs text-gray-600 space-y-1 mb-3 pb-3 border-b">
                                <div className="flex justify-between">
                                    <span>Gift items:</span>
                                    <span>PKR {giftBoxItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
                                </div>
                                {selectedBox && (
                                    <div className="flex justify-between">
                                        <span>Box ({selectedBox.name}):</span>
                                        <span>PKR {selectedBox.price.toFixed(2)}</span>
                                    </div>
                                )}
                                {selectedCard && (
                                    <div className="flex justify-between">
                                        <span>Card ({selectedCard.name}):</span>
                                        <span>Free</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <span>Qty of Boxes:</span>
                                <select className="border rounded px-2 py-1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </div>

                        {/* Selected Items List */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-sm text-gray-700 mb-3">Your Items:</h3>
                            
                            {/* Selected Box */}
                            {selectedBox && (
                                <div className="flex gap-3 border-b pb-4 bg-blue-50 p-3 rounded-lg">
                                    <img
                                        src={selectedBox.image}
                                        alt={selectedBox.name}
                                        className="w-20 h-20 object-cover rounded cursor-pointer"
                                        onClick={() => openProductModal(selectedBox, "box")}
                                        style={{ backgroundColor: selectedBox.color }}
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-semibold text-sm mb-1">{selectedBox.name}</h4>
                                                <p className="text-xs text-gray-600 mb-1">{selectedBox.size}</p>
                                                <p className="text-gray-600 text-sm font-bold">PKR {selectedBox.price.toFixed(2)}</p>
                                            </div>
                                            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Box</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Selected Card */}
                            {selectedCard && (
                                <div className="flex gap-3 border-b pb-4 bg-purple-50 p-3 rounded-lg">
                                    <img
                                        src={selectedCard.image}
                                        alt={selectedCard.name}
                                        className="w-20 h-20 object-cover rounded cursor-pointer"
                                        onClick={() => openProductModal(selectedCard, "card")}
                                        style={{ backgroundColor: selectedCard.color }}
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-semibold text-sm mb-1">{selectedCard.name}</h4>
                                                <p className="text-xs text-gray-600 mb-1">{selectedCard.design}</p>
                                                {cardMessage && (
                                                    <p className="text-xs text-gray-700 italic mt-2 bg-white p-2 rounded">
                                                        "{cardMessage.substring(0, 50)}{cardMessage.length > 50 ? '...' : ''}"
                                                    </p>
                                                )}
                                            </div>
                                            <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">Card</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Gift Items */}
                            {giftBoxItems.length > 0 && (
                                <h4 className="font-semibold text-xs text-gray-600 mt-4">Gift Items:</h4>
                            )}
                            {giftBoxItems.map((item) => (
                                <div key={item.id} className="flex gap-3 border-b pb-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded cursor-zoom-in"
                                        onClick={() => openImagePreview(item.image, item.name)}
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                                        <p className="text-gray-600 text-sm mb-2">PKR {item.price.toFixed(2)}</p>
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={item.quantity}
                                                onChange={(e) => updateBoxQuantity(item.id, parseInt(e.target.value))}
                                                className="border rounded px-2 py-1 text-sm"
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => removeFromBox(item.id)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Continue Button */}
                        <button
                            onClick={() => {
                                setIsDrawerOpen(false);
                                handleNextStep();
                            }}
                            className="w-full mt-6 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                        >
                            Continue to Next Step
                        </button>
                    </div>
                </div>
            </>
        )}

        {/* Product Detail Modal */}
        <ProductDetailModal
            isOpen={productModal.isOpen}
            onClose={closeProductModal}
            item={productModal.item}
            itemType={productModal.itemType}
            onSelect={handleSelectFromModal}
            onAddItem={handleAddItemFromModal}
            quantity={modalQuantity}
            setQuantity={setModalQuantity}
        />

        <Footer />
        </div>
    );
    };

    export default BuildGiftBox;
