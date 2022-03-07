import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    product: [],
    status: 'idle',
    error: null,
}

const apiUrl = 'http://localhost:3000/product'
// const apiUrl = 'https://app-6b251b89-8cf6-4b18-b9fa-fbba00bbdd17.cleverapps.io/product'

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
                state.product = action.payload
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

// Fetch all Product
export const fetchProduct = createAsyncThunk('getProduct', async () => {
    const response = await axios.get(apiUrl)
    return response.data
})

// export const { setData } = dataSlice.actions;
export default dataSlice.reducer;