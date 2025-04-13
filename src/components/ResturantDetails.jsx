import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import NavIcons from "../Reuse/NavIcons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

import MobileNavigation from "./MobileNavigation";
import FoodDetails from "./FoodDetails";
import { toast } from "react-toastify";

const restaurantData = {
  "The Italian Place": [
    {
      id: 1,
      name: "Spaghetti Carbonara",
      price: 12.99,
      details:
        "Spaghetti with bacon and eggs, served with garlic bread and a green salad, accompanied by freshly squeezed orange juice.",
      image: "https://i.postimg.cc/bdwFzrmR/spaghetti-carbonara-1200.jpg",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      price: 10.99,
      details:
        "Classic Margherita pizza with fresh tomatoes, mozzarella, basil, and a crispy crust.",
      image: "https://i.postimg.cc/rzf3WxDb/margherita-pizza.jpg",
    },
    {
      id: 3,
      name: "Lasagna",
      price: 14.99,
      details:
        "Layered pasta with rich meat sauce, ricotta cheese, and a golden cheesy topping.",
      image:
        "https://i.postimg.cc/ppy7Br8d/Most-Amazing-Lasagna-Square-2-1200x752.jpg",
    },
    {
      id: 4,
      name: "Risotto",
      price: 11.99,
      details: "Creamy Italian rice dish with mushrooms and parmesan cheese.",
      image: "https://i.postimg.cc/2b2cQNSv/seafood-risotto.jpg",
    },
    {
      id: 5,
      name: "Tiramisu",
      price: 6.99,
      details:
        "Classic Italian dessert with layers of mascarpone cheese, espresso-soaked ladyfingers, and cocoa powder.",
      image: "https://i.postimg.cc/LJLxy1sm/tiramisu-4583.jpg",
    },
  ],
  "Sushi World": [
    {
      id: 6,
      name: "California Roll",
      price: 8.99,
      details: "Sushi roll with crab, avocado, cucumber, and sesame seeds.",
      image:
        "https://i.postimg.cc/KkNV0gJ1/crunchy-rolls-california-maki-rolls-vegan-8d0c4850df2d27f08c7e9b444bef05c1-2560-q60.jpg",
    },
    {
      id: 7,
      name: "Salmon Sashimi",
      price: 13.99,
      details: "Freshly sliced raw salmon served with soy sauce and wasabi.",
      image:
        "https://i.postimg.cc/YGpDLCMM/Salmon-Sashimi-with-Ponzu-550x550-2.jpg",
    },
    {
      id: 8,
      name: "Tuna Nigiri",
      price: 10.99,
      details: "Hand-pressed sushi rice topped with fresh tuna.",
      image: "https://i.postimg.cc/NyxptvTV/Tomato-Katsuo-Nigiri-Sushi.jpg",
    },
    {
      id: 9,
      name: "Dragon Roll",
      price: 12.99,
      details: "Eel and cucumber roll topped with avocado and sweet eel sauce.",
      image: "https://i.postimg.cc/JyjSBFXc/Dragon-Roll-0286-I.jpg",
    },
    {
      id: 10,
      name: "Miso Soup",
      price: 4.99,
      details:
        "Traditional Japanese soup with tofu, seaweed, and green onions.",
      image: "https://i.postimg.cc/N5VnCt7k/Miso-Soup-8297-I-500x500.jpg",
    },
  ],
  "BBQ Heaven": [
    {
      id: 11,
      name: "BBQ Ribs",
      price: 15.99,
      details: "Slow-cooked ribs with smoky barbecue sauce.",
      image: "https://i.postimg.cc/7fWvv0D7/bbq-ribs.jpg",
    },
    {
      id: 12,
      name: "Pulled Pork Sandwich",
      price: 9.99,
      details: "Tender pulled pork in a soft bun with coleslaw.",
      image:
        "https://i.postimg.cc/bZtBK5mc/pulled-pork-sandwiches-on-butcher-paper-horizontal.jpg",
    },
    {
      id: 13,
      name: "Smoked Brisket",
      price: 18.99,
      details: "Slow-smoked beef brisket served with barbecue sauce.",
      image:
        "https://i.postimg.cc/q6qmQDNF/SES-texas-style-smoked-brisket-333929-fb5032bb31d84c4cb80830e85c1b8fd9.jpg",
    },
    {
      id: 14,
      name: "Grilled Sausage",
      price: 7.99,
      details: "Juicy grilled sausage served with mustard and pickles.",
      image: "https://i.postimg.cc/qgJWzjvy/grill-sausage.jpg",
    },
    {
      id: 15,
      name: "Cornbread",
      price: 3.99,
      details: "Sweet and moist cornbread with a buttery finish.",
      image:
        "https://i.postimg.cc/ZC97dgtB/GE-Cast-Iron-Skillet-Corn-Bread-s4x3.jpg",
    },
  ],
  "Vegan Delights": [
    {
      id: 16,
      name: "Vegan Burger",
      price: 9.99,
      details:
        "A hearty plant-based burger made with a black bean and quinoa patty, topped with crisp lettuce, juicy tomatoes, pickles, and a creamy vegan aioli, served on a toasted whole-grain bun.",
      image:
        "https://i.postimg.cc/LYRwkVBd/easy-vegan-black-bean-veggie-burgers-337700.jpg",
    },
    {
      id: 17,
      name: "Quinoa Salad",
      price: 7.99,
      details:
        "A refreshing and protein-packed salad featuring fluffy quinoa, cherry tomatoes, cucumbers, avocado, and a tangy lemon vinaigrette, garnished with fresh herbs.",
      image: "https://i.postimg.cc/NyvzYxny/Pumpkin-Quinoa-Salad-11.jpg",
    },
    {
      id: 18,
      name: "Stuffed Bell Peppers",
      price: 11.99,
      details:
        "Vibrant bell peppers stuffed with a flavorful mixture of lentils, mushrooms, brown rice, and spices, baked to perfection and drizzled with a rich tomato sauce.",
      image: "https://yourimagehost.com/stuffed-bell-peppers.jpg",
    },
    {
      id: 19,
      name: "Vegan Brownie",
      price: 5.99,
      details:
        "A rich, fudgy brownie made with dark cocoa, almond flour, and sweetened with maple syrup, served warm with a dusting of cocoa powder and a scoop of dairy-free vanilla ice cream.",
      image: "https://i.postimg.cc/Q9xSxYJM/veggie-brownies.jpg",
    },
    {
      id: 20,
      name: "Avocado Toast",
      price: 6.99,
      details:
        "Smashed ripe avocados on artisan sourdough toast, topped with cherry tomatoes, radishes, sesame seeds, and a drizzle of balsamic glaze for a delightful crunch and creamy balance.",
      image: "https://yourimagehost.com/avocado-toast.jpg",
    },
  ],
  "Mexican Fiesta": [
    {
      id: 21,
      name: "Tacos",
      price: 3.99,
      details:
        "Soft corn tortillas filled with your choice of grilled chicken, slow-cooked beef, or roasted vegetables, topped with fresh cilantro, onions, and a squeeze of lime.",
      image: "https://i.postimg.cc/KRd9rNx9/tacos.jpg",
    },
    {
      id: 22,
      name: "Burrito",
      price: 7.99,
      details:
        "A massive flour tortilla packed with Mexican rice, black beans, seasoned beef or grilled tofu, salsa, guacamole, and a hint of chipotle aioli, wrapped and grilled to perfection.",
      image:
        "https://i.postimg.cc/w1CSMz1j/AS-Burrito-vzhk-medium-Square-At3-X.jpg",
    },
    {
      id: 23,
      name: "Quesadilla",
      price: 5.99,
      details:
        "A crispy, golden-brown flour tortilla stuffed with melted cheese, sautéed peppers, onions, and your choice of grilled chicken or mushrooms, served with fresh pico de gallo.",
      image: "https://i.postimg.cc/k2607GXH/Chicken-Quesadilla-Square.jpg",
    },
    {
      id: 24,
      name: "Churros",
      price: 4.99,
      details:
        "Crispy on the outside, soft on the inside – these classic Mexican churros are coated in cinnamon sugar and served with a rich chocolate dipping sauce.",
      image: "https://i.postimg.cc/7C4mjZC0/vegan-churros-recipe-11.jpg",
    },
    {
      id: 25,
      name: "Guacamole & Chips",
      price: 6.99,
      details:
        "Creamy, freshly mashed avocados mixed with lime juice, tomatoes, onions, and cilantro, served with a basket of warm, crunchy tortilla chips.",
      image:
        "]https://i.postimg.cc/GBPSpy0X/guacamole-and-homemade-tortilla-chips.jpg",
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

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  // Function to update the active section

  const handleAddToCart = (index, foodName, price, image) => {
    dispatch(
      addToCart({ id: `${decodedName}-${index}`, name: foodName, price, image })
    );
    toast.success("added to cart", {
      position: "bottom-center",
    });
  };

  return (
    <div className="flex justify-center gap-16 m-3">
      <div className="restaurant-details w-[700px]">
        <h1 className="text-2xl font-bold mt-10 mb-4">{decodedName}</h1>
        <ul>
          {foods.map((food, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-4 bg-gray-100 p-4 rounded-lg shadow cursor-pointer"
            >
              <div className="flex flex-col gap-2">
                <span key={food.id} className="">
                  {food.name} - ${food.price.toFixed(2)}
                </span>
                <span
                  className="text-orange-500"
                  onClick={() => handleFoodClick(food)}
                >
                  view details
                </span>
              </div>

              <button
                className="bg-orange-500 py-2 px-4 rounded-xl text-white font-bold flex items-center"
                onClick={() =>
                  handleAddToCart(index, food.name, food.price, food.image)
                }
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

      <MobileNavigation />
    </div>
  );
}
