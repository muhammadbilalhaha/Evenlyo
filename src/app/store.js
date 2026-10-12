// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/data/dataSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    ui: uiReducer,
  },
});