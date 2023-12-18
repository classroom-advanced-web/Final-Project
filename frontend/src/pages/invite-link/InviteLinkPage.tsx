<<<<<<< HEAD
import classApi from '@/api/classApi';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

const inviteLinkPage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const joinClass = async (token: string, classCode: string, roleId: number) => {
      try {
        const res = await classApi.joinClassEmail(token, classCode, roleId);

        if (res) {
          toast({
            title: 'Join class successfully'
          });

          navigate(`/class/${res.classroom_id}`);
        }
      } catch (error: any) {
        if (error.response) {
          toast({
            title: 'Join class failed',
            description: error.response.data.error,
            variant: 'destructive'
          });
        }
        console.error(error);
      }
    };

    const roleId = searchParams.get('role_id');
    const token = searchParams.get('token');

    if (!roleId || !token) {
      return;
    }

    if (user) {
      joinClass(token, searchParams.get('code') ?? '', +roleId);
    }
  }, []);

  if (!user) {
    localStorage.setItem('redirect-url', window.location.href);
    return <Navigate to='/login' replace />;
  }

  return <div></div>;
};
export default inviteLinkPage;
=======
import classApi from '@/api/classApi';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

const inviteLinkPage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const { toast } = useToast();
  const navigate = useNavigate();

  const invitationId = searchParams.get('invitation_id') ?? '';

  useEffect(() => {
    const joinClass = async (invitationId: string) => {
      try {
        const res = await classApi.joinClassEmail(invitationId);

        if (res) {
          toast({
            title: 'Join class successfully'
          });

          localStorage.removeItem('redirect-url');
          navigate(`/class/${res.classroom_id}`);
        }
      } catch (error: any) {
        if (error.response) {
          toast({
            title: 'Join class failed',
            description: error.response.data.error,
            variant: 'destructive'
          });
        }
        console.error(error);
      }
    };

    if (user) {
      joinClass(invitationId);
    }
  }, []);

  if (!user) {
    localStorage.setItem('redirect-url', window.location.href);
    return <Navigate to='/login' replace />;
  }

  return <div></div>;
};
export default inviteLinkPage;
>>>>>>> c83234da551f932e2f7d54eda9b81bcea5283c60
