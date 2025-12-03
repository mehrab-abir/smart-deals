import React from 'react';
import { use } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../Context/Authentication/AuthContext';

const MyBids = () => {
    const {user} = use(AuthContext);

    const [bids,setBids] = useState([]);
    
    useEffect(()=>{
        fetch(`http://localhost:3000/mybids?email=${user?.email}`)
        .then(res=>res.json())
        .then((data)=>setBids(data));
    },[user?.email])

    console.log(bids);

    return (
        <div className='w-11/12 mx-auto pt-28 mb-10'>
            <h1 className='text-4xl font-bold text-center'>My Bids ({bids.length})</h1>
        </div>
    );
};

export default MyBids;