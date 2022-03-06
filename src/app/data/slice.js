import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    product: [],
    status: 'idle',
    error: null,
}

const apiUrl = 'http://localhost:3000/product'

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProduct.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.product = state.product.concat(action.payload)
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export const fetchProduct = createAsyncThunk('getProduct', async () => {
    const response = await axios.get(apiUrl)
    return response.data
})

// export const { } = dataSlice.actions;
export default dataSlice.reducer;