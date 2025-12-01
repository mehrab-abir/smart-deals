import React from 'react';
import { CirclesWithBar } from "react-loader-spinner";

const CustomLoader = () => {
    return (
        <div className='flex items-center justify-center my-45'>
            <CirclesWithBar
        height="100"
        width="100"
        color="blue"
        outerCircleColor="blue"
        innerCircleColor="blue"
        barColor="blue"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
        </div>
      
    );
};

export default CustomLoader;