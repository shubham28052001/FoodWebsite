import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Card } from "../components/card";
import { Carousel } from "../components/Sliders";
import CartModal from "../modals/Cartmodal";
import { useCartState } from "../components/ContextReducer";

const Home = () => {
  const [foodcat, setFoodcat] = useState([]);
  const [fooditem, setFooditem] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // Cart modal state
  const cartItems = useCartState();

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/fooddata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("❌ API Request Failed");

      const data = await response.json();
      if (Array.isArray(data) && data.length >= 2) {
        setFooditem(data[0]);
        setFoodcat(data[1]);
      } else {
        console.error("❌ Unexpected API response format:", data);
      }
    } catch (error) {
      console.error("🔥 Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <NavBar onCartClick={() => setIsCartOpen(true)} />
      <Carousel />

      <div>
        {foodcat.length > 0 ? (
          foodcat.map((item) => (
            <div className="mb-6" key={item._id}>
              <div className="text-xl font-semibold">{item.CategoryName}</div>
              <hr className="mb-4" />
              {fooditem.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {fooditem
                    .filter((data) => data.CategoryName === item.CategoryName)
                    .map((filteredItem) => (
                      <div key={filteredItem._id} className="w-[350px]">
                        <Card
                          foodName={filteredItem.name}
                          options={filteredItem.options}
                          imgsrc={filteredItem.img}
                          desc={filteredItem.description}
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-gray-500">No such data</div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-lg font-semibold">⏳ Loading...</div>
        )}
      </div>

      <Footer />

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />
    </div>
  );
};

export default Home;
