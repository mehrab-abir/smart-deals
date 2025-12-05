import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/Authentication/AuthContext';
import CustomLoader from '../../Components/CustomLoader';

const MyProducts = () => {
  const { user,loading} = use(AuthContext);
  const [myProducts, setMyProducts] = useState([]);

  // console.log("In my products page: ", user);

  useEffect(() => {
    if (loading) return;

    const loadProducts = async () => {
      try {
        const token = await user.getIdToken();

        const res = await fetch(
          `http://localhost:3000/myproducts?email=${user.email}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setMyProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };

    loadProducts();
  }, [user,loading]);

  if (loading) {
    return <CustomLoader></CustomLoader>;
  }


  /* useEffect(() => {
    fetch(`http://localhost:3000/myproducts?email=${user?.email}`,{
      headers : {
        authorization: `Bearer ${user?.accessToken}`
      }
    })
      .then((res) => res.json())
      .then((data) => setMyProducts(data))
      .catch((error) => alert(error))
  }, [user]); */

  //sort bids based on bid_price
  const sortProducts = (sortType) => {
    if (sortType === "asc") {
      const sorted = [...myProducts].sort((a, b) => a.price_max - b.price_max);
      setMyProducts(sorted);
    } else {
      const sorted = [...myProducts].sort((a, b) => b.price_max - a.price_max);
      setMyProducts(sorted);
    }
  };

  const noProduct = (
    <h1 className="text-red-400 text-center text-xl font-semibold mt-10">
      Product(s) will appear here after you post any product-
    </h1>
  );

  return (
    <div className="w-11/12 mx-auto mb-10 pt-28">
      <h1 className="text-4xl font-bold text-center">
        My Product(s): ({myProducts.length}){" "}
      </h1>

      <div className="flex items-center justify-center mt-6">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1 bg-white">
            Sort By Bid Price
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li onClick={() => sortProducts("desc")}>
              <a>High -&gt; Low</a>
            </li>
            <li onClick={() => sortProducts("asc")}>
              <a>Low -&gt; High</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="overflow-scroll mt-10 bg-white min-h-[50vh]">
        {myProducts.length === 0 ? (
          noProduct
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SI No.</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {myProducts.map((product, index) => {
                return (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={product.image}
                        alt="product image"
                        className="w-12"
                      />
                    </td>

                    <td>
                      <p className="font-semibold text-lg">{product.title}</p>
                    </td>

                    <td className="text-lg">{product.category}</td>
                    <td className="text-lg">${product.price_max}</td>
                    <td>
                      <div
                        className={`badge badge-outline ${
                          product.status.toUpperCase() === "PENDING"
                            ? "badge-warning"
                            : "badge-success"
                        }`}
                      >
                        {product.status.toUpperCase()}
                      </div>
                    </td>

                    <td className="flex gap-2">
                      <button className="btn bg-white border-blue-500 text-blue-500 text-sm px-2 py-0 hover:bg-blue-500 hover:text-white cursor-pointer">
                        Edit
                      </button>
                      <button className="btn bg-white border-red-500 text-red-500 text-sm px-2 py-0 hover:bg-red-500 hover:text-white cursor-pointer">
                        Delete
                      </button>
                      <button className="btn bg-white border-green-500 text-green-500 text-sm px-2 py-0 hover:bg-green-500 hover:text-white cursor-pointer">
                        Make Sold
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyProducts;