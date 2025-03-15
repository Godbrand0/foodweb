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
        <ul>
          {restaurants.map((restaurant, index) => (
            <li key={index}>
              <Link
                to={`/restaurant/${encodeURIComponent(restaurant.name)}`}
                className="restaurant-link text-slate-300 text-5xl font-extrabold"
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
