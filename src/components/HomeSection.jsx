import React from "react";
import Header from "../Reuse/Header";
import { Link } from "react-router-dom";

export default function HomeSection() {
  const restaurants = [
    { name: "The Italian Place" },
    { name: "Sushi World" },
    { name: "BBQ Heaven" },
    { name: "Vegan Delights" },
    { name: "Mexican Fiesta" },
  ];

  return (
    <div className="w-full">
      <div>
        <h1 className="text-orange-600 text-4xl mt-14 font-extrabold ml-5">
          Restaurants
        </h1>
        <ul className="my-5 lg:space-y-8 space-y-3 ml-10">
          {restaurants.map((restaurant, index) => (
            <li
              key={index}
              className="transition-transform ease-in-out duration-300 hover:scale-110"
            >
              <Link
                to={`/restaurant/${encodeURIComponent(restaurant.name)}`}
                className="restaurant-link text-slate-300 lg:text-5xl text-4xl font-extrabold"
              >
                {restaurant.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
