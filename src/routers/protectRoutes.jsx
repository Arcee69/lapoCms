import React from 'react'
import { Navigate, useLocation, Outlet  } from 'react-router-dom';
import { isObjectEmpty } from '../utils';
import BoardLayout from '../layouts/boardLayout';
import AuthLayout from '../layouts/authLayout';

export const ProtectRoutes = () => {
    const location = useLocation();
    const isAuthed = isObjectEmpty(JSON.parse(localStorage.getItem("userObj")));
    return !isAuthed ? (
      <BoardLayout>
        <Outlet />
      </BoardLayout>
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  };

  export const AuthProtectRoutes = () => {
    const location = useLocation();
    const isAuthed = isObjectEmpty(JSON.parse(localStorage.getItem("userObj")));
    return isAuthed ? (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ) : (
      <Navigate to="/dashboard" state={{ from: location }} replace />
    );
  };