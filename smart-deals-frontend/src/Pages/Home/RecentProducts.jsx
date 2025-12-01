import React from 'react';
import { useLoaderData } from 'react-router';
import SingleProduct from '../Products/SingleProduct';

const RecentProducts = () => {
    const products = useLoaderData();
    
    return (
        <div className='w-11/12 mx-auto my-10'>
            <div className='w-11/12 mx-auto'>
                <h1 className="text-4xl font-bold text-center mb-6">Recent <span className='text-blue-800'>Products</span></h1>
            </div>

            <div className='grid grid-cols-3 gap-6'>
                {
                    products.map((product)=>{
                        return <SingleProduct key={product._id} product={product}></SingleProduct>
                    })
                }
            </div>
        </div>
    );
};

export default RecentProducts;