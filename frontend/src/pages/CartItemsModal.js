// src/components/modals/CartItemsModal.js

import React, { useState, useEffect } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";

const CartItemsModal = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/cart/items", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch cart items.");
        }
      } catch (err) {
        setError("An error occurred while fetching cart items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("No authentication token found.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/cart/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setCartItems(cartItems.filter((item) => item.item_id !== itemId));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to remove item from cart.");
      }
    } catch (err) {
      setError("An error occurred while removing the item.");
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center">Loading your cart items...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.item_id}
              className="flex items-center justify-between border rounded-lg p-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`http://localhost:5000/${item.image_url.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="text-md font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-700">
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.item_id)}
                className="flex items-center justify-center px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItemsModal;
