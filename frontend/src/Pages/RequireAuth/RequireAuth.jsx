import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import Cookies from 'js-cookie';

const RequireAuth = ({ allowedTypes }) => {
  const { type, id } = localStorage;
  const token = Cookies.get('jwt');
  const location = useLocation();

  const checkAuth = () => {
    console.log(type);
    for (let i = 0; i < allowedTypes.length; i++) {
      if (type === allowedTypes[i]) {
        return true;
      }
    }

    return false;
  };

  if (checkAuth()) {
    return <Outlet />;
  } else if (token && id) {
    return <Navigate to={'/unauthorized'} state={{ from: location }} replace />;
  } else {
    return <Navigate to={'/signin'} state={{ from: location }} replace />;
  }
};

export default RequireAuth;
