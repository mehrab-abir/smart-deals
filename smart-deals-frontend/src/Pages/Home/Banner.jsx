import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
    return (
      <div className="py-15 bg-gradient-primary pt-28">
        <div className="w-11/12 mx-auto flex items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center py-5">
            <h1 className="text-[#d6efff] text-3xl md:text-5xl font-bold w-[90%] md:w-[60%] my-5">
              Deal Your <span className="text-primary">Products </span>
              In a <span className="text-primary">Smart </span>Way!
            </h1>
            <p className="my-4 text-lg">
              SmartDeals helps you sell, resell, and shop from trusted local
              sellers — all in one place!
            </p>
            <div className="flex gap-4 items-center">
              <Link
                to="/products"
                className="btn bg-blue-800 text-white border-none"
              >
                Explore All Products
              </Link>
              <Link
                to="/postproduct"
                className="btn bg-accent text-white border-none"
              >
                Post a Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Banner;