import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import userIcon from './../assets/user.png'
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../Context/Authentication/AuthContext";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { IoIosLogIn } from "react-icons/io";

const Header = () => {
  const { user, signOutUser, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false); //for responsive menu/menu for small devices

  const [showDropdown, setShowDropdown] = useState(false); //for user dropdown
  const dropDownRef = useRef(null);

  useEffect(()=>{
    const handleClickOutside = (e)=>{

      if(dropDownRef.current && !dropDownRef.current.contains(e.target)){
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown",handleClickOutside);

    return (()=>{
      document.removeEventListener("mousedown",handleClickOutside)
    })
  },[])

  const handleSignOut = ()=>{
    signOutUser()
    .then(()=>{
        toast.info("Logged Out");
        setLoading(false);
        navigate('/');
    })
  }

  const userPicture = user?.photoURL || user?.providerData[0]?.photoURL || userIcon;

  return (
    <div className="py-6 shadow-md bg-base fixed w-full top-0 z-50">
      <div className="w-11/12 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* mobile menu toggler */}
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className="flex flex-col items-center justify-center space-y-1 md:hidden cursor-pointer"
          >
            <span className="w-8 h-1 bg-black rounded-md"></span>
            <span className="w-8 h-1 bg-black rounded-md"></span>
            <span className="w-8 h-1 bg-black rounded-md"></span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Smart<span className="text-blue-800">Deals</span>
          </h1>
        </div>

        <nav className="hidden md:flex gap-8 item-center text-center ml-4">
          <NavLink
            to="/"
            className="text-sm lg:text-lg hover:underline hover:text-[#0094b5]"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="text-sm lg:text-lg hover:underline hover:text-[#0094b5]"
          >
            All Products
          </NavLink>
          {user ? (
            <NavLink
              to="/myproducts"
              className="text-sm lg:text-lg hover:underline hover:text-[#0094b5]"
            >
              My Products
            </NavLink>
          ) : (
            ""
          )}
          {user ? (
            <NavLink
              to="/mybids"
              className="text-sm lg:text-lg hover:underline hover:text-[#0094b5]"
            >
              My Bids
            </NavLink>
          ) : (
            ""
          )}
          <NavLink
            to="/postproduct"
            className="text-sm lg:text-lg hover:underline hover:text-[#0094b5]"
          >
            Post a Product
          </NavLink>
        </nav>
        <div>
          {user ? (
            <div ref={dropDownRef}>
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2"
              >
                <img
                  src={userPicture}
                  alt=""
                  className="cursor-pointer w-12 rounded-full"
                  title={user.displayName}
                />
                <IoChevronDownCircleOutline className="text-2xl cursor-pointer" />
              </div>

              {/* user dropdown box */}
              <div
                className={`w-52 flex flex-col p-3 bg-white rounded-xl absolute top-20 right-2 shadow-xl ${
                  showDropdown
                    ? "opacity-100 mt-0 pointer-events-auto"
                    : "opacity-0 mt-5 pointer-events-none"
                } transition-all duration-500`}
              >
                <p className="text-lg font-semibold text-black mb-3">
                  {user?.displayName}
                </p>
                <Link to='/profile' className="text-lg text-black mb-3 hover:underline">
                  View Profile
                </Link>
                <button
                  onClick={() => handleSignOut()}
                  className="btn bg-white border-red-500 cursor-pointer hover:bg-red-500 hover:text-white"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-8">
              <Link
                to="/auth/login"
                className="cursor-pointer text-base flex flex-col items-center"
              >
                <IoIosLogIn className="text-xl font-bold" />
                <span className="md:text-lg font-semibold hover:underline">Login</span>
              </Link>
              <Link
                to="/auth/register"
                className="cursor-pointer text-base flex flex-col items-center"
              >
                <AiOutlineUserAdd className="text-xl" />
                <span className="md:text-lg font-semibold text-blue-600 hover:underline">
                  Sign up
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />

      {/* menu for mobile devices */}
      <div
        className={`w-full h-full fixed bg-white text-black top-0 left-0 ${
          openMenu ? "" : "-translate-x-full"
        } transition-all duration-400`}
      >
        <FaRegTimesCircle
          onClick={() => setOpenMenu(!openMenu)}
          className={`text-4xl absolute top-6 right-10 cursor-pointer opacity-0 ${
            openMenu ? "opacity-100" : ""
          } transition-all duration-300`}
        />
        <nav className="flex flex-col items-center justify-center space-y-3 mt-20">
          <NavLink
            onClick={() => setOpenMenu(!openMenu)}
            to="/"
            className="text-lg hover:underline hover:text-[#0094b5]"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setOpenMenu(!openMenu)}
            to="/products"
            className="text-lg hover:underline hover:text-[#0094b5]"
          >
            All Products
          </NavLink>
          {user ? (
            <NavLink
              onClick={() => setOpenMenu(!openMenu)}
              to="/myproducts"
              className="text-lg hover:underline hover:text-[#0094b5]"
            >
              My Products
            </NavLink>
          ) : (
            ""
          )}
          {user ? (
            <NavLink
              onClick={() => setOpenMenu(!openMenu)}
              to="/mybids"
              className="text-lg hover:underline hover:text-[#0094b5]"
            >
              My Bids
            </NavLink>
          ) : (
            ""
          )}
          <NavLink
            onClick={() => setOpenMenu(!openMenu)}
            to="/postproduct"
            className="text-lg hover:underline hover:text-[#0094b5]"
          >
            Post a Product
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Header;
