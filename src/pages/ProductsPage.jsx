// src/pages/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/products?populate=*")
      .then((res) => setProducts(res.data.data || []))
      .catch((err) => console.error("Error fetching all products:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-500">
        Loading products...
      </div>
    );

  return (
    <section className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800">
          All Products
        </h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => {
              const imageUrl =
                product.attributes?.image?.data?.attributes?.url;
              return (
                <div
                  key={product.id}
                  className="bg-gray-100 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  {imageUrl && (
                    <img
                      src={`http://localhost:1337${imageUrl}`}
                      alt={product.attributes?.name}
                      className="w-full h-56 object-cover"
                    />
                  )}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {product.attributes?.name}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {product.attributes?.description}
                    </p>
                    {product.attributes?.price && (
                      <p className="text-blue-700 font-semibold text-lg">
                        ₱{product.attributes?.price.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}
