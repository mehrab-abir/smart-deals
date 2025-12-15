import React from 'react';

const Footer = () => {
    return (
      <div className="bg-[#060030] py-10">
        <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[#dee7fa]">
          <div className="text-center w-full md:w-1/3">
            <h2 className="text-xl font-bold">
              Smart <span>Deals</span>
            </h2>
            <p className="">
              Your trusted marketplace for authentic local products. Discover
              the best deals from across Bangladesh.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <div className="mt-4">
              <p>All Products</p>
              <p>Dashboard</p>
              <p>Login</p>
              <p>Register</p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">Categories</h3>
            <div className="mt-4">
              <p>Electronics</p>
              <p>Fashion</p>
              <p>Home & Living</p>
              <p>Groceires</p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">Contact & Support</h3>
            <div className="mt-4">
              <p>Electronics</p>
              <p>Fashion</p>
              <p>Home & Living</p>
              <p>Groceires</p>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">Social Links</h3>
            <div className="mt-4">
              <p>Electronics</p>
              <p>Fashion</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Footer;