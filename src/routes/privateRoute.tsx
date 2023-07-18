import { useAppSelector } from '@/redux/hooks';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const { users, isLodging } = useAppSelector((state) => state.users);
  const { pathname } = useLocation();

  if (isLodging) {
    return <p>lLodging...</p>;
  }

  if (!users.email && !isLodging) {
    return <Navigate to={'/login'} state={{ path: pathname }} />;
  }
  return children;
};

export default PrivateRoute;
