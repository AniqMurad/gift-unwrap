import React, { useState } from "react";
import SearchPageNavbar from '../components/SearchPageNavbar'
import Footer from '../components/Footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import Navbar from "@/components/Navbar";

const FAQs = () => {
    const categories = [
        "How To Buy",
        "Payment Methods",
        "Delivery",
        "Exchanges & Returns",
        "Contacts",
    ];

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const questionsByCategory = {
        "How To Buy": [
            { question: "How can I place an order?", answer: "You can place an order through our Instagram, Facebook, or directly on our website. Once your order is placed, our team will contact you to confirm and ask about any customization or special notes." },
            { question: "Can I customize a gift after placing the order?", answer: "Yes, absolutely! After your order is confirmed, we’ll reach out to you. During that time, you can request any customization or updates needed." }
        ],
        "Payment Methods": [
            { question: "What payment options do you offer?", answer: "Currently, we offer Cash on Delivery as the default payment method for your convenience." },
            { question: "Can I pay online or with a card?", answer: "If you contact us directly, we can arrange an online bank transfer. However, card payments are not available at the moment." }
        ],
        "Delivery": [
            { question: "When will I receive my order?", answer: "Most deliveries are completed within 24 hours of order placement. We always aim for quick and safe delivery." },
            { question: "Can I schedule delivery for a specific date?", answer: "Yes! Just mention your preferred delivery date in the order notes or let us know when we contact you, and we’ll do our best to accommodate it." }
        ],
        "Exchanges & Returns": [
            { question: "What if I am not happy with what I received?", answer: "We take full responsibility. If the product does not meet your expectations, we’ll arrange an exchange promptly." },
            { question: "How do I request an exchange?", answer: " Just contact us via call or message with your order details and the reason. We’ll guide you through the simple exchange process." }
        ],
        "Contacts": [
            { question: "How can I reach your team?", answer: "You can call us at +92 326 8927354, or message us on Instagram or Facebook anytime." },
            { question: "What are your customer support hours?", answer: "We are usually available 24 hours, seven days a week. Feel free to reach out anytime during those hours." }
        ]
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div>
            <Navbar showSearchInput={false} bgColor="#FBF4E8" />
            <SearchPageNavbar title="FAQs" titleHome="Home Page" backgroundColor='#FBF4E8' />

            <div className='px-4 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-14 flex flex-col lg:flex-row gap-6 lg:gap-8'>

                {/* Sidebar Categories */}
                <div className='w-full lg:w-[300px] order-2 lg:order-1'>
                    {/* Mobile dropdown for categories */}
                    <div className="lg:hidden mb-4">
                        <select 
                            value={selectedCategory} 
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg text-base bg-white"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Desktop sidebar */}
                    <ul className="hidden lg:block font-medium text-[#A0A0A0] text-lg">
                        {categories.map((category) => (
                            <li
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`mb-2 cursor-pointer px-4 py-2 rounded-lg transition text-base lg:text-lg ${selectedCategory === category
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
                <div className='w-full lg:w-[850px] order-1 lg:order-2'>
                    <Accordion type="multiple" className="space-y-3 sm:space-y-4">
                        {questionsByCategory[selectedCategory].map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-none">
                                <div className="border border-[#E9E9E9] rounded-lg sm:rounded-[20px] overflow-hidden">
                                    <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg lg:text-[20px] font-semibold w-full text-left">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 sm:px-6 pb-3 sm:pb-4 text-gray-600 text-sm sm:text-base lg:text-[18px] leading-relaxed">
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
