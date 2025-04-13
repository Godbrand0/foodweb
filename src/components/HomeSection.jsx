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
        <div className="ml-5">
          <h1 className="text-orange-600 text-4xl mt-14 font-extrabold ">
            Restaurants
          </h1>
          <p className="text-orange-500 italic text-sm font-thin">
            Explore your favourite restaurant with just a click
          </p>
        </div>

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
