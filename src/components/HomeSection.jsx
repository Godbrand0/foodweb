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
      <Header content={"Home"} />
      <div>
        <h1>Restaurants</h1>
        <ul>
          {restaurants.map((restaurant, index) => (
            <li key={index}>
              <Link
                to={`/restaurant/${encodeURIComponent(restaurant.name)}`}
                className="restaurant-link"
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
