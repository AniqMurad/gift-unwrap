import React, { useState } from 'react'

const UsernameField = () => {
    const [username, setUsername] = useState("");

    return (
        <div className="relative mt-4 flex items-center">
            <label
                className={`absolute left-4 top-4 text-[#696C70] text-[16px] transition-all duration-200
                pointer-events-none z-0 bg-white 
                ${username ? "hidden" : ""}`}
            >
                Username or email address <span className="text-[#DB4444]">*</span>
            </label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded-[8px] px-[16px] py-[11px] mt-1 focus:outline-none z-20 bg-transparent"
            />
        </div>
    )
}

export default UsernameField