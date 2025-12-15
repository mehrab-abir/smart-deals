import React from 'react';
import { Link } from 'react-router';

const SingleProduct = ({product}) => {
    const {_id, title, condition, price_min, price_max, image} = product;
    return (
      <div className="p-3 shadow-md rounded-md h-full relative bg-surface">
        <img
          src={image}
          alt=""
          className="w-full h-72 object-cover rounded-md"
        />
        <h3 className="text-xl font-semibold leading-snug min-h-14 mt-2">{`${title} [${condition}]`}</h3>
        <p className="text-navy-dark font-semibold mt-1">
          ${`${price_min} - $${price_max}`}
        </p>
        <Link to={`/products/${_id}`} className="btn bg-blue-900 border-none text-white w-full mt-1">
          View Details
        </Link>
      </div>
    );
};

export default SingleProduct;