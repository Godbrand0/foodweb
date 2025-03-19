import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += price;
      } else {
        state.cart.push({
          id,
          name,
          price,
          image,
          quantity: 1,
          totalPrice: price,
        });
      }
    },
    // removeFromCart: (state, action) => {
    //   const itemIndex = action.payload;
    //   state.cart = state.cart.filter((item) => item.id !== itemIndex);
    // },
    // clearCart: (state) => {
    //   state.cart = [];
    // },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
