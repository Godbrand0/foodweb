import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  faMinus,
  faPlus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import NavIcons from "../Reuse/NavIcons";
import CheckOut from "../components/CheckoutSection";

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
  const [cart, setCart] = useState([]);

  const handleAddToCart = (index, foodName, price) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.index === index);

      if (existingItem) {
        return prevCart.map((item) =>
          item.index === index
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.totalPrice + price,
              }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            index,
            name: foodName,
            price,
            quantity: 1,
            totalPrice: price,
          },
        ];
      }
    });
  };

  return (
    <div className="restaurant-details">
      <h1>{decodedName}</h1>
      <ul>
        {foods.map((food, index) => (
          <li key={index}>
            {food.name} - ${food.price.toFixed(2)}
            <span>
              <div
                className="bg-orange-500 py-3 px-14 rounded-xl text-center cursor-pointer hover:opacity-45 duration-150"
                id="add-to-cart"
                onClick={() => handleAddToCart(index, food.name, food.price)}
              >
                <i className="">
                  <NavIcons icon={faCartShopping} />
                </i>
                <span class="font-bold px-3">Add to cart</span>
              </div>
            </span>
          </li>
        ))}
      </ul>
      <CheckOut cart={cart} />
    </div>
  );
}
