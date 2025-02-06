import React from "react";
import { useParams } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import NavIcons from "../Reuse/NavIcons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import ProfileSection from "./ProfileSection";
import CheckoutSection from "./CheckoutSection";

const restaurantData = {
  "The Italian Place": [
    { name: "Spaghetti Carbonara", price: 12.99 },
    { name: "Margherita Pizza", price: 10.99 },
    { name: "Lasagna", price: 14.99 },
    { name: "Risotto", price: 11.99 },
    { name: "Tiramisu", price: 6.99 },
  ],
  "Sushi World": [
    { name: "California Roll", price: 8.99 },
    { name: "Salmon Sashimi", price: 13.99 },
    { name: "Tuna Nigiri", price: 10.99 },
    { name: "Dragon Roll", price: 12.99 },
    { name: "Miso Soup", price: 4.99 },
  ],
  "BBQ Heaven": [
    { name: "BBQ Ribs", price: 15.99 },
    { name: "Pulled Pork Sandwich", price: 9.99 },
    { name: "Smoked Brisket", price: 18.99 },
    { name: "Grilled Sausage", price: 7.99 },
    { name: "Cornbread", price: 3.99 },
  ],
  "Vegan Delights": [
    { name: "Vegan Burger", price: 9.99 },
    { name: "Quinoa Salad", price: 7.99 },
    { name: "Stuffed Bell Peppers", price: 11.99 },
    { name: "Vegan Brownie", price: 5.99 },
    { name: "Avocado Toast", price: 6.99 },
  ],
  "Mexican Fiesta": [
    { name: "Tacos", price: 3.99 },
    { name: "Burrito", price: 7.99 },
    { name: "Quesadilla", price: 5.99 },
    { name: "Churros", price: 4.99 },
    { name: "Guacamole & Chips", price: 6.99 },
  ],
};

export default function ResturantDetails() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const foods = restaurantData[decodedName] || [];

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const handleAddToCart = (index, foodName, price) => {
    dispatch(
      addToCart({ id: `${decodedName}-${index}`, name: foodName, price })
    );
  };

  return (
    <div className="flex justify-center gap-16">
      <div>
        <ProfileSection />
        <CheckoutSection />
      </div>
      <div className="restaurant-details w-[700px]">
        <h1 className="text-2xl font-bold mb-4">{decodedName}</h1>
        <ul>
          {foods.map((food, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-4 bg-gray-100 p-4 rounded-lg shadow"
            >
              <span>
                {food.name} - ${food.price.toFixed(2)}
              </span>
              <button
                className="bg-orange-500 py-2 px-4 rounded-xl text-white font-bold flex items-center hover:opacity-75 transition-opacity"
                onClick={() => handleAddToCart(index, food.name, food.price)}
              >
                <NavIcons icon={faCartShopping} />
                <span className="ml-2">Add to cart</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
