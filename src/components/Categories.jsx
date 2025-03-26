import React from 'react';
import Category from './Category';
import gift1 from '../assets/g1.png';
import gift2 from '../assets/g2.png';
import gift3 from '../assets/g3.png';

const Categories = () => {
    return (
        <div className="w-full px-16 py-6 flex justify-between my-8">
            <Category image={gift1}/>
            <Category image={gift2}/>
            <Category image={gift3}/>
        </div>
    );
};

export default Categories;
