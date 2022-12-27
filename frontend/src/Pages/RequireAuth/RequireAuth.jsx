import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import Cookies from 'js-cookie';

const RequireAuth = ({ allowedTypes }) => {
  const { type, id } = sessionStorage;
  const token = Cookies.get('jwt');
  const location = useLocation();

  return allowedTypes.includes(type) ? (
    <Outlet />
  ) : token && id ? (
    <Navigate to={'/unauthorized'} state={{ from: location }} replace />
  ) : (
    <Navigate to={'/signin'} state={{ from: location }} replace />
  );
};

export default RequireAuth;
