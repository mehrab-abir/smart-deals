import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import MyProducts from "../Pages/Products/MyProducts";
import MyBids from "../Pages/Bids/MyBids";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ErrorPage from "../Components/ErrorPage";
import CustomLoader from "../Components/CustomLoader";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch("http://localhost:3000/products"),
        hydrateFallbackElement : <CustomLoader></CustomLoader>
      },
      {
        path: "products",
        Component: Products,
        loader: () => fetch("http://localhost:3000/products"),
        hydrateFallbackElement : <CustomLoader></CustomLoader>
      },
      {
        path: "myproducts",
        Component: MyProducts,
      },
      {
        path: "mybids",
        Component: MyBids,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);

export default router

