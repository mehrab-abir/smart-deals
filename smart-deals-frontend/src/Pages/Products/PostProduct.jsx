import React, { use } from 'react';
import { AuthContext } from "../../Context/Authentication/AuthContext";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const PostProduct = () => {

  const {user} = use(AuthContext);

  const navigate = useNavigate();

  const productSubmission = (e) =>{
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const price_min = form.price_min.value;
    const price_max = form.price_max.value;
    const email = form.email.value;
    const category = form.category.value;
    const image = form.imageURL.value;
    const location = form.location.value;
    const seller_name = form.seller_name.value;
    const seller_image = form.seller_image.value;
    const seller_contact = form.seller_contact.value;
    const condition = form.condition.value;
    const usage = form.usage.value;
    const description = form.description.value;

    console.log({title,price_min,price_max,email, category,image,location,seller_name,seller_image,seller_contact,condition,usage,description});

    const newProduct = {
      title,
      price_min,
      price_max,
      email,
      category,
      image,
      location,
      seller_name,
      seller_image,
      seller_contact,
      condition,
      usage,
      description,
      status : "pending",
      created_at : new Date()
    };

    fetch(`http://localhost:3000/products`, {
      method : "POST",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(newProduct)
    })
      .then((res) => res.json())
      .then((afterPost) => {
        if (afterPost.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product Posted",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          navigate('/products')
        }
      });

  }

    return (
      <div className="w-11/12 mx-auto pt-32 mb-20">
        <h1 className="text-5xl font-bold text-center">
          Post a <span className="text-blue-800">Product</span>
        </h1>
        <div className="mt-10 p-4 shadow-lg md:w-2/3 mx-auto bg-white rounded-md text-gray-700">
          <form onSubmit={(e) => productSubmission(e)} className="space-y-3">
            {/* product info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="justify-self-stretch">
                <label>Title:</label>
                <br />
                <input
                  type="text"
                  name="title"
                  className="outline-none input w-full"
                  placeholder="Product title..."
                  required
                />
              </div>

              <div className="justify-self-stretch">
                <label>Category:</label>
                <br />
                <select
                  name="category"
                  defaultValue="Select a category"
                  className="select outline-none cursor-pointer w-full"
                  required
                >
                  <option disabled={true} value="Select a category">
                    Select a category
                  </option>
                  <option>Electronics</option>
                  <option>Vehicle</option>
                  <option>Phone</option>
                  <option>PC</option>
                  <option>Furniture</option>
                  <option>Fashion</option>
                  <option>Others</option>
                </select>
              </div>
              <div className="justify-self-stretch">
                <label>Minimum Price You Want To Sale ($):</label>
                <br />
                <input
                  type="text"
                  name="price_min"
                  className="outline-none input w-full"
                  placeholder="Minimum price"
                  required
                />
              </div>

              <div className="justify-self-stretch">
                <label>Maximum Price You Want To Sale ($):</label>
                <br />
                <input
                  type="text"
                  name="price_max"
                  className="outline-none input w-full"
                  placeholder="Maximum price"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              <div className="justify-self-stretch">
                <label>Product Condition:</label>
                <br />
                <input
                  type="radio"
                  name="condition"
                  value="Brand New"
                  className="radio radio-info"
                  defaultChecked
                />
                <span className="ml-3">Brand New</span>
                <input
                  type="radio"
                  name="condition"
                  value="Used"
                  className="radio radio-info ml-20"
                />
                <span className="ml-3">Used</span>
              </div>

              <div className="justify-self-stretch">
                <label>Product Usage Time</label>
                <br />
                <input
                  type="text"
                  className="input outline-none w-full"
                  name="usage"
                  placeholder="e.g. 1 year 2 months"
                  required
                />
              </div>
            </div>

            {/* image url  */}
            <div>
              <label>Product Image URL:</label>
              <br />
              <input
                type="text"
                name="imageURL"
                className="input outline-none w-full"
                placeholder="https://www.example.com/photo.jpg"
                required
              />
            </div>

            {/* seller info  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="justify-self-stretch">
                <label>Seller Name:</label>
                <br />
                <input
                  type="text"
                  name="seller_name"
                  className="outline-none input w-full"
                  value={user.displayName}
                  readOnly
                />
              </div>

              <div className="justify-self-stretch">
                <label>Seller Email:</label>
                <br />
                <input
                  type="email"
                  name="email"
                  className="outline-none input w-full"
                  value={user.email}
                  readOnly
                />
              </div>
              <div className="justify-self-stretch">
                <label>Seller Phone:</label>
                <br />
                <input
                  type="text"
                  name="seller_contact"
                  className="outline-none input w-full"
                  placeholder="Your phone no."
                  required
                />
              </div>

              <div className="justify-self-stretch">
                <label>Seller photo url:</label>
                <br />
                <input
                  type="text"
                  name="seller_image"
                  className="outline-none input w-full"
                  value={user.photoURL}
                  readOnly
                />
              </div>
            </div>

            {/* location */}
            <div>
              <label>Location:</label>
              <br />
              <input
                type="text"
                name="location"
                className="input outline-none w-full"
                placeholder="City, Country etc."
                required
              />
            </div>

            {/* product description  */}
            <div className='whitespace-pre-wrap'>
              <label>Simple Description of Your Product:</label>
              <br />
              <textarea
                type="text"
                name="description"
                className="w-full outline-none p-2 border rounded resize-y whitespace-pre-wrap wrap-break-word"
                placeholder="Write something about your product..."
                required
              />
            </div>

            <button type="submit" className="btn bg-blue-900 text-white w-full">
              Post
            </button>
          </form>
        </div>
      </div>
    );
};

export default PostProduct;