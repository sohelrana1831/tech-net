import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface IProduct {
  status: boolean;
  priceRange: number;
}

// Define the initial state using that type
const initialState: IProduct = {
  status: false,
  priceRange: 150,
};

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleState: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});

export const { toggleState, setPriceRange } = productsSlice.actions;

export default productsSlice.reducer;
