// src/components/modals/OrderHistoryModal.js

import React, { useState, useEffect } from "react";
import { Clock, CheckCircle } from "lucide-react";

const OrderHistoryModal = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://artifybackend.vercel.app/orders/history", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch order history.");
        }
      } catch (err) {
        setError("An error occurred while fetching order history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) {
    return <p className="text-center">Loading your order history...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      {orders.length === 0 ? (
        <p className="text-center">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.order_id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-md font-semibold">
                  Order #{order.order_id}
                </h4>
                <div className="flex items-center space-x-1">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-sm text-green-500">Completed</span>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                Date: {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700">
                Total: ₹{order.total.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryModal;
