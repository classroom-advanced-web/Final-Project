import { AuthContext } from '@/context/AuthContext';
import { useContext, useEffect } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);

  useEffect(() => {
    const loadUser = async () => {
      if (context != null && localStorage.getItem('access-token')) {
        if (context.user === null) {
          await context.loadUser();
        }
      }
    };

    loadUser();
  }, []);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
