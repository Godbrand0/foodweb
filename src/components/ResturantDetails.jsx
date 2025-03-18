import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import NavIcons from "../Reuse/NavIcons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import ProfileSection from "./ProfileSection";
import CheckoutSection from "./CheckoutSection";
import MobileNavigation from "./MobileNavigation";
import FoodDetails from "./FoodDetails";

const restaurantData = {
  "The Italian Place": [
    {
      id: 1,
      name: "Spaghetti Carbonara",
      price: 12.99,
      details:
        "Classic Roman pasta dish with al dente spaghetti tossed in a creamy sauce made from eggs, Parmesan, crispy pancetta, and a hint of black pepper. Served with a side of warm garlic bread and a fresh green salad.",
      image: "src/assets/spaghetti-carbonara.jpg",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      price: 10.99,
      details:
        "Authentic Neapolitan pizza topped with fresh tomato sauce, melted mozzarella, and fragrant basil leaves on a perfectly charred thin crust. A drizzle of extra virgin olive oil enhances every bite.",
      image: "src/assets/margherita-pizza.jpg",
    },
    {
      id: 3,
      name: "Lasagna",
      price: 14.99,
      details:
        "Layers of handmade pasta sheets filled with rich beef ragu, creamy béchamel sauce, and melted Parmesan, baked to perfection. Served with a side of fresh basil garnish.",
      image: "src/assets/lasagna.jpg",
    },
    {
      id: 4,
      name: "Risotto",
      price: 11.99,
      details:
        "Creamy Arborio rice slowly cooked in a flavorful broth with white wine, Parmesan, and a touch of butter. Finished with a choice of wild mushrooms or fresh seafood.",
      image: "src/assets/risotto.jpg",
    },
    {
      id: 5,
      name: "Tiramisu",
      price: 6.99,
      details:
        "Decadent layers of espresso-soaked ladyfingers, creamy mascarpone cheese, and a dusting of rich cocoa powder. A classic Italian dessert that melts in your mouth.",
      image: "src/assets/tiramisu.jpg",
    },
  ],
  "Sushi World": [
    {
      id: 6,
      name: "California Roll",
      price: 8.99,
      details:
        "A delightful sushi roll filled with fresh crab, creamy avocado, and crisp cucumber, wrapped in seasoned rice and seaweed, topped with sesame seeds.",
      image: "src/assets/california-roll.jpg",
    },
    {
      id: 7,
      name: "Salmon Sashimi",
      price: 13.99,
      details:
        "Premium-grade salmon, sliced to perfection, showcasing its rich, buttery texture and natural umami flavors. Served with wasabi and soy sauce.",
      image: "src/assets/salmon-sashimi.jpg",
    },
    {
      id: 8,
      name: "Tuna Nigiri",
      price: 10.99,
      details:
        "A beautifully handcrafted sushi piece featuring fresh tuna on a bed of seasoned rice, brushed with a touch of soy sauce for a delicate balance of flavors.",
      image: "src/assets/tuna-nigiri.jpg",
    },
    {
      id: 9,
      name: "Dragon Roll",
      price: 12.99,
      details:
        "A visually stunning roll with crispy tempura shrimp, creamy avocado, and a drizzle of eel sauce, topped with thinly sliced eel and sesame seeds.",
      image: "src/assets/dragon-roll.jpg",
    },
    {
      id: 10,
      name: "Miso Soup",
      price: 4.99,
      details:
        "A comforting bowl of traditional miso broth with silken tofu, seaweed, and scallions, perfect as a warm start to your sushi feast.",
      image: "src/assets/miso-soup.jpg",
    },
  ],
};

export default function ResturantDetails({ ResturantDetails }) {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const foods = restaurantData[decodedName] || [];
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [activeSection, setActiveSection] = useState(""); // Track active section

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  // Function to update the active section
  const handleSetActiveSection = (section) => {
    setActiveSection(section);
  };

  const handleAddToCart = (index, foodName, price) => {
    dispatch(
      addToCart({ id: `${decodedName}-${index}`, name: foodName, price })
    );
  };

  return (
    <div className="flex justify-center gap-16">
      <div className="restaurant-details w-[700px]">
        <h1 className="text-2xl font-bold mb-4">{decodedName}</h1>
        <ul>
          {foods.map((food, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-4 bg-gray-100 p-4 rounded-lg shadow cursor-pointer"
            >
              <span
                key={food.id}
                onClick={() => handleFoodClick(food)}
                className="w-2/3"
              >
                {food.name} - ${food.price.toFixed(2)}
              </span>
              <button
                className="bg-orange-500 py-2 px-4 rounded-xl text-white font-bold flex items-center hover:opacity-75 transition-opacity"
                onClick={() => handleAddToCart(index, food.name, food.price)}
              >
                <NavIcons icon={faCartShopping} />
              </button>
            </li>
          ))}
        </ul>
        {isModalOpen && (
          <FoodDetails
            food={selectedFood}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </div>
      {activeSection === "ProfileSection" && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
          <ProfileSection closeSection={() => setActiveSection("")} />
        </div>
      )}

      {activeSection === "CheckoutSection" && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50">
          <CheckoutSection closeSection={() => setActiveSection("")} />
        </div>
      )}
      <MobileNavigation setActiveSection={handleSetActiveSection} />
    </div>
  );
}
