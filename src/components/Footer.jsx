import React from 'react'
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
    
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">FoodWebsite</h1>
          <p className="text-sm text-gray-400">Delicious Food at Your Doorstep</p>
        </div>


    
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="/" className="hover:text-blue-400 transition">
            <FaFacebookF size={22} />
          </Link>
          <Link to="#" className="hover:text-pink-500 transition">
            <FaInstagram size={22} />
          </Link>
          <Link to="#" className="hover:text-blue-300 transition">
            <FaTwitter size={22} />
          </Link>
        </div>
      </div>

      
      <div className="text-center text-gray-500 text-sm mt-4">
        &copy; {new Date().getFullYear()} FoodWebsite. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer
