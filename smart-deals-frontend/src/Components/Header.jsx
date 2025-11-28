import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import userIcon from './../assets/user.png'
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../Context/Authentication/AuthContext";

const Header = () => {
  const { user, signOutUser, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

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
        <h1 className="text-4xl font-bold">
          Smart<span className="text-blue-800">Deals</span>
        </h1>
        <nav className="flex gap-8 item-center">
          <NavLink to="/" className="text-lg">
            Home
          </NavLink>
          <NavLink to="/products" className="text-lg">
            Products
          </NavLink>
          <NavLink to="/myproducts" className="text-lg">
            My Products
          </NavLink>
          <NavLink to="/mybids" className="text-lg">
            My Bids
          </NavLink>
        </nav>
        <div>
          {user ? (
            <div className="flex items-center gap-2">
                <img src={userPicture} alt="" className="cursor-pointer w-12 rounded-full" title={user.displayName} />
                <button onClick={()=>handleSignOut()} className="btn  bg-white border-red-500 cursor-pointer hover:bg-red-500 hover:text-white">Log Out</button>
            </div> 
          ) : (
            <div>
              <Link
                to="/auth/register"
                className="btn bg-cyan-400 cursor text-base"
              >
                Register
              </Link>
              <Link
                to="/auth/login"
                className="btn bg-cyan-400 cursor text-base"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Header;
