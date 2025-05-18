import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartState } from "./ContextReducer";

const NavBar = ({ onCartClick }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const cartItems = useCartState();
  const cartItemCount = cartItems.length;

  const handleSearchChange = (e) => setQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  const handledLogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-blue-700 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          
          <Link to="/" className="text-white text-2xl font-bold">
            FoodWebsite
          </Link>

      
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full max-w-xs md:max-w-lg"
          >
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="px-4 py-2 w-full rounded text-white font-bold border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 m-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              Search
            </button>
          </form>

         
          <ul className="md:flex space-x-6 text-white text-xl justify-center items-center">
            <li>
              <Link to="/" className="hover:text-gray-200 cursor-pointer">
                Home
              </Link>
            </li>
            {localStorage.getItem("authtoken") && (
              <li>
                <Link to="/myOrder" className="hover:text-gray-200 cursor-pointer">
                  MyOrders
                </Link>
              </li>
            )}

            {!localStorage.getItem("authtoken") ? (
              <div className="flex justify-center gap-4">
                <Link
                  to="/login"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-6">
                <button
                  onClick={onCartClick}
                  className="relative bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-400 cursor-pointer"
                >
                  MyCart
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                <div
                  className="bg-white text-red-500 py-2 px-4 rounded-lg hover:bg-red-700 hover:text-white cursor-pointer"
                  onClick={handledLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
