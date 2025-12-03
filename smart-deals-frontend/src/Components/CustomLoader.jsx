import React from 'react';
import loaderSpinner from '../assets/90-ring.svg'

const CustomLoader = () => {
    return (
      <div className="flex items-center justify-center my-45">
        <img src={loaderSpinner} className='w-36' alt="" />
      </div>
    );
};

export default CustomLoader;