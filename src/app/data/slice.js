import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as c from './constants'
import axios from 'axios';

const initialState = {
    product: [],
    status: 'idle',
    recentAction: null,
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
            state.search = action.payload.search
        }
    },
    extraReducers(builder) {
        builder
            // fetch products
            .addCase(fetchProduct.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.product = action.payload
                state.recentAction = 'get'
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                state.recentAction = 'get'
            })
            // fetch product by serach
            .addCase(fetchSearch.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.product = action.payload
                state.recentAction = 'search'
            })
            .addCase(fetchSearch.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                state.recentAction = 'search'
            })
            // post new product
            .addCase(addProduct.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.product.push(action.payload.product)
                state.recentAction = 'add'
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                state.recentAction = 'add'
            })
            // update product
            .addCase(updateProduct.pending, (state, action) => { 
                state.status = 'loading'
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.product = state.product.map(item => {
                    if (item._id === action.payload.product._id) {
                        return action.payload.product
                    }
                    return item
                })
                state.recentAction = 'update'
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                state.recentAction = 'update'
            })
            // delete product
            .addCase(deleteProduct.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.product = state.product.filter(item => item._id !== action.payload.product._id)
                state.recentAction = 'delete'
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                state.recentAction = 'delete'
            })
    },
})

// Fetch all Product
export const fetchProduct = createAsyncThunk('getProduct', async () => {
    const response = await axios.get(c.API_URL)
    return response.data
})

// fetch search Product
export const fetchSearch = createAsyncThunk('getSearch', async (search) => {
    const response = await axios.get(`${c.API_URL}?search=${search}`)
    return response.data
})

// post Product
export const addProduct = createAsyncThunk('addProduct', async (data) => { 
    const response = await axios.post(c.API_URL, data)
    return response.data
})

// update Product
export const updateProduct = createAsyncThunk('updateProduct', async (data) => { 
    const response = await axios.patch(`${c.API_URL}/${data.id}`, data.data)
    return response.data
})

// delete Product
export const deleteProduct = createAsyncThunk('deleteProduct', async (id) => {
    const response = await axios.delete(`${c.API_URL}/${id}`)
    return response.data
})

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;