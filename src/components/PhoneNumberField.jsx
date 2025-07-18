import React from 'react'

const PhoneNumberField = ({ value, onChange, error }) => {
  return (
   <div className="mb-4">
            <input
                type="text"
                name="phoneNumber"
                value={value}
                onChange={onChange}
                placeholder="Phone Number"
                className={`w-full p-4 border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
  )
}

export default PhoneNumberField
