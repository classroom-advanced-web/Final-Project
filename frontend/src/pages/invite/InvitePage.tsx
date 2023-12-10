import { useAuth } from '@/hooks/useAuth';
import { Navigate, useSearchParams } from 'react-router-dom';

const InvitePage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  localStorage.setItem('code', searchParams.get('code') ?? '');
  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <Navigate to='/' replace />;
};

export default InvitePage;
