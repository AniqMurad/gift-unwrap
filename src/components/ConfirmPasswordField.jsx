import React, { useState } from "react";
import { HeartIcon, PassHiddenIcon } from "@/components/icons";

const ConfirmPasswordField = () => {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="relative mt-4 flex items-center">
            <label
                className={`absolute left-4 top-4 text-[#696C70] text-[16px] transition-all duration-200 
                pointer-events-none z-0 bg-white
                ${confirmPassword ? "hidden" : ""}`}
            >
                Confirm Password <span className="text-[#DB4444]">*</span>
            </label>
            <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-[8px] px-[16px] py-[11px] mt-1 focus:outline-none z-20 bg-transparent"
            />
            <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 z-20"
            >
                {showConfirmPassword ? <HeartIcon /> : <PassHiddenIcon />}
            </button>
        </div>
    );
};

export default ConfirmPasswordField;
