import React from 'react';
import { AuthContext } from '../Context/Authentication/AuthContext';
import { use } from 'react';
import CustomLoader from '../Components/CustomLoader';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext)
    const location = useLocation();

    if(loading){
        return <CustomLoader></CustomLoader>
    }
    
    if(user){
        return children;
    }
    else{
        return <Navigate to='/auth/login' state={location.pathname}></Navigate>
    }
};

export default PrivateRoute;