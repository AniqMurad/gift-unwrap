import React, { useState } from "react";
import { PassShowIcon, PassHiddenIcon } from "@/components/icons";

const ConfirmPasswordField = ({ value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-4">
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={value}
                    onChange={onChange}
                    placeholder="Confirm Password"
                    className={`w-full p-4 border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
                />
                <div 
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <PassShowIcon/>
                    ) : (
                        <PassHiddenIcon/>
                    )}
                </div>
            </div>
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
};

export default ConfirmPasswordField;