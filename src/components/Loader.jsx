import React from 'react';
import loader from '../assets/loader.gif'; // Adjust the path as necessary

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      {/* <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div> */}
      <img src={loader} alt="Loading..." className="w-32 h-32" />
    </div>
  );
};

export default Loader;