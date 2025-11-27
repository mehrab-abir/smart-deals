import React from 'react';

const Footer = () => {
    return (
      <div className="bg-cyan-950 py-10">
        <div className="w-11/12 mx-auto flex justify-between gap-6 text-white">
          <div className='w-1/3'>
            <h2 className="text-xl font-bold text-white">
              Smart <span>Deals</span>
            </h2>
            <p className="">
              Your trusted marketplace for authentic local products. Discover
              the best deals from across Bangladesh.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">Quick Links</h3>
            <div className="mt-4">
              <p>All Products</p>
              <p>Dashboard</p>
              <p>Login</p>
              <p>Register</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold">Categories</h3>
            <div className="mt-4">
              <p>Electronics</p>
              <p>Fashion</p>
              <p>Home & Living</p>
              <p>Groceires</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold">Contact & Support</h3>
            <div className="mt-4">
              <p>Electronics</p>
              <p>Fashion</p>
              <p>Home & Living</p>
              <p>Groceires</p>
            </div>
          </div>
          <div>
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