import React from "react";
import { useLoaderData } from "react-router";
import SingleProduct from "./SingleProduct";

const Products = () => {
  const products = useLoaderData();
  return (
    <div className="w-11/12 mx-auto my-10 py-24">
      <div className="w-11/12 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">
          All <span className="text-blue-800">Products</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => {
          return (
            <SingleProduct key={product._id} product={product}></SingleProduct>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
