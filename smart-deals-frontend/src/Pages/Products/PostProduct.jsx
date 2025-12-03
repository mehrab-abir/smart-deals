import React from 'react';

const PostProduct = () => {
    return (
      <div className="w-11/12 mx-auto pt-32 mb-20">
        <h1 className="text-5xl font-bold text-center">
          Post a <span className="text-blue-800">Product</span>
        </h1>
        <div className="mt-10 p-4 shadow-lg md:w-2/3 mx-auto bg-white rounded-md text-gray-700">
          <form className="space-y-3">
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
                />
              </div>

              <div className="justify-self-stretch">
                <label>Category:</label>
                <br />
                <select defaultValue="Select a category" className="select outline-none cursor-pointer w-full">
                  <option disabled={true}>Select a category</option>
                  <option>Electronics</option>
                  <option>Vehicle</option>
                  <option>Phone</option>
                  <option>PC</option>
                </select>
              </div>
              <div className="justify-self-stretch">
                <label>Minimum Price You Want To Sale ($):</label>
                <br />
                <input
                  type="text"
                  name="min_price"
                  className="outline-none input w-full"
                  placeholder="Minimum price"
                />
              </div>

              <div className="justify-self-stretch">
                <label>Maximum Price You Want To Sale ($):</label>
                <br />
                <input
                  type="text"
                  name="max_price"
                  className="outline-none input w-full"
                  placeholder="Maximum price"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              <div className="justify-self-stretch">
                <label>Product Condition:</label>
                <br />
                <input
                  type="radio"
                  name="radio-9"
                  className="radio radio-info"
                  defaultChecked
                />
                <span className="ml-3">Brand New</span>
                <input
                  type="radio"
                  name="radio-9"
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
              />
            </div>

            {/* seller info  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="justify-self-stretch">
                <label>Seller Name:</label>
                <br />
                <input
                  type="text"
                  name="seller-name"
                  className="outline-none input w-full"
                  placeholder="Your name..."
                  required
                />
              </div>

              <div className="justify-self-stretch">
                <label>Seller Email:</label>
                <br />
                <input
                  type="email"
                  name="seller_email"
                  className="outline-none input w-full"
                  placeholder="Your email"
                  required
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
                />
              </div>

              <div className="justify-self-stretch">
                <label>Seller photo url:</label>
                <br />
                <input
                  type="text"
                  name="seller_img"
                  className="outline-none input w-full"
                  placeholder="Your photo url"
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
              />
            </div>

            {/* product description  */}
            <div>
              <label>Simple Description of Your Product:</label>
              <br />
              <textarea
                type="text"
                name="description"
                className="input outline-none w-full"
                placeholder="Write something about your product..."
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