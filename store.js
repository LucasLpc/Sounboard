
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import playButtonsReducer from './components/playButtonSlice';
import samplesReducer from './components/sampleSlice';

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducers = combineReducers({ 
  playButtons: playButtonsReducer,
  samples: samplesReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

setupListeners(store.dispatch);