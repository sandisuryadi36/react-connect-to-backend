import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './data/slice'

export default configureStore({
    reducer: {
        data: dataReducer
    },
    middleware:
        (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        }),
})