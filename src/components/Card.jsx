import React, { useState, useEffect } from "react";
import { useCartDispatch } from "./ContextReducer";

export const Card = ({ foodName, options, imgsrc, desc }) => {
  const dispatch = useCartDispatch();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [price, setPrice] = useState(0);

  
  useEffect(() => {
    const defaultSize = Object.keys(options)[0]; 
    setSelectedSize(defaultSize);
    setPrice(options[defaultSize]);
  }, [options]);

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    setSelectedSize(newSize);
    setPrice(options[newSize]);
  };

  const handleAddToCart = () => {
    const item = {
      name: foodName,
      size: selectedSize,
      quantity: quantity,
      price: price,
      totalPrice: price * quantity,
      img: imgsrc,
      desc: desc,
    };
  
    console.log("🛒 Add to Cart Item:", item); 
  
    dispatch({
      type: "ADD",
      item: item,
    });
  };
  
let finalprice=quantity *parseInt(options[selectedSize]);
  return (
    <div className="flex flex-nowrap gap-2 p-4">
      <div className="bg-pink-100 text-white shadow-lg p-2 rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        <img
          className="w-72 h-44 object-cover rounded-2xl mx-auto"
          src={imgsrc}
          alt={foodName}
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">{foodName}</h2>
          <div className="text-gray-600 mt-2 h-24 text-[14px]">{desc}</div>

          <div className="flex justify-center">
            <select
              className="bg-white text-pink-600 border border-pink-500 hover:bg-pink-200 px-4 py-2 rounded-lg m-2"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {Array.from(Array(6), (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              className="bg-white text-pink-600 border border-pink-500 hover:bg-pink-200 px-4 py-2 rounded-lg"
              value={selectedSize}
              onChange={handleSizeChange}
            >
              {Object.keys(options).map((size, index) => (
                <option key={index} value={size}>
                  {size} - ₹{options[size]}
                </option>
              ))}
            </select>
          </div>

          <div className="text-black inline-block font-bold text-xl mt-2">
           ₹{finalprice}/-
          </div>
          <hr className="text-black my-2" />

          <div className="flex items-center justify-center">
            <button
              onClick={handleAddToCart}
              className="mt-2 bg-green-700 px-4 py-2 rounded-lg hover:bg-yellow-600 text-white font-bold"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
