import React, { useState } from 'react'
import { PassHiddenIcon, PassShowIcon } from "../components/icons";

const PasswordField = ({ value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-4">
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={value}
                    onChange={onChange}
                    placeholder="Password *"
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

export default PasswordField;