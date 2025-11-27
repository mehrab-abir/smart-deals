import React from 'react';
import { CirclesWithBar } from "react-loader-spinner";

const CustomLoader = () => {
    return (
        <div className='flex items-center justify-center mt-10'>
            <CirclesWithBar
        height="100"
        width="100"
        color="blue"
        outerCircleColor="#4fa94d"
        innerCircleColor="#4fa94d"
        barColor="#4fa94d"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
        </div>
      
    );
};

export default CustomLoader;