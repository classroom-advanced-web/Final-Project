import classApi from '@/api/classApi';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from 'react-query';
import { Navigate, useSearchParams } from 'react-router-dom';

const InvitePage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  if (!user) {
    localStorage.setItem('redirect-url', window.location.href);
    return <Navigate to='/login' replace />;
  }

  const code = searchParams.get('code') ?? '';

  const { data, error } = useQuery('invite', async () => classApi.joinClass(code));

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
