import Header from "../Components/Header";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const RootLayout = () => {
  return (
    <div className="bg-[#f6f6f6]">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
