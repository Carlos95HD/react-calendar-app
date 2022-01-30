import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { refreshToken, startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const dispatch = useDispatch();
  const { checking, uid } = useSelector( state => state.auth );

  useEffect(() => {
    dispatch( startChecking() );
    const delay = 60 * 60 * 1900; // 1 hour in msec

    setInterval(() => {
      const isCurrentToken = !!(localStorage.getItem( 'token'))
      if (isCurrentToken) {
        dispatch( refreshToken() )
      }
    }, delay);
  }, [dispatch]);

  if (checking) {
    return (<h5>Espere...</h5>);
  }

  return (

    <BrowserRouter>
      <Routes>
        <Route  
          path="/login" 
          element={
            <PublicRoute isAuth={ !!uid }>
              <LoginScreen />
            </PublicRoute>
          }
        />

        <Route  
          path="/"
          element={
            <PrivateRoute isAuth={ !!uid } >
              <CalendarScreen />
            </PrivateRoute>
          }
        />


        {/* Redirect */}
        <Route  path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  )
};
