import React from "react";
import { useCartDispatch } from "../components/ContextReducer";

const CartModal = ({ isOpen, onClose, cartItems }) => {
  const dispatch = useCartDispatch();

  console.log("Cart Items:", cartItems);
  
  const handleRemove = (index) => {      
    dispatch({ type: "REMOVE", index });
  };
  const handleCheckout = async () => {
    console.log("Checkout clicked!");
    let userEmail = localStorage.getItem("userEmail");
   console.log("Checkout payload:", {
    order_data: cartItems,
    email: userEmail,
    order_date: new Date().toDateString()
  });
    let response = await fetch("http://localhost:4000/api/orderData", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        
        order_data: cartItems,  
        email: userEmail,
        order_date: new Date().toDateString()

      })
    });
  
    if (response.status === 200) {
      dispatch({ type: 'DROP' });
      alert("Order placed successfully!");
    } else {
      const err = await response.json();
      alert("Order failed: " + err.message);
    }
  };
  
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[600px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-3 text-red-600 font-bold text-[40px] cursor-pointer"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Qty: {item.quantity}  
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-bold">
                      ₹{Number(item.price) * Number(item.quantity)}
                    </p>
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right">
              <p className="text-xl font-bold">Total: ₹{totalPrice}</p>
              <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
