import React, { useState } from 'react'

const UsernameField = ({ value, onChange, error }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                name="email"
                value={value}
                onChange={onChange}
                placeholder="Username or email address"
                className={`w-full p-4 border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
};

export default UsernameField