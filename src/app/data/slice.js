import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as c from './constants'
import axios from 'axios';

const initialState = {
    product: [],
    status: 'idle',
    error: null,
    search: '',
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            if (action.payload.status) {
                state.status = action.payload.status
            }
            if (action.payload.search) {
                state.search = action.payload.search
            }
            if (action.payload.product) {
                state.product = action.payload.product
            }
        }
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
            .addCase(addProduct.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.product.push(action.payload)
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

// Fetch all Product
export const fetchProduct = createAsyncThunk('getProduct', async () => {
    const response = await axios.get(c.API_URL)
    return response.data
})

// post Product
export const addProduct = createAsyncThunk('addProduct', async (data) => { 
    const response = await axios.post(c.API_URL, data)
    return response.data
})

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;