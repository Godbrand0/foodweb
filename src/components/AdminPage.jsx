import React, { useEffect, useState } from "react";
import { db } from "../firebase/Firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useForm } from "react-hook-form";

export default function AdminPage() {
  const [restaurants, setRestaurants] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const restaurantCollection = collection(db, "restaurants");
      const restaurantSnapshot = await getDocs(restaurantCollection);
      const restaurantList = restaurantSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRestaurants(restaurantList);
    };

    fetchRestaurants();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "foods"), {
        name: data.name,
        price: parseFloat(data.price),
        restaurantId: data.restaurantId,
      });
      alert("Food added successfully");
      reset();
    } catch (error) {
      console.error("error adding food:", error);
      alert("something went wrong");
    }
  };
  return (
    <div>
      <div className="max-w-lg mx-auto my-0 container">
        <h2>Add New Food</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Food Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full p-2 border rounded-xl focus:outline-none focus-ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true })}
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Restaurant</label>
            <select
              {...register("restaurantId", { required: true })}
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a restaurant</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
}
