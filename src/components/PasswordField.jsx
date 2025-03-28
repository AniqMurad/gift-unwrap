import React, { useState } from 'react'
import { PassHiddenIcon, HeartIcon } from "../components/icons";

const PasswordField = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative mt-4 flex items-center">
            <label
                className={`absolute left-4 top-4 text-[#696C70] text-[16px] transition-all duration-200 
                pointer-events-none z-0 bg-white
                ${password ? "hidden" : ""}`}
            >
                Password <span className="text-[#DB4444]">*</span>
            </label>
            <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-[8px] px-[16px] py-[11px] mt-1 focus:outline-none z-20 bg-transparent"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 z-20"
            >
                {showPassword ? <HeartIcon /> : <PassHiddenIcon />}
            </button>
        </div>
    )
}

export default PasswordField