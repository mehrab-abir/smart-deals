import React, { useState } from "react";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();
        const form = e.target;
        const displayName = form.name.value;
        const email = form.email.value;
        const imageURL = form.image.value;
        const password = form.password.value;

        console.log({displayName,email,password,imageURL});
    }


    //login with google
    //----

  return (
    <div className="flex items-center justify-center pt-32 my-10">
      <div className="w-1/3 px-4 py-8 bg-[#f6f6f6] shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center">Register Now!</h1>
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-800 underline">
            Login Now
          </Link>
        </p>

        <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col space-y-3 mt-4 px-4">
          <div>
            <label>
              Name <br />
            </label>
            <input
              type="text"
              name="name"
              className="input outline-none w-full"
              placeholder="Your name"
            />
          </div>

          <div>
            <label>
              Email
              <br />
            </label>
            <input
              type="email"
              name="email"
              className="input outline-none w-full"
              placeholder="Your email"
            />
          </div>

          <div>
            <label>
              Image URL <br />
            </label>
            <input
              type="text"
              name="image"
              className="input outline-none w-full"
              placeholder="Your image url"
            />
          </div>

          <div className="relative">
            <label>
              Password <br />
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input outline-none w-full"
              placeholder="Password"
            />
            {showPassword ? (
              <FaRegEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3 text-lg cursor-pointer z-30"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3 text-lg cursor-pointer z-30"
              />
            )}
          </div>

          <button type="submit" className="btn bg-cyan-600 text-white w-full">
            Register
          </button>
          <p className="text-center">Or</p>
          <button className="btn bg-white shadow-md">
            <FcGoogle className="text-xl" />
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
