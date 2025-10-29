// src/pages/AllProducts.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/products?populate=*")
      .then((res) => setProducts(res.data.data || []))
      .catch((err) => console.error("Error fetching all products:", err));
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">All Products</h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => {
              const imageUrl = product.attributes?.image?.data?.attributes?.url;
              return (
                <div
                  key={product.id}
                  className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition p-5 text-center"
                >
                  {imageUrl && (
                    <img
                      src={`http://localhost:1337${imageUrl}`}
                      alt={product.attributes?.name}
                      className="w-full h-56 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2">
                    {product.attributes?.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {product.attributes?.description}
                  </p>
                  {product.attributes?.price && (
                    <p className="text-lg font-bold text-blue-700">
                      ₱{product.attributes?.price}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products available yet.</p>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
