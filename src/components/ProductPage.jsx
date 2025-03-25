import React from 'react'
import Product from './Product'
import ProductData from '../components/ProductData';

const ProductPage = ({ title, category }) => {
    const products = ProductData[category] ? ProductData[category].slice(0, 4) : [];

    return (
        <div className=''>
            <div className='px-16 py-4'>
                <div className='flex justify-between'>
                    <h2 className="text-3xl font-bold">{title}</h2>

                    <div className='flex gap-4 bg-[#F7F7F7] rounded-[12px] p-2 '>
                        <button className='font-bold text-[12px]'>
                            ALL
                        </button>
                        <button className='font-bold text-[12px]'>
                            APPARELS
                        </button>
                        <button className='font-bold text-[12px]'>
                            PERSONAL CARE
                        </button>
                        <button className='font-bold text-[12px]'>
                            ACCESSORIES
                        </button>
                        <button className='font-bold text-[12px]'>
                            GIFT BOX
                        </button>
                        <button className='font-bold text-[12px]'>
                            CUSTOMIZED GIFT
                        </button>
                    </div>
                </div>

                <div className='flex justify-between mt-5 gap-5'>
                    {products.map((item) => (
                        <Product key={item.id} product={item} />
                    ))}
                </div>

            </div>
        </div >
    )
}

export default ProductPage