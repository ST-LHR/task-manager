import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { todosApi } from '../services/todoApi';
import todosSlice from '../features/todoSlice';


// import { persistStore,persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// Redux Persist configuration
// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persisteduserApiSlice = persistReducer(persistConfig, userApiSlice);

export const store = configureStore({
  reducer: {
    // userData: persisteduserApiSlice,
    todos : todosSlice,
    [todosApi.reducerPath]: todosApi.reducer, // Include the productsApi reducer

  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat([ todosApi.middleware]),
});


// export const persistor = persistStore(store);
setupListeners(store.dispatch);

export default store