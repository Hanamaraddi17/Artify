import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const CartModal = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState("0.00");

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
          Accept: "*/*",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setCartItems(data.items);
      setTotalItems(data.totalItems);
      setTotalPrice(data.totalPrice);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Remove item from cart and refetch the updated data
  const handleRemoveCartItem = async (artworkId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5000/cart/remove/${artworkId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Fetch the updated cart items after removing an item
        fetchCartItems();
        alert("Item removed from cart successfully!");
      } else {
        alert("Failed to remove item from cart.");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    fetchCartItems(); // Fetch cart items on component mount and whenever cart changes
  }, []); // This ensures it runs once when the component is mounted

  const getFormattedImageUrl = (imageUrl) => {
    return imageUrl
      ? `http://localhost:5000/${imageUrl.replace(/\\/g, "/")}`
      : "/images/default.jpeg";
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-center mb-4">
       ({totalItems} Art Works)
      </h3>
      <div className="flex flex-col space-y-4 ">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.artwork_id}
              className="flex items-start border border-gray-300 rounded-lg p-3 bg-gray-100"
            >
              <img
                src={getFormattedImageUrl(item.image_url)}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-l-lg mr-4"
              />
              <div className="flex flex-col flex-1">
                <h3 className="text-md font-semibold">{item.title}</h3>
                <p className="text-lg font-bold">Price: ${item.price}</p>
                <p className="text-sm">Quantity: {item.quantity}</p>
              </div>
              <button
                aria-label="Remove from cart"
                onClick={() => handleRemoveCartItem(item.artwork_id)}
                className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full transition-all duration-300 hover:bg-red-600"
              >
                <Trash2 size={18} className="text-white hover:text-gray-200" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No items in your cart.</p>
        )}
      </div>
      <div className="text-right mt-4">
        <p className="text-lg font-bold">Total Price: ${totalPrice}</p>
      </div>
    </div>
  );
};

export default CartModal;
