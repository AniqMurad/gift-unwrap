import React, { useState } from "react";
import SearchPageNavbar from '../components/SearchPageNavbar'
import Footer from '../components/Footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";

const FAQs = () => {
    const categories = [
        "How To Buy",
        "Payment Methods",
        "Delivery",
        "Exchanges & Returns",
        "Registration",
        "Look After Your Garments",
        "Contacts",
    ];

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const questionsByCategory = {
        "How To Buy": [
            { question: "NEW! Plus sizes for Woman", answer: "We have introduced a new range of plus sizes in our women's collection." },
            { question: "Where is my order?", answer: "You can track your order status from your account section." }
        ],
        "Payment Methods": [
            { question: "How can I pay for my purchases?", answer: "You can pay using credit/debit cards, PayPal, and other digital wallets." },
            { question: "I have a promotional or discount code. How do I use it?", answer: "Enter your promo code at checkout to apply the discount." }
        ],
        "Delivery": [
            { question: "What are the delivery types?", answer: "We offer standard, express, and same-day delivery options." },
            { question: "How does COVID-19 affect my online orders?", answer: "Delivery times may be longer due to safety measures." }
        ],
        "Exchanges & Returns": [
            { question: "How can I exchange or return an item?", answer: "You can return items within 30 days with the original receipt." },
            { question: "The items received are incorrect or defective. What should I do?", answer: "Contact our support team for assistance with defective or incorrect items." }
        ],
        "Registration": [
            { question: "Can I cancel or change my order?", answer: "Orders can only be modified within the first 2 hours of placement." },
            { question: "I cannot find my size or color. What should I do?", answer: "Use our 'Notify Me' feature to get alerts when stock is available." }
        ],
        "Look After Your Garments": [
            { question: "Can I save an item I like?", answer: "Yes, add it to your wishlist for later purchase." },
            { question: "Are the items in my shopping basket reserved automatically?", answer: "No, items are only reserved after checkout is completed." }
        ],
        "Contacts": [
            { question: "In which countries can I shop online?", answer: "Our online store ships to over 50 countries worldwide." },
            { question: "I have not received all the items in my order. What should I do?", answer: "Check your order status or contact our support team." }
        ]
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div>
            <SearchPageNavbar title="FAQs" titleHome="Home Page" backgroundColor = '#FBF4E8'/>

            <div className='px-16 py-14 flex justify-between'>

                {/* Sidebar Categories */}
                <div className='w-[300px]'>
                    <ul className="font-medium text-[#A0A0A0] text-[20px]">
                        {categories.map((category) => (
                            <li
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`mb-2 cursor-pointer px-4 py-1 rounded-lg transition text-[20px] ${selectedCategory === category
                                    ? "font-bold text-black underline"
                                    : "hover:bg-white"
                                    }`}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* FAQ Section - Displays questions based on selected category */}
                <div className='w-[850px]'>
                    <Accordion type="multiple" className="space-y-4">
                        {questionsByCategory[selectedCategory].map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-none">
                                <div className="border border-[#E9E9E9] rounded-[20px] overflow-hidden">
                                    <AccordionTrigger className="px-6 py-4 text-[20px] font-semibold w-full">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-4 text-gray-600 text-[18px]">
                                        {item.answer}
                                    </AccordionContent>
                                </div>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

            </div>

            <Footer />
        </div >
    )
}

export default FAQs;
