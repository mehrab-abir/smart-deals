import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { AuthContext } from "../../Context/Authentication/AuthContext";

const Login = () => {
  const { loginUser, googleSignIn, setUser, setLoading } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // console.log("Login",{email,password});

    loginUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setLoading(false);
        toast.success("Welcome Back!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate(location.state || "/");
      })
      .catch((error) => {
        toast.error(`${error}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });

    form.reset();
  };

  //login with google
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        // console.log(user);
        const newUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };
        navigate(location.state || "/");

        //save this user to database
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((afterPost) => afterPost.json())
          .then((afterPost) => {
            if (afterPost.insertedId) {
              toast.success("Welcome!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
            }
          });
      })
      .catch((error) => {
        toast.error(`${error}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center pt-32 my-10">
      <div className="w-1/3 px-4 py-8 bg-[#f6f6f6] shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center">
          Login to Your Account!
        </h1>
        <p className="text-center mt-2">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-blue-800 underline">
            Register Here
          </Link>
        </p>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col space-y-3 mt-4 px-4"
        >
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
            Login
          </button>
          <p className="text-center">Or</p>
          <button
            onClick={() => handleGoogleLogin()}
            className="btn bg-white shadow-md"
          >
            <FcGoogle className="text-xl" />
            Login with Google
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default Login;
