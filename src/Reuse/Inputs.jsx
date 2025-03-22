import React from "react";

const Inputs = React.forwardRef(({ type, placeholder, ...props }, ref) => {
  return (
    <input
      ref={ref} // Forward the ref for react-hook-form
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props} // Spread other props like {...register}
    />
  );
});

export default Inputs;
