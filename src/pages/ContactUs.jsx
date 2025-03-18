import React from 'react'
import SearchPageNavbar from '../components/SearchPageNavbar'
import Footer from '../components/Footer'

const ContactUs = () => {
    return (
        <div>
            <SearchPageNavbar title="Contact Us" />

            <div className='px-16 py-4 flex justify-between items-center mt-10'>

                <div className='w-[850px]'>

                    <div>
                        <h2 className="text-3xl font-semibold">Drop Us A Line</h2>
                        <p className="text-[#A0A0A0] mt-2">Use the form below to get in touch with the sales team </p>
                    </div>

                    <form className="mt-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Your Name*"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-gray-200 outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Your Email*"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-gray-200 outline-none"
                            />
                        </div>

                        <textarea
                            placeholder="Your Message*"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-4 h-28 focus:ring focus:ring-gray-200 outline-none"
                        ></textarea>

                        <button
                            type="submit"
                            className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                        >
                            SEND MESSAGE
                        </button>

                    </form>

                </div>

                <div className='w-[300px] text-[#1F1F1F]'>

                    <div>
                        <h3 className="text-2xl font-semibold">Our Store</h3>
                        <p className="mt-2">
                            2163 Phillips Gap Rd, West Jefferson, North Carolina, United States
                        </p>
                        <p className="mt-2">Phone: +1 666 8888</p>
                        <p className="">Email: hi.lavitrex@gmail.com</p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold mt-6">Open Hours</h3>
                        <p className="">Mon - Fri: 7:30am - 8:00pm PST</p>
                        <p className="">Saturday: 8:00am - 6:00pm PST</p>
                        <p className="">Sunday: 9:00am - 5:00pm PST</p>
                    </div>

                </div>

            </div>

            <Footer />
        </div>
    )
}

export default ContactUs