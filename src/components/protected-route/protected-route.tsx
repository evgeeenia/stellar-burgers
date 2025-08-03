import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { FC, ReactElement } from 'react';

interface IProtectedRoute {
  onlyUnAuth?: boolean;
  children: ReactElement;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({
  onlyUnAuth = false,
  children
}) => {
  const location = useLocation();
  const user = useSelector((store) => store.user.user);
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);

  const hasToken = document.cookie.includes('accessToken');

  if (!isAuthChecked) {
    return <div>Загрузка...</div>;
  }

  if (onlyUnAuth && (user || hasToken)) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user && !hasToken) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
