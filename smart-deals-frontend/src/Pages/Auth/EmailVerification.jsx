import React from 'react';
import Header from './../../Components/Header'
import { use } from 'react';
import { AuthContext } from '../../Context/Authentication/AuthContext';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

const EmailVerification = () => {
    const {user, verifyEmail} = use(AuthContext);
    const navigate = useNavigate();

    const [verifyMessage, setVerifyMessage] = useState("");

    if(user.emailVerified){
        return <Navigate to='/' replace></Navigate>
    }

    const verify = () =>{
        verifyEmail()
        .then(()=>{
            setVerifyMessage("Please check your email, including spam");
        })
        .then(()=>{
            navigate('/')
        })
    }

    return (
        <div>
            <Header></Header>

            <div className='flex items-center justify-center pt-36'>
                <div className='bg-[#f8fff7] shadow-xl rounded-lg p-4'>
                     <h2 className='text-blue-700 font-bold text-2xl mt-2'>Verify your email</h2>

                     <p className='mt-3 text-blue-900 font-semibold'>{verifyMessage}</p>

                     <button onClick={()=>verify()} className='btn bg-blue-900 text-white mt-4 hover:bg-blue-800'>Verify Now</button>
                </div>
               
            </div>
        </div>
    );
};

export default EmailVerification;