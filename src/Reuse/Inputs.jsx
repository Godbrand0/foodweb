import React from "react";

export default function Inputs({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-2 border rounded-lg"
    />
  );
}
