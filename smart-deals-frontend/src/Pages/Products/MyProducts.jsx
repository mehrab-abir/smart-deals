import React, { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import CustomLoader from "../../Components/CustomLoader";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyProducts = () => {
  const { user, loading } = use(AuthContext);

  const [myProducts, setMyProducts] = useState([]);

  const [editProduct, setEditProduct] = useState(null);
  const editModalRef = useRef();

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
  }, [user, loading]);

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

  //delete a product from my products-it will delete the product from the productCellection as weel

  const deleteProduct = (id) => {
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
        fetch(`http://localhost:3000/products/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((afterDelete) => {
            if (afterDelete.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Product Deleted.",
                icon: "success",
              });
            }

            const remainingMyProducts = myProducts.filter(
              (myProduct) => myProduct._id !== id
            );
            setMyProducts(remainingMyProducts);
          });
      }
    });
  };

  //change status to "Sold" from "pending" by clicking on "Make sold" button
  const makeSold = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "Sold" }),
    })
      .then((res) => res.json())
      .then((afterUpdate) => {
        if (afterUpdate.modifiedCount) {
          Swal.fire({
            title: "Updated!",
            text: "Status changed to Sold",
            icon: "success",
          });
          setMyProducts((prev) =>
            prev.map((product) =>
              product._id === id ? { ...product, status: "Sold" } : product
            )
          );
        }
      })
      .catch((err) => console.log("Error updating: ", err));
  };

  //list a product again after it is marked sold
  const ListAgain = (id) => {
    fetch(`http://localhost:3000/products/${id}`,{
      method : 'PATCH',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify({status:"pending"})
    })
    .then(res=>res.json())
    .then(afterUpdate=>{
      if(afterUpdate.modifiedCount){
        Swal.fire({
            title: "Done!",
            text: "Product listed again",
            icon: "success",
          });
          setMyProducts(prev=>prev.map(product=>product._id === id ? {...product, status:"pending"}: product))
      }
    })
    .catch((err)=>alert(err))
  };

  //edit products information modal
  const openEditModal = (product) => {
    setEditProduct(product)
    editModalRef.current.showModal();
  };

  //post updated info
  const updateProduct = (e, id) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const price_min = form.price_min.value;
    const price_max = form.price_max.value;

    const updatedInfo = {
      title,
      price_min,
      price_max,
    };

    fetch(`http://localhost:3000/editproducts/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((res) => res.json())
      .then((afterUpdate) => {
        if (afterUpdate.modifiedCount) {
          Swal.fire({
            title: "Saved!",
            text: "Product Info Updated",
            icon: "success",
          });
          setMyProducts((prev) =>
            prev.map((product) =>
              product._id === id
                ? { ...product, title, price_min, price_max }
                : product
            )
          );
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...Error Updating product info",
          text: `<p>${err}</p>`,
        });
      })
      .finally(() => {
        editModalRef.current.close();
      });
  };

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

            <tbody className="relative">
              {myProducts.map((product, index) => {
                return (
                  <>
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={product.image}
                          alt="product image"
                          className="w-12 h-14 object-contain"
                        />
                      </td>

                      <td>
                        <Link
                          to={`/products/${product._id}`}
                          className="font-semibold md:text-lg hover:underline"
                        >
                          {product.title}
                        </Link>
                      </td>

                      <td className="md:text-lg">{product.category}</td>
                      <td className="md:text-lg">${product.price_max}</td>
                      <td>
                        <div
                          className={`badge badge-outline text-sm ${
                            product.status.toUpperCase() === "PENDING"
                              ? "badge-warning"
                              : "badge-success"
                          }`}
                        >
                          {product.status.toUpperCase()}
                        </div>
                      </td>

                      <td className="align-middle">
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => openEditModal(product)}
                            className="btn bg-white border-blue-500 text-blue-500 text-sm px-2 py-0 hover:bg-blue-500 hover:text-white cursor-pointer"
                            disabled={product.status.toLowerCase() === "sold"}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="btn bg-white border-red-500 text-red-500 text-sm px-2 py-0 hover:bg-red-500 hover:text-white cursor-pointer"
                          >
                            Delete
                          </button>

                          {product.status.toLowerCase() === "sold" ? (
                            <button
                              onClick={() => ListAgain(product._id)}
                              className="btn bg-white border-green-500 text-green-500 text-sm px-2 py-0 hover:bg-green-500 hover:text-white cursor-pointer"
                            >
                              List Again
                            </button>
                          ) : (
                            <button
                              onClick={() => makeSold(product._id)}
                              className="btn bg-white border-green-500 text-green-500 text-sm px-2 py-0 hover:bg-green-500 hover:text-white cursor-pointer"
                            >
                              Make Sold
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        )}
        {/* modal box to edit product info */}
        <dialog ref={editModalRef} className="modal" onClick={(e)=>{
          if(e.target === e.currentTarget){
            editModalRef.current.close();
          }
        }} onClose={()=>setEditProduct(null)}>
          <div className="modal-box">
            <h3 className="font-semibold text-blue-600 text-lg mb-5">
              Edit Product
            </h3>

            {editProduct && (
              <form
                onSubmit={(e) => updateProduct(e, editProduct._id)}
                className="flex flex-col space-y-2"
              >
                <div className="justify-self-stretch">
                  <label>Product Title:</label>
                  <br />
                  <input
                    type="text"
                    name="title"
                    className="outline-none input w-full"
                    defaultValue={editProduct.title}
                  />
                </div>

                <div className="justify-self-stretch">
                  <label>Minimum Price:</label>
                  <br />
                  <input
                    type="text"
                    name="price_min"
                    className="outline-none input w-full"
                    defaultValue={editProduct.price_min}
                  />
                </div>

                <div className="justify-self-stretch">
                  <label>Maximum Price:</label>
                  <br />
                  <input
                    type="text"
                    name="price_max"
                    className="outline-none input w-full"
                    defaultValue={editProduct.price_max}
                  />
                </div>

                <button
                  type="submit"
                  className="btn bg-blue-700 text-white hover:bg-blue-500"
                >
                  Save Changes
                </button>
              </form>
            )}
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyProducts;
