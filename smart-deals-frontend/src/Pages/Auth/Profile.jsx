import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import userIcon from './../../assets/user.png'
import { use } from 'react';
import { AuthContext } from '../../Context/Authentication/AuthContext';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from 'react-router';

const Profile = () => {
    const {user} = use(AuthContext);

    const userPicture = user?.photoURL || user?.providerData[0]?.photoURL || userIcon;

    return (
      <>
        <Header></Header>
        <div className="w-11/12 mx-auto pt-28 flex flex-col items-center justify-center mb-10">
          <h1 className="text-2xl font-semibold text-center mb-2">
            My Profile
          </h1>
          <div className="w-full md:w-1/2 px-2 py-6 shadow-2xl pb-4 rounded-lg">
            <div className="flex flex-col items-center justify-center">
              <img src={userPicture} alt="" className="w-28 rounded-full" />
              <h3 className="text-xl font-semibold text-gray-600 mt-2">
                {user?.displayName}
              </h3>
            </div>

            <div className="mt-10 px-5">
              <div className="bg-gray-100 p-2 mb-5 rounded-xl">
                <span className="text-gray-500 flex items-center gap-2">
                  <FaRegUser className="text-lg" />
                  Name
                </span>
                <p>{user?.displayName}</p>
              </div>

              <div className="bg-gray-100 p-2 mb-5 rounded-xl">
                <span className="text-gray-500 flex items-center gap-2">
                  <MdOutlineMailOutline className="text-lg" />
                  Email Address
                </span>
                <p>{user?.email}</p>
              </div>

              <div>
                {
                    !user.emailVerified ?
                    <Link to='/emailverification' className='btn bg-blue-800 text-white mt-4'>Verify Your Email</Link>
                    :
                    ''
                }
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
};

export default Profile;