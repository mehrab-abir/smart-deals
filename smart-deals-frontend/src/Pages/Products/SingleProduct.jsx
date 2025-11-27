import React from 'react';

const SingleProduct = ({product}) => {
    const {title, condition, price_min, price_max, image} = product;
    return (
        <div className='p-2 shadow-md rounded-md'>
            <img src={image} alt="" className='w-full h-76 object-cover rounded-md' />
            <h3 className='text-xl font-semibold'>{`${title} [${condition}]`}</h3>
            <p className='text-blue-800 font-semibold mt-1'>${`${price_min} - ${price_max}`}</p>
        </div>
    );
};

export default SingleProduct;