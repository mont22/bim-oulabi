import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import {useAppSelector, useAppDispatch} from '../hooks/useAppDispatch';
import {setToken, setUser, logout} from '../store/slices/authSlice';
import {storage} from '../utils/storage';
import {setUnauthorizedHandler} from '../api/client';

const AppNavigator = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setUnauthorizedHandler(() => {
      dispatch(logout());
    });

    const checkAuth = async () => {
      const token = await storage.getToken();
      if (token) {
        dispatch(setToken(token));
      }
    };
    checkAuth();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;

