import React from "react";
import { Link, useLoaderData } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const ProductDetails = () => {
  const product = useLoaderData();
  const {
    title,
    price_min,
    price_max,
    email,
    category,
    created_at,
    image,
    status,
    location,
    seller_image,
    seller_name,
    condition,
    usage,
    description,
    seller_contact,
  } = product;

  return (
    <div className="w-11/12 mx-auto pt-28 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="row-span-1">
          <img src={image} alt={title} className="w-full object-cover" />
        </div>

        <div className="row-span-2 md:p-2 flex flex-col justify-center">
          <Link
            to="/products"
            className="hidden md:flex items-center gap-2 mb-2 bg-gray-200 rounded-md px-1 w-fit"
          >
            <FaArrowLeft />
            Back to Products
          </Link>
          <h1 className="text-4xl font-bold my-4 mt-0">{title}</h1>

          <div className="flex justify-between items-center">
            <p className="bg-blue-800 text-blue-100 px-2 rounded-md w-fit">
              {category.toUpperCase()}{" "}
            </p>
            <p className="bg-blue-600 font-semibold px-2 w-fit rounded-md text-white">
              {status.toUpperCase()}
            </p>
          </div>

          <div className="mt-4 bg-white text-black p-4 rounded-md">
            <p className="font-bold text-2xl text-green-500">{`$${price_min} - $${price_max}`}</p>
            <p>Price starts from</p>
          </div>

          <div className="bg-white text-black mt-4 p-4 rounded-md">
            <h4 className="text-lg">
              <span className="font-bold">Posted:</span> {created_at}
            </h4>
          </div>

          <div className="bg-white text-black p-4 mt-4 rounded-md">
            <h2 className="text-xl font-bold">Seller Information</h2>
            <div className="flex gap-4 items-center my-4">
              <img
                src={seller_image}
                alt={`seller image: ${seller_name}`}
                className="w-16 rounded-full"
              />
              <div>
                <p className="font-bold">{seller_name}</p>
                <p>
                  <span className="font-semibold">Email:</span> {email}
                </p>
              </div>
            </div>
            <div>
              <p>
                <span className="font-semibold">Location:</span> {location}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {seller_contact}
              </p>
            </div>
          </div>
          <Link
            to=""
            className="btn w-full h-fit py-2 text-white bg-blue-700 mt-4 hidden md:block hover:bg-blue-500"
          >
            Bid For This Product
          </Link>
          <button
            to=""
            className="btn w-full text-blue-600 border border-blue-600 bg-white mt-4 md:block"
          >
            Add To Wishlist
          </button>
        </div>

        <div className="row-span-1 px-4 py-3 bg-white">
          <h3 className="text-xl font-bold">Product Description</h3>
          <div className="flex justify-between border-b border-gray-300 py-2 mt-4">
            <p className="font-semibold ">
              <span className="text-cyan-600">Condition:</span> {condition}
            </p>
            <p className="font-semibold ">
              <span className="text-cyan-600">Usage:</span> {usage}
            </p>
          </div>
          <p className="text-gray-600 mt-3 text-sm">{description}</p>
          <Link
            to=""
            className="btn w-full text-white bg-blue-700 mt-4 md:hidden"
          >
            Bid For This Product
          </Link>
          <button
            to=""
            className="btn w-full text-blue-600 border border-blue-600 bg-white mt-4 md:hidden"
          >
            Add To Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
