import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import productsReducer from './productsSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoriesReducer
    }
});