import React from 'react';
import { Link, NavLink } from 'react-router';

const Header = () => {
    return (
        <div className='py-6 shadow-md bg-base fixed w-full top-0'>
            <div className='w-11/12 mx-auto flex items-center justify-between'>
                <h1 className='text-4xl font-bold'>Smart<span className='text-blue-800'>Deals</span></h1>
                <nav className='flex gap-8 item-center'>
                    <NavLink to='/' className="text-lg">Home</NavLink>
                    <NavLink to='/products' className="text-lg">Products</NavLink>
                    <NavLink to='/myproducts' className="text-lg">My Products</NavLink>
                    <NavLink to='/mybids' className="text-lg">My Bids</NavLink>
                </nav>
                <div>
                    <Link to='/auth/register' className='btn bg-cyan-400 cursor text-base'>Register</Link>
                    <Link to='/auth/login' className='btn bg-cyan-400 cursor text-base'>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;