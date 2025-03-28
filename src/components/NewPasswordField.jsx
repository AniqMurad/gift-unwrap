import React, { useState } from "react";
import { HeartIcon, PassHiddenIcon } from "@/components/icons";

const NewPasswordField = () => {
    const [newPassword, setNewPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);

    return (
        <div className="relative mt-4 flex items-center">
            <label
                className={`absolute left-4 top-4 text-[#696C70] text-[16px] transition-all duration-200 
                pointer-events-none z-0 bg-white
                ${newPassword ? "hidden" : ""}`}
            >
                New Password <span className="text-[#DB4444]">*</span>
            </label>
            <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border rounded-[8px] px-[16px] py-[11px] mt-1 focus:outline-none z-20 bg-transparent"
            />
            <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 z-20"
            >
                {showNewPassword ? <HeartIcon /> : <PassHiddenIcon />}
            </button>
        </div>
    );
};

export default NewPasswordField;
