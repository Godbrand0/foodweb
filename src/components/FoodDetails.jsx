import React from "react";
import { X } from "lucide-react";

export default function FoodDetails({ food, closeModal }) {
  if (!food) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg lg:w-2/3 w-4/5 h-2/3 shadow-lg relative">
        <button onClick={closeModal} className="absolute top-2 right-2">
          <X />
        </button>
        <div className="flex flex-col justify-center items-center mt-6">
          <img
            src={food.image}
            alt={food.name}
            className=" object- rounded-lg"
          />
          <h2 className="text-lg font-bold">{food.name}</h2>
          <p>{food.price}</p>
          <p className="mt-2">{food.details}</p>
        </div>
      </div>
    </div>
  );
}
