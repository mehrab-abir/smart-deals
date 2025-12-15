import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { useRef } from "react";
import { use } from "react";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { user, setLoading } = use(AuthContext);
  const navigate = useNavigate();

  const [productBids, setProductBids] = useState([]);

  const product = useLoaderData();
  const {
    _id,
    title,
    price_min,
    price_max,
    category,
    created_at,
    image,
    status,
    location,
    seller_image,
    seller_name,
    email,
    condition,
    usage,
    description,
    seller_contact,
  } = product;

  const bidModalRef = useRef();

  //open bid modal box
  const openBidModal = () => {
    if (!user) {
      navigate("/auth/login", {replace:true});
    }
    if(!user.emailVerified){
      return navigate('/emailverification', {replace: true})
    }
    bidModalRef.current.showModal();
  };

  const submitBid = (e) => {
    e.preventDefault();
    const form = e.target;

    const bidder_name = form.bidder_name.value;
    const bidder_email = form.bidder_email.value;
    const bidder_img = form.bidder_img.value;
    const bid_price = form.bid_price.value;
    const bidder_phone = form.bidder_contact.value;

    // console.log({bidder_name,bidder_email,photo_URL,bid_price,bidder_phone});

    const newBid = {
      productId: _id,
      bidder_name,
      bidder_email,
      bidder_img,
      bid_price,
      bidder_phone,
      created_at: new Date(),
    };

    // console.log(newBid);

    //post this bid
    setLoading(true);
    fetch("https://smart-deals-backend-three.vercel.app/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((afterPost) => {
        if (afterPost.insertedId) {
          Swal.fire({
            title: "Your bid has been submitted",
            icon: "success",
          });
          const postedBid = {
            _id : afterPost.insertedId, ...newBid
          }
          setProductBids(prev => [...prev,postedBid])
        }
      })
      .finally(() => {
        setLoading(false);
        bidModalRef.current.close();
      });
  };

  //all bids of the current product
  useEffect(()=>{
    fetch(`https://smart-deals-backend-three.vercel.app/bids/${_id}`)
    .then(res=>res.json())
    .then(data=>setProductBids(data))
    .catch(err=>console.log(err));
  },[_id])

  const noBidsMsg = (
    <h1 className="text-red-400 text-center text-xl font-semibold mt-10">
      -No bid(s) for this product yet-
    </h1>
  );

  return (
    <div className="w-11/12 mx-auto pt-28 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="row-span-1">
          <img src={image} alt={title} className="w-full object-cover" />
        </div>

        <div className="row-span-2 md:p-2 flex flex-col justify-center">
          <Link
            to="/products"
            className="hidden md:flex items-center gap-2 mb-2 bg-surface rounded-md px-1 w-fit"
          >
            <FaArrowLeft />
            Back to Products
          </Link>
          <h1 className="text-4xl text-accent font-bold my-4 mt-0">{title}</h1>

          <div className="flex justify-between items-center">
            <p className="bg-secondary text-white px-2 rounded-md w-fit">
              {category.toUpperCase()}{" "}
            </p>
            <p
              className={`${
                status.toLowerCase() === "sold" ? `bg-green-600` : `bg-pending`
              } font-semibold px-2 w-fit rounded-md text-white`}
            >
              {status.toUpperCase()}
            </p>
          </div>

          <div className="mt-4 bg-surface text-primary p-4 rounded-md">
            <p className="font-bold text-2xl text-green-500">{`$${price_min} - $${price_max}`}</p>
            <p className="text-accent">Price starts from</p>
          </div>

          <div className="bg-surface text-base mt-4 p-4 rounded-md">
            <h4 className="text-lg">
              <span className="font-bold">Posted:</span>{" "}
              {new Date(created_at).toLocaleString()}
            </h4>
          </div>

          <div className="bg-surface text-base p-4 mt-4 rounded-md">
            <h2 className="text-xl font-bold">Seller Information</h2>
            <div className="flex gap-4 items-center my-4">
              <img
                src={seller_image}
                alt={`seller image: ${seller_name}`}
                className="w-16 rounded-full"
              />
              <div className="text-base">
                <p className="font-bold">{seller_name}</p>
                <p>
                  <span className="font-semibold">Email:</span> {email}
                </p>
              </div>
            </div>
            <div className="text-base">
              <p>
                <span className="font-semibold">Location:</span> {location}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {seller_contact}
              </p>
            </div>
          </div>

          {/* large device  */}
          <button
            onClick={() => openBidModal()}
            className={`btn w-full h-fit py-2 text-accent ${
              status.toLowerCase() === "sold" ? "bg-accent" : "bg-surface"
            } mt-4 hidden md:block hover:bg-cyan-800! hover:text-white! border-blue-500`}
            disabled={status.toLowerCase() === "sold"}
          >
            Bid For This Product
          </button>
          <button
            to=""
            className="btn w-full text-white border border-blue-500 bg-secondary mt-4 hidden md:block hover:bg-cyan-800!"
          >
            Add To Wishlist
          </button>
        </div>

        <div className="row-span-1 px-4 py-3 bg-surface">
          <h3 className="text-xl font-bold">Product Description</h3>
          <div className="flex justify-between border-b border-gray-300 py-2 mt-4">
            <p className="font-semibold ">
              <span className="text-accent">Condition:</span> {condition}
            </p>
            <p className="font-semibold ">
              <span className="text-accent">Usage:</span> {usage}
            </p>
          </div>
          <p className="text-muted mt-3 text-sm">{description}</p>

          {/* in small device  */}
          <button
            onClick={() => openBidModal()}
            className={`btn border-blue-500 w-full text-accent ${
              status.toLowerCase() === "sold" ? "bg-accent" : "bg-surface"
            }  mt-4 md:hidden`}
            disabled={status.toLowerCase() === "sold"}
          >
            Bid For This Product
          </button>
          <button
            to=""
            className="btn w-full text-white border border-blue-600 bg-secondary mt-4 md:hidden"
          >
            Add To Wishlist
          </button>
        </div>

        {/* bid modal box */}
        <dialog ref={bidModalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-2xl mb-5">Offer a Price</h3>

            {/* form to provide bid info */}
            <form onSubmit={(e) => submitBid(e)}>
              <div className="grid grid-cols-1 space-y-2.5">
                <div className="justify-self-stretch">
                  <label>Bidder Name:</label>
                  <br />
                  <input
                    type="text"
                    name="bidder_name"
                    className="outline-none input w-full"
                    readOnly
                    defaultValue={user?.displayName}
                  />
                </div>

                <div className="justify-self-stretch">
                  <label>Bidder Email:</label>
                  <br />
                  <input
                    type="email"
                    name="bidder_email"
                    className="outline-none input w-full"
                    readOnly
                    defaultValue={user?.email}
                  />
                </div>
                <div className="justify-self-stretch">
                  <label>Bidder image url:</label>
                  <br />
                  <input
                    type="text"
                    name="bidder_img"
                    className="outline-none input w-full"
                    readOnly
                    defaultValue={user?.photoURL}
                  />
                </div>

                <div className="justify-self-stretch">
                  <label>Place Your Price:</label>
                  <br />
                  <input
                    type="text"
                    name="bid_price"
                    className="outline-none input w-full"
                    placeholder="Bid Price"
                    required
                  />
                </div>

                <div className="justify-self-stretch">
                  <label>Contact Info:</label>
                  <br />
                  <input
                    type="text"
                    name="bidder_contact"
                    className="outline-none input w-full"
                    placeholder="+1 647-253..."
                    required
                  />
                </div>

                {/* bid submit btn */}
                <button type="submit" className="btn bg-cyan-900 text-white">
                  Submit Your Bid
                </button>
              </div>
            </form>
            <div className="modal-action flex items-center justify-center">
              <form method="dialog" className="w-full">
                <button className="btn w-full bg-gray-600 text-white">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {/* bids of this product  */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold">
          Bids of This Product ({productBids.length})
        </h1>

        <div className="overflow-scroll mt-10 bg-surface text-base min-h-[50vh]">
          {productBids.length === 0 ? (
            noBidsMsg
          ) : (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SI No.</th>
                  <th>Bidder Name</th>
                  <th>Bid Price</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {productBids.map((bid, index) => {
                  return (
                    <tr key={bid._id}>
                      <td>{index + 1}</td>

                      <td>
                        <p className="md:text-lg">{bid.bidder_name}</p>
                      </td>

                      <td className="md:text-lg">{bid.bid_price}</td>
                      {/* <td>
                        <div
                          className={`badge badge-outline ${
                            bid.product.status.toUpperCase() === "PENDING"
                              ? "badge-warning"
                              : "badge-success"
                          }`}
                        >
                          {bid.product.status.toUpperCase()}
                        </div>
                      </td> */}
                      <td className="md:text-lg">
                        {new Date(bid.created_at).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
