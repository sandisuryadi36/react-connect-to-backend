import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        product: [],
    },
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload;
        }
    }
})

export const { setProduct } = dataSlice.actions;
export default dataSlice.reducer;