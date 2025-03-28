import React, { useState } from 'react';

const BillingEmailField = () => {
    const [email, setEmail] = useState('');

    return (
        <div className="relative mt-4 flex items-center">
            <label
                className={`absolute left-4 top-4 text-[#696C70] text-[16px] transition-all duration-200 
                pointer-events-none z-0 bg-white ${email ? "hidden" : ""}`}
            >
                Billing Email <span className="text-[#DB4444]">*</span>
            </label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-[8px] px-[16px] py-[11px] mt-1 focus:outline-none z-20 bg-transparent"
            />
        </div>
    );
};

export default BillingEmailField;
