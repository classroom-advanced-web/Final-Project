import classApi from '@/api/classApi';
import { ROLE } from '@/constance/constance';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from 'react-query';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const InvitePage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    localStorage.setItem('redirect-url', window.location.href);
    return <Navigate to='/login' replace />;
  }

  const code = searchParams.get('code') ?? '';
  console.log(code);

  const { data, error } = useQuery('invite', async () => classApi.joinClass(code, ROLE.STUDENT));

  if (data) {
    localStorage.removeItem('redirect-url');
    return <Navigate to={`/class/${data.class_id}`} replace />;
  }

  if (error) {
    localStorage.removeItem('redirect-url');
  }

  return <div></div>;
};

export default InvitePage;
