import React from 'react';
import Category from './Category';

const Categories = () => {
    return (
        <div className="w-full px-16 py-6 flex gap-6 justify-center">
            <Category />
            <Category />
            <Category />
        </div>
    );
};

export default Categories;
