import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlices';
import productReducer from './features/products/productsSlices';
import usersReducer from './features/user/userSlices';
import { api } from './api/apiSlices';
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    users: usersReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
