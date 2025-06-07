import reducer from "../../../redux-example/src/redux/userSlice"
import { configureStore } from '@reduxjs/toolkit'
import paginationSlice from './paginationSlice'
import moviesSlice from './moviesSlice'

const store = configureStore({
    reducer: {
        paginationSlice: paginationSlice.reducer,
        moviesSlice: moviesSlice.reducer,
    }
})

export default store