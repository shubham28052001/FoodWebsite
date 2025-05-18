import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/myorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      const data = await response.json();
      console.log("🛒 Orders fetched from API:", data);

      if (data.success) {
        setOrders(data.orders);
        console.log("🛒 Orders set in state:", data.orders);
      } else {
        console.error("❌ Failed to load orders");
      }
    } catch (error) {
      console.error("🔥 Error fetching orders:", error.message);
    }
  };

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => {
              console.log(`🛍️ Rendering order #${index}:`, order);
              return (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md border"
                >
                  <p className="text-sm text-gray-500 mb-2">
                    Order Date: {order.order_date}
                  </p>
                  <ul className="divide-y">
                    {order.order_data.map((item, i) => {
                      console.log(`📦 Rendering item #${i} in order #${index}:`, item);
                      return (
                        <li key={i} className="py-2 flex items-center space-x-4">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              {item.size} × {item.quantity}
                            </p>
                            <p className="text-sm font-medium text-green-700">
                              ₹{item.totalPrice}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default MyOrders;
