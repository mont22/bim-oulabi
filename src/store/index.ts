import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import domainsReducer from './slices/domainsSlice';
import Reactotron from '../config/ReactotronConfig';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    domains: domainsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // @ts-ignore - Reactotron enhancer
  enhancers: getDefaultEnhancers =>
    __DEV__
      ? getDefaultEnhancers().concat(Reactotron.createEnhancer!())
      : getDefaultEnhancers(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

