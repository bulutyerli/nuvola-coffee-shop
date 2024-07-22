// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address } from '@/src/database-types'; // Ensure this import is correct based on your project structure
import { AddressState } from '@/src/types';

const initialState: AddressState = {
  addresses: [],
  selectedAddress: null, // Initialize as null to signify no address selected initially
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    selectAddress: (state, action: PayloadAction<Address>) => {
      state.selectedAddress = action.payload;
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
    clearSelectedAddress: (state) => {
      state.selectedAddress = null;
    },
  },
});

export const { selectAddress, setAddresses, clearSelectedAddress } =
  addressSlice.actions;

export default addressSlice.reducer;
