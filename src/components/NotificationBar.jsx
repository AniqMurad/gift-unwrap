import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const NotificationBar = ({ type = 'success', message = '' }) => {
  const isSuccess = type === 'success';

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md shadow-md flex items-center gap-3 z-50 
        ${isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
    >
      {isSuccess ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <AlertTriangle className="w-5 h-5" />
      )}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default NotificationBar;
