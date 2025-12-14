import React from 'react';
import { Link } from 'react-router';

const Banner = () => {
    return (
      <div className="py-10 bg-[#c6baf7] bg-[linear-gradient(167deg,rgba(198,186,247,1)_10%,rgba(255,255,255,1)_95%)] pt-28">
        <div className="w-11/12 mx-auto flex items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center py-5">
            <h1 className="text-3xl md:text-5xl font-bold w-[90%] md:w-[60%] mb-2">
              Deal Your <span className="text-blue-800">Products </span>
              In a <span className="text-blue-800">Smart </span>Way!
            </h1>
            <p className="my-4">
              SmartDeals helps you sell, resell, and shop from trusted local
              sellers — all in one place!
            </p>
            <div className="join my-4">
              <div>
                <label className="input validator join-item rounded-l-4xl">
                  <input type="email" placeholder="Search product" />
                </label>
                <div className="validator-hint hidden">Search products...</div>
              </div>
              <button className="btn btn-neutral join-item rounded-r-4xl">
                Search
              </button>
            </div>

            <div className="flex gap-4 items-center">
              <Link to="/products" className="btn bg-blue-500 text-white">
                Explore All Products
              </Link>
              <Link to="/postproduct" className="btn bg-base text-black">
                Post a Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Banner;