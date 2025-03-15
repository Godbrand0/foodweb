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
  console.log(restaurants);

  return (
    <div className="w-full">
      <div>
        <h1 className="text-orange-600 text-4xl my-8 font-extrabold">
          Restaurants
        </h1>
        <ul className="my-5 lg:space-y-5 space-y-3">
          {restaurants.map((restaurant, index) => (
            <li key={index}>
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
