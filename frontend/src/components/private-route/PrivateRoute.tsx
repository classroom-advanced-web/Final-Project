import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

type Props = {
  redirectPath?: string;
  children: React.ReactNode;
};

const PrivateRoute = ({ redirectPath = '/login', children }: Props) => {
  useAuth();

  // const { host } = useLocation();
  // console.log(host);

  if (!localStorage.getItem('access-token')) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};
export default PrivateRoute;
