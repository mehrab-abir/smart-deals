import React from "react";
import { use } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import Swal from "sweetalert2";
import CustomLoader from "../../Components/CustomLoader";
import { Link } from "react-router";

const MyBids = () => {
  const { user,loading } = use(AuthContext);

  const [bids, setBids] = useState([]);

  // console.log(user);

  useEffect(() => {
    if (loading) return;

    const loadBids = async () => {
      try {
        const token = await user.getIdToken(); 

        const res = await fetch(
          `https://smart-deals-backend-three.vercel.app/mybids?email=${user.email}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(token);

        if (!res.ok) {
          console.error("Failed to fetch bids:", res.status);
          return;
        }

        const data = await res.json();
        setBids(data);
      } catch (err) {
        console.error("Error loading bids:", err);
      }
    };

    loadBids();
  }, [user,loading]);

  if (loading) {
    return <CustomLoader></CustomLoader>;
  }


 /*  useEffect(() => {
    fetch(`https://smart-deals-backend-three.vercel.app/mybids?email=${user?.email}`,{
      headers : {
        authorization : `Bearer ${user.accessToken}`
      }
    })
      .then((res) => res.json())
      .then((data) => setBids(data));
  }, [user]); */

  // console.log(bids);

  const deleteBid = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://smart-deals-backend-three.vercel.app/mybids/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((afterDelete) => {
            if (afterDelete.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Bid Deleted.",
                icon: "success",
              });
            }

            const remainingBids = bids.filter((bid) => bid._id !== id);
            setBids(remainingBids);
          });
      }
    });
  };

  //sort bids based on bid_price
  const sortBids = (sortType) => {
    if (sortType === "asc") {
      const sorted = [...bids].sort((a, b) => a.bid_price - b.bid_price);
      setBids(sorted);
    } else {
      const sorted = [...bids].sort((a, b) => b.bid_price - a.bid_price);
      setBids(sorted);
    }
  };

  const noBidsMsg = (
    <h1 className="text-red-400 text-center text-xl font-semibold mt-10">
        Bid(s) will appear here after you place bid for any product-
    </h1>
  );

  return (
    <div className="w-11/12 mx-auto pt-28 mb-10">
      <h1 className="text-4xl font-bold text-center">
        My Bids: <span className="text-navy-mild">({bids.length})</span>
      </h1>

      <div className="flex items-center justify-center mt-6">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1 bg-primary text-accent border-blue-500">
            Sort By Bid Price
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li onClick={() => sortBids("desc")}>
              <a>High -&gt; Low</a>
            </li>
            <li onClick={() => sortBids("asc")}>
              <a>Low -&gt; High</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="overflow-scroll mt-10 bg-surface min-h-[50vh]">
        {bids.length === 0 ? (
          noBidsMsg
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SI No.</th>
                <th>Product</th>
                <th>Seller</th>
                <th>Bid Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bids.map((bid, index) => {
                return (
                  <tr key={bid._id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link
                        to={`/products/${bid.product._id}`}
                        className="flex items-center gap-3"
                      >
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={bid.product.image} alt="product image" />
                          </div>
                        </div>
                        <div>
                          <p className="font-bold">{bid.product.title}</p>
                          <div className="text-sm opacity-50">
                            {bid.product.location}
                          </div>
                        </div>
                      </Link>
                    </td>

                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            {/* seller img  */}
                            <img
                              src={bid.product.seller_image}
                              alt="Seller image"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {bid.product.seller_name}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>{bid.bid_price}</td>
                    <td>
                      <div
                        className={`badge badge-outline ${
                          bid.product.status.toUpperCase() === "PENDING"
                            ? "badge-warning"
                            : "badge-success"
                        }`}
                      >
                        {bid.product.status.toUpperCase()}
                      </div>
                    </td>

                    <td>
                      <button
                        onClick={() => deleteBid(bid._id)}
                        className="btn border-red-500 text-sm px-2 py-0 cursor-pointer"
                      >
                        Delete
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

export default MyBids;
